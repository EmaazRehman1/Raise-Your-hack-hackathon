import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  MapPin, 
  Users, 
  ExternalLink,
  TrendingUp,
  Clock,
  Building2,
  Loader2
} from 'lucide-react';
import { getBooths, getSessions } from '@/Api/recommendations';

interface Session {
  session_id: string;
  title: string;
  speaker: string;
  tags: string[];
  description: string;
  start_time: string;
  duration_minutes: number;
  location: string;
  attendees: number;
  capacity: number;
}

interface Booth {
  booth_id: string;
  name: string;
  company: string;
  tags: string[];
  description: string;
  location: string;
  category: string;
  currentVisitors: number;
}

export default function Feed() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [booths, setBooths] = useState<Booth[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch sessions
        const sessionsResponse = await getSessions()
        // const sessionsData = await sessionsResponse.json();
        setSessions(sessionsResponse);

        // Fetch booths
        const boothsResponse = await getBooths();
        // const boothsData = await boothsResponse.json();
        setBooths(boothsResponse);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const allTags = [...new Set([
    ...sessions.flatMap(session => session.tags),
    ...booths.flatMap(booth => booth.tags)
  ])];

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.speaker.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => session.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const filteredBooths = booths.filter(booth => {
    const matchesSearch = booth.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booth.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => booth.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const SessionFeedCard = ({ session, index }: { session: Session; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg mb-1">{session.title}</CardTitle>
              <p className="text-sm text-muted-foreground mb-2">{session.speaker}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {session.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
              <TrendingUp className="w-3 h-3 mr-1" />
              Live
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground mb-4">{session.description}</p>
          
          <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{session.start_time}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{session.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{session.attendees} attending</span>
            </div>
          </div>

          <Button className="w-full">
            <ExternalLink className="w-4 h-4 mr-2" />
            Join Now
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );

  const BoothFeedCard = ({ booth, index }: { booth: Booth; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg mb-1">{booth.name}</CardTitle>
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{booth.company}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {booth.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
              <Users className="w-3 h-3 mr-1" />
              {booth.currentVisitors} visitors
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground mb-4">{booth.description}</p>
          
          <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{booth.location}</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              {booth.category}
            </Badge>
          </div>

          <Button className="w-full">
            <MapPin className="w-4 h-4 mr-2" />
            Visit Booth
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );

  if (loading) {
    return (
     <div className="h-screen flex flex-col items-center justify-center space-y-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />

      <h2 className="text-2xl font-bold">Loading feed...</h2>
      <p className="text-muted-foreground">
        Please wait while we fetch your matches.
      </p>
    </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Trending Discovery</h1>
        <p className="text-muted-foreground">
          Explore popular sessions and booths happening right now
        </p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative"
      >
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search sessions, booths, or companies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </motion.div>

      {/* Category Tags */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-wrap gap-2"
      >
        {allTags.slice(0, 10).map((tag) => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            className="cursor-pointer hover:bg-accent transition-colors"
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </Badge>
        ))}
      </motion.div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Activity</TabsTrigger>
          <TabsTrigger value="sessions">Live Sessions</TabsTrigger>
          <TabsTrigger value="booths">Popular Booths</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Live Sessions</h2>
              {filteredSessions.slice(0, 3).map((session, index) => (
                <SessionFeedCard key={session.session_id} session={session} index={index} />
              ))}
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Popular Booths</h2>
              {filteredBooths.slice(0, 3).map((booth, index) => (
                <BoothFeedCard key={booth.booth_id} booth={booth} index={index} />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-6">
            {filteredSessions.map((session, index) => (
              <SessionFeedCard key={session.session_id} session={session} index={index} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="booths" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-6">
            {filteredBooths.map((booth, index) => (
              <BoothFeedCard key={booth.booth_id} booth={booth} index={index} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}