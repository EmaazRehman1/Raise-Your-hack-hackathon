import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Building2, 
  Linkedin, 
  Target,
  Sparkles,
  Plus,
  TrendingUp,
  CheckCircle
} from 'lucide-react';
import InterestSelectionModal from '@/components/modals/InterestSelectionModal';
// import { getUser, updateUser } from '@/api/user';
import { getUser,updateUser } from '@/Api/network';

interface UserData {
  id: string;
  full_name: string;
  job_title: string;
  company: string;
  email: string;
  linkedin: string;
  goals_objectives: string;
  interests: string[];
  profileImage?: string;
}

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [formData, setFormData] = useState<UserData>({
    id: '',
    full_name: '',
    job_title: '',
    company: '',
    email: '',
    linkedin: '',
    goals_objectives: '',
    interests: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUser();
        setFormData({
          ...user,
          profileImage: user.profileImage || ''
        });
        setIsLoading(false);
        console.log(user)
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      // await updateUser({
      //   id: formData.id,
      //   full_name: formData.full_name,
      //   job_title: formData.job_title,
      //   company: formData.company,
      //   email: formData.email,
      //   linkedin: formData.linkedin,
      //   goals_objectives: formData.goals_objectives,
      //   interests: formData.interests,
      // });
      const resp=await updateUser(formData.id, {
        full_name: formData.full_name,
        job_title: formData.job_title,
        company: formData.company,
        email: formData.email,
        linkedin: formData.linkedin,
        goals_objectives: formData.goals_objectives,
        interests: formData.interests,
      });
      console.log(resp)
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInterestsSave = (interests: string[]) => {
    setFormData(prev => ({ ...prev, interests }));
  };

  const profileSuggestions = [
    { icon: Sparkles, text: 'Add a professional photo', completed: false },
    { icon: Linkedin, text: 'Connect your LinkedIn profile', completed: !!formData.linkedin },
    { icon: Target, text: 'Add more specific goals', completed: formData.goals_objectives.length > 50 },
    { icon: Plus, text: 'Add 3 more interests', completed: formData.interests.length >= 8 },
  ];

  const completedSuggestions = profileSuggestions.filter(s => s.completed).length;
  const profileScore = Math.round((completedSuggestions / profileSuggestions.length) * 100);

  if (isLoading) {
    return <div className="p-6 max-w-4xl mx-auto">Loading profile...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Profile</h1>
        <p className="text-muted-foreground">
          Manage your profile and boost your visibility at the event
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Form */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Personal Information</CardTitle>
                  <Button
                    variant={isEditing ? "default" : "outline"}
                    onClick={isEditing ? handleSave : () => setIsEditing(true)}
                    disabled={isLoading}
                  >
                    {isEditing ? (isLoading ? 'Saving...' : 'Save Changes') : 'Edit Profile'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={formData.profileImage} />
                    <AvatarFallback className="text-2xl">
                      {formData.full_name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button variant="outline" size="sm" disabled={isLoading}>
                      Change Photo
                    </Button>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      value={formData.full_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                      disabled={!isEditing || isLoading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="job_title">Job Title</Label>
                    <Input
                      id="job_title"
                      value={formData.job_title}
                      onChange={(e) => setFormData(prev => ({ ...prev, job_title: e.target.value }))}
                      disabled={!isEditing || isLoading}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    disabled={!isEditing || isLoading}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing || isLoading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={formData.linkedin || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                      disabled={!isEditing || isLoading}
                      placeholder="linkedin.com/in/yourprofile"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="goals_objectives">Goals & Objectives</Label>
                  <Textarea
                    id="goals_objectives"
                    value={formData.goals_objectives}
                    onChange={(e) => setFormData(prev => ({ ...prev, goals_objectives: e.target.value }))}
                    disabled={!isEditing || isLoading}
                    placeholder="What are you looking to achieve at this event?"
                    rows={4}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label>Interests</Label>
                    {isEditing && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setShowInterestModal(true)}
                        disabled={isLoading}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Edit Interests
                      </Button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.interests.map((interest) => (
                      <Badge key={interest} variant="secondary">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Profile Sidebar */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  Profile Completeness
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {profileScore}%
                    </div>
                    <Progress value={profileScore} className="h-2" />
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <p className="font-medium text-sm">Complete your profile:</p>
                    <div className="space-y-2">
                      {profileSuggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          {suggestion.completed ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <suggestion.icon className="w-4 h-4 text-muted-foreground" />
                          )}
                          <span className={suggestion.completed ? 'text-green-600' : 'text-muted-foreground'}>
                            {suggestion.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
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
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  Boost Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    Complete these actions to increase your visibility and get better matches:
                  </div>
                  <div className="space-y-3">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <User className="w-4 h-4 mr-2" />
                      Add Skills
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Building2 className="w-4 h-4 mr-2" />
                      Add Company Info
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Target className="w-4 h-4 mr-2" />
                      Set Meeting Preferences
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <InterestSelectionModal
        isOpen={showInterestModal}
        onClose={() => setShowInterestModal(false)}
        selectedInterests={formData.interests}
        onSave={handleInterestsSave}
      />
    </div>
  );
}