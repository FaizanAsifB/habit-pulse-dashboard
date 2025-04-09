
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Flame } from 'lucide-react';

interface HabitProgressProps {
  dateRange: 'week' | 'month' | 'quarter' | 'year';
}

interface HabitData {
  id: string;
  name: string;
  frequency: string;
  completionRate: number;
  streak: number;
  color: string;
  progress: number;
  category: string;
}

const HabitProgressList: React.FC<HabitProgressProps> = ({ dateRange }) => {
  // Mock data for habits
  const habitData: HabitData[] = [
    {
      id: '1',
      name: 'Morning Meditation',
      frequency: '7x per week',
      completionRate: 92,
      streak: 23,
      color: '#9b87f5',
      progress: 0.92,
      category: 'Mindfulness'
    },
    {
      id: '2',
      name: 'Daily Exercise',
      frequency: '5x per week',
      completionRate: 80,
      streak: 16,
      color: '#60A5FA',
      progress: 0.8,
      category: 'Fitness'
    },
    {
      id: '3',
      name: 'Reading',
      frequency: '3x per week',
      completionRate: 73,
      streak: 7,
      color: '#34D399',
      progress: 0.73,
      category: 'Learning'
    },
    {
      id: '4',
      name: 'Gratitude Journal',
      frequency: '7x per week',
      completionRate: 64,
      streak: 5,
      color: '#F87171',
      progress: 0.64,
      category: 'Mindfulness'
    }
  ];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Habit Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {habitData.map((habit) => (
            <div key={habit.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: habit.color }}
                  ></div>
                  <span className="font-medium">{habit.name}</span>
                  <span className="text-xs text-muted-foreground">({habit.frequency})</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-muted-foreground">{habit.completionRate}%</span>
                  <div className="flex items-center space-x-1">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-medium">{habit.streak}</span>
                  </div>
                </div>
              </div>
              <Progress value={habit.progress * 100} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HabitProgressList;
