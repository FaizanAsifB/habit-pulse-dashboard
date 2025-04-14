
import React, { useState } from 'react';
import { 
  Filter, 
  Plus,
  ArrowUpDown,
  PlusCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import HabitCard from '@/components/HabitCard';
import MotivationalInsight from '@/components/MotivationalInsight';

// Mock data for habits
const mockHabits = [
  {
    id: '1',
    name: 'Morning Meditation',
    frequency: '7x per week',
    streak: 23,
    progress: 0.7,
    category: 'Mindfulness',
    color: '#A78BFA', // purple
    lastUpdated: new Date(2025, 3, 8), // April 8, 2025
    status: 'active' as const
  },
  {
    id: '2',
    name: 'Daily Exercise',
    frequency: '5x per week',
    streak: 16,
    progress: 0.6,
    category: 'Fitness',
    color: '#60A5FA', // blue
    lastUpdated: new Date(2025, 3, 7), // April 7, 2025
    status: 'active' as const
  },
  {
    id: '3',
    name: 'Reading',
    frequency: '3x per week',
    streak: 7,
    progress: 0.33,
    category: 'Learning',
    color: '#34D399', // green
    lastUpdated: new Date(2025, 3, 9), // April 9, 2025 (today)
    status: 'active' as const
  },
  {
    id: '4',
    name: 'Gratitude Journal',
    frequency: '7x per week',
    streak: 0,
    progress: 0.14,
    category: 'Mindfulness',
    color: '#F87171', // red
    lastUpdated: new Date(2025, 3, 6), // April 6, 2025
    status: 'active' as const
  },
  {
    id: '5',
    name: 'No Social Media',
    frequency: '7x per week',
    streak: 4,
    progress: 0.57,
    category: 'Digital Wellbeing',
    color: '#FBBF24', // yellow
    lastUpdated: new Date(2025, 3, 9), // April 9, 2025 (today)
    status: 'active' as const
  },
  {
    id: '6',
    name: 'Drink Water',
    frequency: '7x per week',
    streak: 30,
    progress: 1.0,
    category: 'Health',
    color: '#38BDF8', // sky blue
    lastUpdated: new Date(2025, 3, 9), // April 9, 2025 (today)
    status: 'completed' as const
  }
];

type SortOption = 'name' | 'streak' | 'progress' | 'lastUpdated';
type FilterOption = 'all' | 'active' | 'completed';

const HabitsPage = () => {
  const [habits, setHabits] = useState(mockHabits);
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Sort and filter habits
  const filteredAndSortedHabits = habits
    .filter(habit => {
      if (filterBy === 'all') return true;
      return habit.status === filterBy;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'streak':
          return b.streak - a.streak; // Descending order for streaks
        case 'progress':
          return b.progress - a.progress; // Descending order for progress
        case 'lastUpdated':
          return b.lastUpdated.getTime() - a.lastUpdated.getTime(); // Most recent first
        default:
          return 0;
      }
    });
  
  // Calculate progress metrics
  const totalHabits = habits.length;
  const activeHabits = habits.filter(h => h.status === 'active').length;
  const completedThisWeek = habits.filter(h => h.progress > 0).length;
  const longestStreak = Math.max(...habits.map(h => h.streak));
  
  const handleDeleteHabit = (id: string) => {
    setHabits(prevHabits => prevHabits.filter(habit => habit.id !== id));
  };
  
  const handleArchiveHabit = (id: string) => {
    setHabits(prevHabits => 
      prevHabits.map(habit => 
        habit.id === id ? { ...habit, status: 'completed' as const } : habit
      )
    );
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      
      <div className="flex-1 container mx-auto px-4 py-6 max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your Habits</h1>
          
          <Button className="bg-habit-primary hover:bg-habit-primary/90">
            <PlusCircle className="h-4 w-4 mr-2" />
            New Habit
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-6">
          <ToggleGroup type="single" value={filterBy} onValueChange={(value) => value && setFilterBy(value as FilterOption)}>
            <ToggleGroupItem value="all">All</ToggleGroupItem>
            <ToggleGroupItem value="active">Active</ToggleGroupItem>
            <ToggleGroupItem value="completed">Completed</ToggleGroupItem>
          </ToggleGroup>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                <ArrowUpDown className="h-4 w-4 mr-1" />
                Sort by: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSortBy('name')}>Name</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('streak')}>Streak</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('progress')}>Progress</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('lastUpdated')}>Last Updated</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Progress Highlight Bar */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Active Habits</p>
                <p className="text-2xl font-bold text-habit-primary">{activeHabits}/{totalHabits}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Completed This Week</p>
                <p className="text-2xl font-bold text-habit-primary">{completedThisWeek}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Longest Streak</p>
                <p className="text-2xl font-bold text-habit-primary">{longestStreak} days</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <MotivationalInsight 
          message="Tip: Try completing your meditation habit right after waking up to build a stronger routine. Consistency is key!" 
          title="Habit Insight"
        />
        
        {/* Habits Grid */}
        {filteredAndSortedHabits.length > 0 ? (
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-4 mb-6`}>
            {filteredAndSortedHabits.map((habit) => (
              <HabitCard 
                key={habit.id}
                habit={habit}
                onDelete={handleDeleteHabit}
                onArchive={handleArchiveHabit}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="h-24 w-24 bg-habit-accent rounded-full flex items-center justify-center mb-4">
              <Plus className="h-12 w-12 text-habit-primary" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No habits found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
              {filterBy === 'all' 
                ? "You haven't created any habits yet. Start your first habit to begin building better routines."
                : `No ${filterBy} habits found. Try a different filter or create new habits.`}
            </p>
            <Button className="bg-habit-primary hover:bg-habit-primary/90">
              <PlusCircle className="h-4 w-4 mr-2" />
              Start Your First Habit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HabitsPage;
