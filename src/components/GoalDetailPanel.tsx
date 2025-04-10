
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Dumbbell, 
  ChevronRight,
  Trash,
  ListTodo,
  Target
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface Goal {
  id: string;
  name: string;
  description: string;
  progress: number;
  target: number;
  deadline: string;
  createdAt: string;
  tags: string[];
  linkedHabits: string[];
  linkedTasks: {
    id: string;
    name: string;
    completed: boolean;
  }[];
  milestones: {
    id: string;
    name: string;
    completed: boolean;
  }[];
  completed: boolean;
}

interface GoalDetailPanelProps {
  goal: Goal;
  isOpen: boolean;
  onClose: () => void;
  onMarkComplete: () => void;
  onDelete: () => void;
}

const GoalDetailPanel: React.FC<GoalDetailPanelProps> = ({
  goal,
  isOpen,
  onClose,
  onMarkComplete,
  onDelete,
}) => {
  // Format dates
  const deadlineDate = new Date(goal.deadline);
  const createdDate = new Date(goal.createdAt);
  
  const formattedDeadline = deadlineDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const formattedCreatedDate = createdDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  // Calculate days remaining
  const today = new Date();
  const daysRemaining = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader className="pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl">{goal.name}</SheetTitle>
            {goal.completed && (
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                Completed
              </Badge>
            )}
          </div>
          <SheetDescription>
            {goal.description}
          </SheetDescription>
        </SheetHeader>
        
        <div className="space-y-6 py-4">
          {/* Progress section */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Progress</h3>
            <div className="flex justify-between text-sm">
              <span>{goal.progress}% complete</span>
              <span>Target: {goal.target}%</span>
            </div>
            <Progress value={goal.progress} className="h-2" />
          </div>
          
          <Separator />
          
          {/* Time information */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-gray-700 dark:text-gray-300">Deadline:</span>
              </div>
              <span className={`font-medium ${
                daysRemaining < 0 && !goal.completed ? 'text-red-500' : ''
              }`}>
                {formattedDeadline}
              </span>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-gray-700 dark:text-gray-300">Time remaining:</span>
              </div>
              <span className={`font-medium ${
                daysRemaining < 0 && !goal.completed ? 'text-red-500' : 
                goal.completed ? 'text-green-500' : ''
              }`}>
                {goal.completed ? 'Completed' : 
                  daysRemaining > 0 ? `${daysRemaining} days` : `${Math.abs(daysRemaining)} days overdue`}
              </span>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-gray-700 dark:text-gray-300">Created on:</span>
              </div>
              <span className="font-medium">{formattedCreatedDate}</span>
            </div>
          </div>
          
          <Separator />
          
          {/* Milestones section */}
          {goal.milestones.length > 0 && (
            <>
              <div className="space-y-3">
                <h3 className="text-sm font-medium flex items-center">
                  <Target className="h-4 w-4 mr-2 text-gray-500" />
                  Milestones
                </h3>
                
                <div className="space-y-2">
                  {goal.milestones.map((milestone) => (
                    <div key={milestone.id} className="flex items-center justify-between text-sm py-1">
                      <div className="flex items-center">
                        {milestone.completed ? (
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                        ) : (
                          <Circle className="h-4 w-4 mr-2 text-gray-400" />
                        )}
                        <span className={milestone.completed ? 'text-gray-500 line-through' : ''}>
                          {milestone.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
            </>
          )}
          
          {/* Linked tasks section */}
          {goal.linkedTasks.length > 0 && (
            <>
              <div className="space-y-3">
                <h3 className="text-sm font-medium flex items-center">
                  <ListTodo className="h-4 w-4 mr-2 text-gray-500" />
                  Linked Tasks
                </h3>
                
                <div className="space-y-2">
                  {goal.linkedTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between text-sm py-1">
                      <div className="flex items-center">
                        {task.completed ? (
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                        ) : (
                          <Circle className="h-4 w-4 mr-2 text-gray-400" />
                        )}
                        <span className={task.completed ? 'text-gray-500 line-through' : ''}>
                          {task.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
            </>
          )}
          
          {/* Linked habits section */}
          {goal.linkedHabits.length > 0 && (
            <>
              <div className="space-y-3">
                <h3 className="text-sm font-medium flex items-center">
                  <Dumbbell className="h-4 w-4 mr-2 text-gray-500" />
                  Linked Habits
                </h3>
                
                <div className="space-y-2">
                  {goal.linkedHabits.map((habit, index) => (
                    <div key={index} className="flex items-center justify-between text-sm py-1">
                      <span>{habit}</span>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
            </>
          )}
          
          {/* Tags */}
          {goal.tags.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {goal.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <SheetFooter className="mt-6 flex-col sm:flex-row gap-2">
          <Button 
            variant={goal.completed ? "outline" : "default"}
            onClick={onMarkComplete}
            className={goal.completed ? "text-green-600" : ""}
          >
            {goal.completed ? "Reopen Goal" : "Mark as Complete"}
          </Button>
          
          <Button 
            variant="outline" 
            className="border-red-200 text-red-600 hover:bg-red-50" 
            onClick={onDelete}
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete Goal
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default GoalDetailPanel;
