
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Check, CheckCircle2, Trash, ExternalLink } from 'lucide-react';

interface Goal {
  id: string;
  name: string;
  description: string;
  progress: number;
  target: number;
  deadline: string;
  tags: string[];
  linkedHabits: string[];
  linkedTasks: {
    id: string;
    name: string;
    completed: boolean;
  }[];
  completed: boolean;
}

interface GoalCardProps {
  goal: Goal;
  onClick: () => void;
  onMarkComplete: () => void;
  onDelete: () => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, onClick, onMarkComplete, onDelete }) => {
  // Calculate days remaining
  const deadlineDate = new Date(goal.deadline);
  const today = new Date();
  const daysRemaining = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
  
  // Format deadline date
  const formattedDeadline = deadlineDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  
  // Calculate task completion
  const completedTasks = goal.linkedTasks.filter(task => task.completed).length;
  const totalTasks = goal.linkedTasks.length;
  
  return (
    <Card className={`overflow-hidden transition-all duration-200 hover:shadow-md ${
      goal.completed ? 'bg-gray-50 dark:bg-gray-800/50 border-green-200 dark:border-green-900' : ''
    }`}>
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className={`font-semibold text-lg ${
            goal.completed ? 'text-gray-500 dark:text-gray-400' : ''
          }`}>
            {goal.name}
            {goal.completed && (
              <CheckCircle2 className="inline-block ml-2 h-4 w-4 text-green-500" />
            )}
          </h3>
        </div>
        
        <div className="space-y-4 mt-4">
          {/* Progress bar */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{goal.progress}%</span>
            </div>
            <Progress value={goal.progress} className="h-2" />
          </div>
          
          {/* Deadline */}
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="h-4 w-4 mr-1" />
            <span>
              {goal.completed 
                ? `Completed on ${formattedDeadline}` 
                : daysRemaining > 0 
                  ? `${daysRemaining} days left (${formattedDeadline})` 
                  : `Overdue by ${Math.abs(daysRemaining)} days (${formattedDeadline})`
              }
            </span>
          </div>
          
          {/* Task status */}
          {totalTasks > 0 && (
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <Check className="h-4 w-4 inline mr-1" />
              <span>
                {completedTasks} of {totalTasks} tasks completed
              </span>
            </div>
          )}
          
          {/* Tags */}
          {goal.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {goal.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50 dark:bg-gray-800/50 p-4 flex justify-between gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClick}
        >
          Details <ExternalLink className="ml-1 h-3 w-3" />
        </Button>
        
        <div className="flex gap-1">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={(e) => {
              e.stopPropagation();
              onMarkComplete();
            }}
            className={goal.completed ? "text-green-600" : ""}
          >
            {goal.completed ? "Reopen" : "Complete"}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Trash className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default GoalCard;
