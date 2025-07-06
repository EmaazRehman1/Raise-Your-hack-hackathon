export interface User {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  linkedin?: string;
  interests: string[];
  goals: string;
  profileImage?: string;
  profileCompleteness: number;
}

export interface Match {
  status: string;
  id: string;
  user: User;
  score: number;
  reasons: string[];
  mutualInterests: string[];
  suggestedTopics: string[];
}

export interface Session {
  id: string;
  title: string;
  speaker: string;
  description: string;
  time: string;
  duration: string;
  location: string;
  category: string;
  tags: string[];
  attendees: number;
  maxAttendees: number;
  isRecommended: boolean;
  isTrending: boolean;
}

export interface Booth {
  id: string;
  name: string;
  company: string;
  description: string;
  location: string;
  category: string;
  tags: string[];
  currentVisitors: number;
  isTrending: boolean;
  image?: string;
}

export interface Meeting {
  id: string;
  attendee: User;
  timeSlot: string;
  duration: string;
  location: string;
  briefing: {
    mutualInterests: string[];
    suggestedTopics: string[];
    goals: string[];
  };
}

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}