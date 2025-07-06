import { useEffect, useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  ChevronDown, 
  Building2, 
  Mail, 
  Sparkles,
  MessageCircle,
  Loader2
} from 'lucide-react';
import { getMatches } from '@/Api/matches';

interface Match {
  user_id: string;
  name: string;
  email: string;
  job_title: string;
  company: string;
  score: number;
  interests: string[];
  status?: 'accepted' | 'rejected';
}

export default function Matchmaking() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedReason, setExpandedReason] = useState(false);
  const [loading, setLoading] = useState(false);
  const fetchMatches = async () => {
    try {
      setLoading(true);
      const resp = await getMatches();
      const transformedMatches = resp.top_matches.map((match:any) => ({
        ...match,
      }));
      setMatches(transformedMatches);
    } catch (error) {
      console.error('Error fetching matches:', error);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  const currentMatch = matches[currentIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    setMatches((prev) => {
      const newMatches = [...prev];
      newMatches[currentIndex].status = direction === 'right' ? 'accepted' : 'rejected';
      return newMatches;
    });

    if (currentIndex < matches.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
    setExpandedReason(false);
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 100;
    if (info.offset.x > swipeThreshold) {
      handleSwipe('right');
    } else if (info.offset.x < -swipeThreshold) {
      handleSwipe('left');
    }
  };

  if (matches.length === 0 ) {
    return (
       <div className="h-screen flex flex-col items-center justify-center space-y-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />

      <h2 className="text-2xl font-bold">Loading matches...</h2>
      <p className="text-muted-foreground">
        Please wait while we fetch your matches.
      </p>
    </div>
    );
  }
  if (loading) {
  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />

      <h2 className="text-2xl font-bold">Loading matches...</h2>
      <p className="text-muted-foreground">
        Please wait while we fetch your matches.
      </p>
    </div>
  );
}

  // Generate some placeholder content for missing fields
  const suggestedTopics = [
    `Discuss ${currentMatch.interests[0]} technologies`,
    `Share experiences about working at ${currentMatch.company}`,
    `Compare approaches to ${currentMatch.job_title.split(' ').slice(-1)[0]}`
  ];

  const reasons = [
    `You both have strong interest in ${currentMatch.interests.join(' and ')}`,
    `Similar professional background in ${currentMatch.job_title.includes('AI') ? 'AI' : currentMatch.job_title.split(' ').slice(-1)[0]}`,
    `Potential collaboration opportunities in ${currentMatch.interests[0]}`
  ];

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold mb-2">Discover Matches</h1>
        <p className="text-muted-foreground">
          Swipe to view AI-powered connections based on your interests and goals
        </p>
      </motion.div>

      <div className="relative h-[600px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMatch.user_id}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            whileDrag={{ scale: 1.05 }}
          >
            <Card className="h-full shadow-xl">
              <CardHeader className="pb-4">
                <div className="md:flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback>
                        {currentMatch.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-xl">{currentMatch.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{currentMatch.job_title}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{currentMatch.company}</span>
                      </div>
                    </div>
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                  >
                    <Badge 
                      variant="secondary" 
                      className="text-lg px-3 py-1 bg-gradient-to-r mt-4 from-green-500 to-blue-500 text-white"
                    >
                      {currentMatch.score}% match
                    </Badge>
                  </motion.div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{currentMatch.email}</span>
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                    Mutual Interests
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {currentMatch.interests.map((interest) => (
                      <Badge key={interest} variant="secondary" className="bg-purple-100 text-purple-700">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Why This Match */}
                <Collapsible open={expandedReason} onOpenChange={setExpandedReason}>
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      <span>Why this match?</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${expandedReason ? 'rotate-180' : ''}`} />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 space-y-2"
                    >
                      {reasons.map((reason, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{reason}</span>
                        </div>
                      ))}
                    </motion.div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Suggested Topics */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-orange-500" />
                    Suggested Discussion Topics
                  </h3>
                  <div className="space-y-2">
                    {suggestedTopics.map((topic, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5 flex-shrink-0" />
                        <span className="text-sm">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex justify-center gap-6 mt-6"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            variant="outline"
            size="lg"
            className="w-16 h-16 items-center rounded-full border-2 border-red-200 hover:bg-red-50 hover:border-red-300"
            onClick={() => handleSwipe('left')}
          >
            <p>{'Prev'}</p>
          </Button>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            size="lg"
            className="w-16 h-16 rounded-full items-center bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
            onClick={() => handleSwipe('right')}
          >
            <p>{'Next'}</p>
          </Button>
        </motion.div>
      </motion.div>

      <div className="text-center mt-4 text-sm text-muted-foreground">
        {currentIndex + 1} of {matches.length} matches
      </div>
    </div>
  );
}