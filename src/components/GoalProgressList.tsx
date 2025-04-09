
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Clock } from 'lucide-react';

interface GoalProgressProps {
  dateRange: 'week' | 'month' | 'quarter' | 'year';
}

interface GoalData {
  id: string;
  name: string;
  progress: number;
  target: number;
  unit: string;
  daysRemaining: number;
  color: string;
  milestones: {
    name: string;
    completed: boolean;
  }[];
}

const GoalProgressList: React.FC<GoalProgressProps> = ({ dateRange }) => {
  // Mock data for goals
  const goalData: GoalData[] = [
    {
      id: '1',
      name: 'Read 12 Books',
      progress: 4,
      target: 12,
      unit: 'books',
      daysRemaining: 245,
      color: '#9b87f5',
      milestones: [
        { name: '3 Books', completed: true },
        { name: '6 Books', completed: false },
        { name: '9 Books', completed: false },
        { name: '12 Books', completed: false }
      ]
    },
    {
      id: '2',
      name: 'Run 100 Miles',
      progress: 42,
      target: 100,
      unit: 'miles',
      daysRemaining: 125,
      color: '#60A5FA',
      milestones: [
        { name: '25 Miles', completed: true },
        { name: '50 Miles', completed: false },
        { name: '75 Miles', completed: false },
        { name: '100 Miles', completed: false }
      ]
    },
    {
      id: '3',
      name: 'Meditate 30 Hours',
      progress: 18,
      target: 30,
      unit: 'hours',
      daysRemaining: 72,
      color: '#34D399',
      milestones: [
        { name: '10 Hours', completed: true },
        { name: '20 Hours', completed: false },
        { name: '30 Hours', completed: false }
      ]
    }
  ];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Goal Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {goalData.map((goal) => (
            <div key={goal.id} className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: goal.color }}
                  ></div>
                  <span className="font-medium">{goal.name}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{goal.daysRemaining} days left</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{goal.progress} {goal.unit}</span>
                  <span>{goal.target} {goal.unit}</span>
                </div>
                <Progress value={(goal.progress / goal.target) * 100} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {goal.milestones.map((milestone, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center space-x-1 text-xs p-2 rounded-md ${
                      milestone.completed 
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {milestone.completed ? (
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    ) : (
                      <div className="h-3.5 w-3.5 rounded-full border-2 border-current" />
                    )}
                    <span>{milestone.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalProgressList;
