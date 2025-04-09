
import React from 'react';
import { Edit, Archive, Trash2, Award } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Habit {
  id: string;
  name: string;
  frequency: string;
  streak: number;
  progress: number;
  category: string;
  color: string;
  lastUpdated: Date;
  status: 'active' | 'completed';
}

interface HabitCardProps {
  habit: Habit;
  onDelete: (id: string) => void;
  onArchive: (id: string) => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onDelete, onArchive }) => {
  const progressPercentage = Math.round(habit.progress * 100);
  
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <div 
        className="h-2" 
        style={{ backgroundColor: habit.color }} 
      />
      <CardContent className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{habit.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{habit.frequency}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <span className="sr-only">Open menu</span>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                  <path d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => {}}>
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onArchive(habit.id)}>
                <Archive className="mr-2 h-4 w-4" />
                <span>{habit.status === 'active' ? 'Archive' : 'Restore'}</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(habit.id)} className="text-red-600 focus:text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="mt-4 space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1 text-sm">
              <span className="text-gray-500 dark:text-gray-400">Progress</span>
              <span className="font-medium">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div 
                className="rounded-full h-2.5 transition-all duration-500" 
                style={{ 
                  width: `${progressPercentage}%`, 
                  backgroundColor: habit.color 
                }}
              ></div>
            </div>
          </div>
          
          <div className="flex items-center">
            <Award className="h-5 w-5 mr-2" style={{ color: habit.color }} />
            <span className="font-medium">
              {habit.streak} day{habit.streak !== 1 ? 's' : ''} streak
            </span>
          </div>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Category: {habit.category}
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-5 py-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Last updated: {habit.lastUpdated.toLocaleDateString()}
        </p>
      </CardFooter>
    </Card>
  );
};

export default HabitCard;
