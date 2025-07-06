import { User, Match, Session, Booth } from '@/types';

export const currentUser: User = {
  id: '1',
  name: 'Sarah Chen',
  title: 'Senior Product Manager',
  company: 'TechFlow Inc.',
  email: 'sarah.chen@techflow.com',
  linkedin: 'linkedin.com/in/sarahchen',
  interests: ['AI', 'SaaS', 'Product Strategy', 'Climate Tech', 'Web3'],
  goals: 'Looking to explore partnerships in AI/ML space, learn about sustainable tech solutions, and connect with other product leaders.',
  profileCompleteness: 85,
};

export const mockMatches: Match[] = [
  {
    id: '1',
    user: {
      id: '2',
      name: 'Alex Rodriguez',
      title: 'AI Research Director',
      company: 'Neural Labs',
      email: 'alex@neurallabs.com',
      interests: ['AI', 'Machine Learning', 'Computer Vision', 'Product Strategy'],
      goals: 'Seeking partnerships for AI implementation in enterprise products.',
      profileCompleteness: 92,
    },
    score: 94,
    reasons: ['Both work in AI/ML space', 'Shared interest in product strategy', 'Complementary expertise'],
    mutualInterests: ['AI', 'Product Strategy'],
    suggestedTopics: ['AI implementation challenges', 'Product-market fit for AI products', 'Enterprise AI adoption'],
    status: ''
  },
  {
    id: '2',
    user: {
      id: '3',
      name: 'Maria Santos',
      title: 'Climate Tech Founder',
      company: 'GreenSphere',
      email: 'maria@greensphere.com',
      interests: ['Climate Tech', 'Sustainability', 'SaaS', 'Fundraising'],
      goals: 'Looking for technical partnerships and potential investors.',
      profileCompleteness: 88,
    },
    score: 87,
    reasons: ['Both interested in climate tech', 'SaaS experience overlap', 'Startup ecosystem connections'],
    mutualInterests: ['Climate Tech', 'SaaS'],
    suggestedTopics: ['Sustainable tech solutions', 'Climate tech market trends', 'SaaS scaling strategies'],
    status: ''
  },
  {
    id: '3',
    user: {
      id: '4',
      name: 'David Kim',
      title: 'Web3 Product Lead',
      company: 'BlockChain Ventures',
      email: 'david@bcv.com',
      interests: ['Web3', 'DeFi', 'Product Strategy', 'Tokenomics'],
      goals: 'Exploring traditional tech integration with blockchain solutions.',
      profileCompleteness: 90,
    },
    score: 78,
    reasons: ['Product strategy alignment', 'Web3 interest match', 'Innovation focus'],
    mutualInterests: ['Web3', 'Product Strategy'],
    suggestedTopics: ['Web3 adoption in traditional products', 'DeFi integration strategies', 'Tokenomics design'],
    status: ''
  },
];

export const mockSessions: Session[] = [
  {
    id: '1',
    title: 'The Future of AI in Product Development',
    speaker: 'Dr. Emily Watson',
    description: 'Explore how AI is transforming product development cycles and user experiences.',
    time: '10:00 AM',
    duration: '45 min',
    location: 'Main Stage',
    category: 'AI & Machine Learning',
    tags: ['AI', 'Product Development', 'Innovation'],
    attendees: 145,
    maxAttendees: 200,
    isRecommended: true,
    isTrending: true,
  },
  {
    id: '2',
    title: 'Sustainable Tech: Building for Tomorrow',
    speaker: 'Mark Thompson',
    description: 'Learn about sustainable technology practices and their impact on business success.',
    time: '11:30 AM',
    duration: '60 min',
    location: 'Green Tech Hall',
    category: 'Climate Tech',
    tags: ['Climate Tech', 'Sustainability', 'ESG'],
    attendees: 89,
    maxAttendees: 150,
    isRecommended: true,
    isTrending: false,
  },
  {
    id: '3',
    title: 'Web3 Product Strategy Workshop',
    speaker: 'Lisa Chang',
    description: 'Hands-on workshop for integrating Web3 technologies into product roadmaps.',
    time: '2:00 PM',
    duration: '90 min',
    location: 'Workshop Room A',
    category: 'Web3 & Blockchain',
    tags: ['Web3', 'Product Strategy', 'Workshop'],
    attendees: 34,
    maxAttendees: 50,
    isRecommended: false,
    isTrending: false,
  },
];

export const mockBooths: Booth[] = [
  {
    id: '1',
    name: 'AI Innovation Hub',
    company: 'TechCorp',
    description: 'Experience the latest AI tools and platforms for modern businesses.',
    location: 'Booth 42',
    category: 'AI & Machine Learning',
    tags: ['AI', 'Enterprise', 'Demo'],
    currentVisitors: 23,
    isTrending: true,
  },
  {
    id: '2',
    name: 'Climate Solutions Showcase',
    company: 'EcoTech',
    description: 'Discover innovative solutions for sustainable business practices.',
    location: 'Booth 15',
    category: 'Climate Tech',
    tags: ['Climate Tech', 'Sustainability', 'Solutions'],
    currentVisitors: 18,
    isTrending: true,
  },
  {
    id: '3',
    name: 'Web3 Experience Center',
    company: 'BlockTech',
    description: 'Interactive demos of Web3 applications and blockchain solutions.',
    location: 'Booth 28',
    category: 'Web3 & Blockchain',
    tags: ['Web3', 'DeFi', 'Interactive'],
    currentVisitors: 12,
    isTrending: false,
  },
];

export const interestOptions = [
  'AI', 'Machine Learning', 'SaaS', 'Climate Tech', 'Web3', 'Product Strategy',
  'Startups', 'Enterprise', 'Fintech', 'Healthtech', 'Edtech', 'Cybersecurity',
  'Data Science', 'Cloud Computing', 'IoT', 'Blockchain', 'AR/VR', 'Robotics',
  'Sustainability', 'ESG', 'Digital Transformation', 'Innovation', 'Leadership',
  'Fundraising', 'Venture Capital', 'Marketing', 'Sales', 'HR Tech', 'Design',
];

export const categoryOptions = [
  'All Categories',
  'AI & Machine Learning',
  'Climate Tech',
  'Web3 & Blockchain',
  'SaaS & Enterprise',
  'Fintech',
  'Healthtech',
  'Edtech',
  'Cybersecurity',
];