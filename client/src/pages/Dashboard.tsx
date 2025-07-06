import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Calendar, 
  Rss, 
  User, 
  TrendingUp, 
  Clock,
  MapPin,
  Star,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { currentUser, mockSessions, mockBooths } from '@/lib/data';

const quickActions = [
  { icon: Users, label: 'Find Matches', path: '/matches', color: 'bg-blue-500' },
  { icon: Calendar, label: 'My Agenda', path: '/agenda', color: 'bg-purple-500' },
  { icon: Rss, label: 'Discover', path: '/feed', color: 'bg-orange-500' },
  { icon: User, label: 'Profile', path: '/profile', color: 'bg-green-500' },
];

export default function Dashboard() {
  const trendingSessions = mockSessions.filter(session => session.isTrending);
  // const recommendedSessions = mockSessions.filter(session => session.isRecommended);
  const trendingBooths = mockBooths.filter(booth => booth.isTrending);

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 border-2 border-white/20">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">Welcome back, {currentUser.name}!</CardTitle>
                <CardDescription className="text-white/80">
                  {currentUser.title} at {currentUser.company}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-sm text-white/80 mb-2">Profile Completeness</p>
                <Progress value={currentUser.profileCompleteness} className="h-2" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{currentUser.profileCompleteness}%</p>
                <p className="text-sm text-white/80">Complete</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* What Should I Do Next? */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              What should I do next?
            </CardTitle>
            <CardDescription>
              AI-powered recommendations based on your interests and goals
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-accent/50 rounded-lg">
              <h3 className="font-semibold mb-2">🎯 Recommended Action</h3>
              <p className="text-sm text-muted-foreground mb-3">
                You have a 94% match with Alex Rodriguez (AI Research Director). 
                Schedule a meeting to discuss AI implementation strategies.
              </p>
              <Button size="sm" asChild>
                <Link to="/matches">View Match</Link>
              </Button>
            </div>
            <div className="p-4 bg-accent/50 rounded-lg">
              <h3 className="font-semibold mb-2">📅 Next Session</h3>
              <p className="text-sm text-muted-foreground mb-3">
                "The Future of AI in Product Development" starts in 45 minutes at Main Stage.
              </p>
              <Button size="sm" variant="outline" asChild>
                <Link to="/agenda">Add to Agenda</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Jump to your most important tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.path}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to={action.path}>
                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4 text-center">
                        <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                          <action.icon className="w-6 h-6 text-white" />
                        </div>
                        <p className="font-medium">{action.label}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Trending Now */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-500" />
                Trending Sessions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {trendingSessions.slice(0, 3).map((session) => (
                <div key={session.id} className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{session.title}</h4>
                    <p className="text-xs text-muted-foreground">{session.speaker}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{session.time}</span>
                      <MapPin className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{session.location}</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {session.attendees} attending
                  </Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full" asChild>
                <Link to="/feed">
                  View All <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Popular Booths
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {trendingBooths.map((booth) => (
                <div key={booth.id} className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{booth.name}</h4>
                    <p className="text-xs text-muted-foreground">{booth.company}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{booth.location}</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {booth.currentVisitors} visitors
                  </Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full" asChild>
                <Link to="/feed">
                  Explore Booths <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}