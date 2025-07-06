import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Plus,
  Search,
  Filter,
  Star,
  TrendingUp
} from 'lucide-react';
import { mockSessions, categoryOptions } from '@/lib/data';

export default function Agenda() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [myAgenda, setMyAgenda] = useState<string[]>([]);

  const filteredSessions = mockSessions.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'All Categories' || session.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const recommendedSessions = filteredSessions.filter(session => session.isRecommended);
  const trendingSessions = filteredSessions.filter(session => session.isTrending);

  const toggleAgenda = (sessionId: string) => {
    setMyAgenda(prev =>
      prev.includes(sessionId)
        ? prev.filter(id => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  const SessionCard = ({ session, index }: { session: any; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
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
            <div className="flex flex-wrap gap-2">
              {session.isRecommended && (
                <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200">
                  <Star className="w-3 h-3 mr-1" />
                  Recommended
                </Badge>
              )}
              {session.isTrending && (
                <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Trending
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{session.description}</p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{session.time}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{session.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{session.location}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {session.attendees}/{session.maxAttendees} attendees
              </span>
            </div>
            <Button
              variant={myAgenda.includes(session.id) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleAgenda(session.id)}
              className="w-full sm:w-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              {myAgenda.includes(session.id) ? 'In Agenda' : 'Add to Agenda'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Personalized Agenda</h1>
        <p className="text-muted-foreground">
          Discover and organize sessions tailored to your interests
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search sessions, speakers, or topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {categoryOptions.map(category => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid grid-cols-2 sm:grid-cols-4 gap-1">
          <TabsTrigger value="all" className="text-xs sm:text-sm py-1 sm:py-2">All</TabsTrigger>
          <TabsTrigger value="recommended" className="text-xs sm:text-sm py-1 sm:py-2">Recommended</TabsTrigger>
          <TabsTrigger value="trending" className="text-xs sm:text-sm py-1 sm:py-2">Trending</TabsTrigger>
          <TabsTrigger value="my-agenda" className="text-xs sm:text-sm py-1 sm:py-2">
            My Agenda ({myAgenda.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredSessions.map((session, index) => (
            <SessionCard key={session.id} session={session} index={index} />
          ))}
        </TabsContent>

        <TabsContent value="recommended" className="space-y-4">
          {recommendedSessions.length > 0 ? (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Recommended for You</h2>
                <p className="text-muted-foreground">
                  These sessions match your interests and goals
                </p>
              </div>
              {recommendedSessions.map((session, index) => (
                <SessionCard key={session.id} session={session} index={index} />
              ))}
            </>
          ) : (
            <div className="text-center py-12">
              <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No recommended sessions found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="trending" className="space-y-4">
          {trendingSessions.length > 0 ? (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Trending Now</h2>
                <p className="text-muted-foreground">
                  Popular sessions with high attendance
                </p>
              </div>
              {trendingSessions.map((session, index) => (
                <SessionCard key={session.id} session={session} index={index} />
              ))}
            </>
          ) : (
            <div className="text-center py-12">
              <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No trending sessions found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="my-agenda" className="space-y-4">
          {myAgenda.length > 0 ? (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Your Personal Agenda</h2>
                <p className="text-muted-foreground">
                  {myAgenda.length} session{myAgenda.length !== 1 ? 's' : ''} selected
                </p>
              </div>
              {filteredSessions
                .filter(session => myAgenda.includes(session.id))
                .map((session, index) => (
                  <SessionCard key={session.id} session={session} index={index} />
                ))}
            </>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Your agenda is empty</h3>
              <p className="text-muted-foreground">Add sessions to build your personalized agenda</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}