import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Home, 
  Users, 
  Calendar, 
  Rss, 
  User, 
  Menu,
  X,
  Sparkles,
  Network
} from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Matches', path: '/matches' },
  { icon: Calendar, label: 'Agenda', path: '/agenda' },
  { icon: Rss, label: 'Feed', path: '/feed' },
  { icon: Network, label: 'Networking', path: '/network' },
  { icon: User, label: 'Profile', path: '/profile' },

];

export default function Navigation() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.nav 
        className="hidden lg:flex fixed left-0 top-0 h-full w-64 bg-card border-r border-border flex-col"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EventAI
            </h1>
          </div>
        </div>

        <div className="flex-1 p-4 space-y-2">
          {navItems.map(({ icon: Icon, label, path }) => (
            <Link key={path} to={path}>
              <Button
                variant={location.pathname === path ? 'default' : 'secondary'}
                className="w-full justify-start gap-3 h-12"
                size="sm"
              >
                <Icon className="w-5 h-5" />
                {label}
              </Button>
            </Link>
          ))}
        </div>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-sm font-medium truncate">Sarah Chen</p>
              <p className="text-xs text-muted-foreground truncate">TechFlow Inc.</p>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Header */}
      <motion.header 
        className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EventAI
            </h1>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="lg:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <motion.div
            className="fixed left-0 top-16 bottom-0 w-72 bg-card border-r border-border"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 space-y-2">
              {navItems.map(({ icon: Icon, label, path }) => (
                <Link key={path} to={path} onClick={() => setIsMobileMenuOpen(false)}>
                  <Button
                    variant={location.pathname === path ? 'default' : 'ghost'}
                    className="w-full justify-start gap-3 h-12"
                    size="sm"
                  >
                    <Icon className="w-5 h-5" />
                    {label}
                  </Button>
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Mobile Bottom Navigation */}
      <motion.nav 
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-around p-2">
          {navItems.map(({ icon: Icon, label, path }) => (
            <Link key={path} to={path} className="flex-1">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "w-full flex-col gap-1 h-16",
                  location.pathname === path && "text-primary"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </motion.nav>
    </>
  );
}