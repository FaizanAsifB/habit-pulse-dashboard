
import React from 'react';
import { Link } from '@tanstack/react-router';
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
  CheckSquare,
  Target
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
  const isActive = (path: string) => window.location.pathname === path;

  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-brand-white dark:bg-gray-900">
      <div className="flex items-center">
        <Link to="/" className="text-xl font-bold text-brand-indigo">HabitPulse</Link>
      </div>
      
      <div className="flex items-center space-x-2 sm:space-x-4">
        <Button 
          variant={isActive('/dashboard') ? 'default' : 'ghost'} 
          size="sm" 
          className="hidden md:flex items-center gap-1"
          asChild
        >
          <Link to="/dashboard">
            <Home className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </Button>
        
        <Button 
          variant={isActive('/habits') ? 'default' : 'ghost'} 
          size="sm" 
          className="hidden md:flex items-center gap-1"
          asChild
        >
          <Link to="/habits">
            <Dumbbell className="h-4 w-4" />
            <span>Habits</span>
          </Link>
        </Button>
        
        <Button 
          variant={isActive('/tasks') ? 'default' : 'ghost'} 
          size="sm" 
          className="hidden md:flex items-center gap-1"
          asChild
        >
          <Link to="/tasks">
            <CheckSquare className="h-4 w-4" />
            <span>Tasks</span>
          </Link>
        </Button>
        
        <Button 
          variant={isActive('/goals') ? 'default' : 'ghost'} 
          size="sm" 
          className="hidden md:flex items-center gap-1"
          asChild
        >
          <Link to="/goals">
            <Target className="h-4 w-4" />
            <span>Goals</span>
          </Link>
        </Button>
        
        <Button 
          variant={isActive('/calendar') ? 'default' : 'ghost'} 
          size="sm" 
          className="hidden md:flex items-center gap-1"
          asChild
        >
          <Link to="/calendar">
            <Calendar className="h-4 w-4" />
            <span>Calendar</span>
          </Link>
        </Button>
        
        <Button 
          variant={isActive('/progress') ? 'default' : 'ghost'} 
          size="sm" 
          className="hidden md:flex items-center gap-1"
          asChild
        >
          <Link to="/progress">
            <BarChart className="h-4 w-4" />
            <span>Progress</span>
          </Link>
        </Button>
        
        <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-1">
          <PlusCircle className="h-4 w-4" />
          <span>Add Habit</span>
        </Button>
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-brand-indigo rounded-full"></span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-brand-indigo/10 flex items-center justify-center">
                <User className="h-4 w-4 text-brand-indigo" />
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
