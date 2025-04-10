
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Target, ListTodo, BadgeCheck, Trophy } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface GoalProgressSnapshotProps {
  totalGoals: number;
  activeGoals: number;
  completedThisMonth: number;
  averageProgress: number;
}

const GoalProgressSnapshot: React.FC<GoalProgressSnapshotProps> = ({
  totalGoals,
  activeGoals,
  completedThisMonth,
  averageProgress
}) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-0">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100 dark:divide-gray-800">
          
          {/* Total Goals */}
          <div className="p-4 flex items-center">
            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mr-3">
              <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Goals</p>
              <p className="text-2xl font-bold">{totalGoals}</p>
            </div>
          </div>
          
          {/* Active Goals */}
          <div className="p-4 flex items-center">
            <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center mr-3">
              <ListTodo className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Active Goals</p>
              <p className="text-2xl font-bold">{activeGoals}</p>
            </div>
          </div>
          
          {/* Completed This Month */}
          <div className="p-4 flex items-center">
            <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mr-3">
              <BadgeCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Completed This Month</p>
              <p className="text-2xl font-bold">{completedThisMonth}</p>
            </div>
          </div>
          
          {/* Average Progress */}
          <div className="p-4">
            <div className="flex items-center mb-2">
              <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mr-3">
                <Trophy className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Average Progress</p>
                <p className="text-2xl font-bold">{Math.round(averageProgress)}%</p>
              </div>
            </div>
            <Progress value={averageProgress} className="h-2 mt-1" />
          </div>
          
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalProgressSnapshot;
