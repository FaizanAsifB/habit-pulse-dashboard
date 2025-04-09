
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Award, 
  Calendar, 
  Clock, 
  Flame, 
  Medal, 
  Star, 
  Trophy 
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: React.ReactNode;
  color: string;
}

const AchievementBadges: React.FC = () => {
  // Mock data for achievements
  const achievements: Achievement[] = [
    {
      id: '1',
      title: '30-Day Streak',
      description: 'Maintained a 30-day streak for Drinking Water',
      date: 'Apr 2, 2025',
      icon: <Flame className="h-6 w-6" />,
      color: 'bg-gradient-to-br from-orange-400 to-red-500'
    },
    {
      id: '2',
      title: 'Perfect Week',
      description: 'Completed all scheduled habits for an entire week',
      date: 'Mar 28, 2025',
      icon: <Calendar className="h-6 w-6" />,
      color: 'bg-gradient-to-br from-green-400 to-emerald-500'
    },
    {
      id: '3',
      title: 'Goal Champion',
      description: 'Completed your "Read 4 Books" goal ahead of schedule',
      date: 'Mar 23, 2025',
      icon: <Trophy className="h-6 w-6" />,
      color: 'bg-gradient-to-br from-yellow-400 to-yellow-600'
    },
    {
      id: '4',
      title: 'Early Bird',
      description: 'Completed Morning Meditation for 14 consecutive days',
      date: 'Mar 19, 2025',
      icon: <Clock className="h-6 w-6" />,
      color: 'bg-gradient-to-br from-blue-400 to-blue-600'
    },
    {
      id: '5',
      title: 'Milestone Master',
      description: 'Reached the halfway point in 3 different goals',
      date: 'Mar 15, 2025',
      icon: <Star className="h-6 w-6" />,
      color: 'bg-gradient-to-br from-purple-400 to-purple-600'
    }
  ];
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Achievements & Milestones</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="flex space-x-3 p-3 bg-secondary/30 rounded-lg">
              <div className={`${achievement.color} text-white p-3 rounded-full h-fit`}>
                {achievement.icon}
              </div>
              <div>
                <h3 className="font-medium text-sm">{achievement.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
                <p className="text-xs text-muted-foreground mt-2">{achievement.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementBadges;
