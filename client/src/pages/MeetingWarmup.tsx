import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Clock, 
  MapPin, 
  Calendar,
  Target, 
  MessageCircle,
  Sparkles,
  User,
  Building2,
  ArrowRight
} from 'lucide-react';

// Mock data for a scheduled meeting
const mockMeeting = {
  id: '1',
  attendee: {
    id: '2',
    name: 'Alex Rodriguez',
    title: 'AI Research Director',
    company: 'Neural Labs',
    email: 'alex@neurallabs.com',
    interests: ['AI', 'Machine Learning', 'Computer Vision', 'Product Strategy'],
    goals: 'Seeking partnerships for AI implementation in enterprise products.',
    profileCompleteness: 92,
    profileImage: '...'
  },
  timeSlot: '3:30 PM - 4:00 PM',
  duration: '30 minutes',
  location: 'Networking Lounge - Table 12',
  briefing: {
    mutualInterests: ['AI', 'Product Strategy'],
    suggestedTopics: [
      'AI implementation challenges in enterprise environments',
      'Product-market fit strategies for AI products',
      'Building AI teams and organizational capabilities',
      'Future trends in AI and machine learning',
    ],
    goals: [
      'Explore potential partnership opportunities',
      'Discuss AI implementation best practices',
      'Share insights on product strategy',
    ],
  },
};

export default function MeetingWarmup() {
  const { attendee, timeSlot, duration, location, briefing } = mockMeeting;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Meeting Warm-Up</h1>
        <p className="text-muted-foreground">
          AI-generated briefing for your upcoming meeting
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Meeting Details */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  Meeting Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{timeSlot}</p>
                        <p className="text-sm text-muted-foreground">{duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{location}</p>
                        <p className="text-sm text-muted-foreground">Ground floor</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-purple-500" />
                  About {attendee.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={attendee.profileImage} />
                      <AvatarFallback>
                        {attendee.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">{attendee.name}</h3>
                      <p className="text-sm text-muted-foreground">{attendee.title}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{attendee.company}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Their Interests</h4>
                    <div className="flex flex-wrap gap-2">
                      {attendee.interests.map((interest) => (
                        <Badge key={interest} variant="secondary">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Their Goals</h4>
                    <p className="text-sm text-muted-foreground">{attendee.goals}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-orange-500" />
                  Suggested Discussion Topics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {briefing.suggestedTopics.map((topic, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-start gap-3 p-3 bg-accent/50 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm">{topic}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  Mutual Interests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {briefing.mutualInterests.map((interest) => (
                    <Badge key={interest} variant="default" className="w-full justify-center">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-500" />
                  Meeting Objectives
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {briefing.goals.map((goal, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                      <span className="text-sm">{goal}</span>
                    </div>
                  ))}
                </div>
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
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send Pre-Meeting Message
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Add to Calendar
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center"
      >
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-blue-500" />
              <h3 className="text-lg font-semibold text-blue-900">Pro Tip</h3>
            </div>
            <p className="text-sm text-blue-800 mb-4">
              Research shows that meetings with pre-planned topics are 3x more productive. 
              Use these AI-generated suggestions to break the ice and find common ground quickly.
            </p>
            <Button variant="outline" className="bg-white hover:bg-blue-50">
              Start Meeting <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}