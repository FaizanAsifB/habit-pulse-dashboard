
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Bell, 
  Calendar, 
  ChevronDown, 
  LogOut, 
  PlusCircle,
  Settings, 
  User,
  Home,
  Dumbbell,
  BarChart,
  CheckSquare
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
  const location = useLocation();

  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="flex items-center">
        <Link to="/" className="text-xl font-bold text-habit-primary">HabitPulse</Link>
      </div>
      
      <div className="flex items-center space-x-2 sm:space-x-4">
        <Link to="/">
          <Button 
            variant={location.pathname === '/' ? 'default' : 'ghost'} 
            size="sm" 
            className="hidden md:flex items-center gap-1"
          >
            <Home className="h-4 w-4" />
            <span>Dashboard</span>
          </Button>
        </Link>
        
        <Link to="/habits">
          <Button 
            variant={location.pathname === '/habits' ? 'default' : 'ghost'} 
            size="sm" 
            className="hidden md:flex items-center gap-1"
          >
            <Dumbbell className="h-4 w-4" />
            <span>Habits</span>
          </Button>
        </Link>
        
        <Link to="/tasks">
          <Button 
            variant={location.pathname === '/tasks' ? 'default' : 'ghost'} 
            size="sm" 
            className="hidden md:flex items-center gap-1"
          >
            <CheckSquare className="h-4 w-4" />
            <span>Tasks</span>
          </Button>
        </Link>
        
        <Link to="/calendar">
          <Button 
            variant={location.pathname === '/calendar' ? 'default' : 'ghost'} 
            size="sm" 
            className="hidden md:flex items-center gap-1"
          >
            <Calendar className="h-4 w-4" />
            <span>Calendar</span>
          </Button>
        </Link>
        
        <Link to="/progress">
          <Button 
            variant={location.pathname === '/progress' ? 'default' : 'ghost'} 
            size="sm" 
            className="hidden md:flex items-center gap-1"
          >
            <BarChart className="h-4 w-4" />
            <span>Progress</span>
          </Button>
        </Link>
        
        <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-1">
          <PlusCircle className="h-4 w-4" />
          <span>Add Habit</span>
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
            <DropdownMenuItem asChild>
              <Link to="/settings" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
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
