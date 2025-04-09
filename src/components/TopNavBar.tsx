
import React from 'react';
import { 
  Bell, 
  Calendar, 
  ChevronDown, 
  LogOut, 
  PlusCircle,
  Settings, 
  User 
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const TopNavBar = () => {
  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-habit-primary">HabitPulse</h1>
      </div>
      
      <div className="flex items-center space-x-2 sm:space-x-4">
        <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-1">
          <PlusCircle className="h-4 w-4" />
          <span>Add Habit</span>
        </Button>
        
        <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span>Calendar</span>
        </Button>
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-habit-primary rounded-full"></span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-habit-accent flex items-center justify-center">
                <User className="h-4 w-4 text-habit-primary" />
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopNavBar;
