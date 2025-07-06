import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search} from 'lucide-react';
import { interestOptions } from '@/lib/data';

interface InterestSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedInterests: string[];
  onSave: (interests: string[]) => void;
}

export default function InterestSelectionModal({
  isOpen,
  onClose,
  selectedInterests,
  onSave,
}: InterestSelectionModalProps) {
  const [localSelectedInterests, setLocalSelectedInterests] = useState<string[]>(selectedInterests);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInterests = interestOptions.filter(interest =>
    interest.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleInterest = (interest: string) => {
    if (localSelectedInterests.includes(interest)) {
      setLocalSelectedInterests(prev => prev.filter(i => i !== interest));
    } else {
      setLocalSelectedInterests(prev => [...prev, interest]);
    }
  };

  const handleSave = () => {
    onSave(localSelectedInterests);
    onClose();
  };

  const handleCancel = () => {
    setLocalSelectedInterests(selectedInterests);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col bg-background">
        <DialogHeader>
          <DialogTitle className="text-xl text-foreground">Select Your Interests</DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search interests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-background text-foreground border-border"
            />
          </div>

          <div className="flex-1 overflow-y-auto">
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-3 gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence>
                {filteredInterests.map((interest, index) => (
                  <motion.div
                    key={interest}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.02 }}
                  >
                    <Badge
                      variant={localSelectedInterests.includes(interest) ? 'default' : 'outline'}
                      className={`w-full justify-center p-3 cursor-pointer transition-colors ${
                        localSelectedInterests.includes(interest) 
                          ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                          : 'hover:bg-accent/50 text-foreground border-border'
                      }`}
                      onClick={() => toggleInterest(interest)}
                    >
                      <motion.span
                        initial={false}
                        animate={{ scale: localSelectedInterests.includes(interest) ? 1.05 : 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {interest}
                      </motion.span>
                    </Badge>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="text-sm text-muted-foreground">
              {localSelectedInterests.length} interest{localSelectedInterests.length !== 1 ? 's' : ''} selected
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handleCancel}
                className="text-foreground border-border hover:bg-accent"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Save Interests
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}