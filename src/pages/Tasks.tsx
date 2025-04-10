
import React, { useState } from 'react';
import TopNavBar from '@/components/TopNavBar';
import TasksList from '@/components/TasksList';
import TaskDetailsPanel from '@/components/TaskDetailsPanel';
import { PlusCircle, Filter, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

// Types
export type Task = {
  id: string;
  name: string;
  description?: string;
  scheduledTime?: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'skipped';
  priority: 'low' | 'medium' | 'high';
  habitId?: string;
  goalId?: string;
  type: 'ai' | 'manual' | 'recurring';
  notes?: string;
};

export type HabitOrGoal = {
  id: string;
  name: string;
  category: string;
  color: string;
};

// Mock data for initial development
const mockTasks: Task[] = [
  {
    id: '1',
    name: 'Morning Meditation',
    description: 'Start the day with 10 minutes of mindfulness meditation',
    scheduledTime: '07:00',
    dueDate: '2025-04-10',
    status: 'completed',
    priority: 'high',
    habitId: '1',
    type: 'recurring',
    notes: 'Use the Mindful app',
  },
  {
    id: '2',
    name: 'Running Session',
    description: 'Go for a 5km run in the park',
    scheduledTime: '08:30',
    dueDate: '2025-04-10',
    status: 'pending',
    priority: 'medium',
    habitId: '2',
    type: 'recurring',
  },
  {
    id: '3',
    name: 'Read Book',
    description: 'Continue reading "Atomic Habits" - Chapter 4',
    scheduledTime: '12:00',
    dueDate: '2025-04-10',
    status: 'pending',
    priority: 'low',
    goalId: '1',
    type: 'manual',
  },
  {
    id: '4',
    name: 'Project Planning',
    description: 'Outline next week\'s project milestones',
    scheduledTime: '15:00',
    dueDate: '2025-04-10',
    status: 'pending',
    priority: 'high',
    type: 'ai',
  },
  {
    id: '5',
    name: 'Evening Stretch',
    description: 'Do 15 minutes of full-body stretching',
    scheduledTime: '19:00',
    dueDate: '2025-04-10',
    status: 'pending',
    priority: 'medium',
    habitId: '3',
    type: 'recurring',
  },
  {
    id: '6',
    name: 'Weekly Review',
    description: 'Review progress on all habits and goals',
    scheduledTime: '18:00',
    dueDate: '2025-04-12',
    status: 'pending',
    priority: 'high',
    type: 'recurring',
  },
];

const mockHabitsAndGoals: HabitOrGoal[] = [
  { id: '1', name: 'Morning Meditation', category: 'Mindfulness', color: '#9b87f5' },
  { id: '2', name: 'Daily Exercise', category: 'Fitness', color: '#4ade80' },
  { id: '3', name: 'Evening Routine', category: 'Wellness', color: '#f97316' },
  { id: 'g1', name: 'Read 12 Books', category: 'Learning', color: '#0ea5e9' },
  { id: 'g2', name: 'Run 100 Miles', category: 'Fitness', color: '#4ade80' },
];

const Tasks = () => {
  // State for tasks and filtering
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(mockTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  
  // Filter states
  const [dateFilter, setDateFilter] = useState<'today' | 'week' | 'upcoming' | 'all'>('today');
  const [habitGoalFilter, setHabitGoalFilter] = useState<string>('all');
  const [taskTypeFilter, setTaskTypeFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority' | 'status'>('dueDate');
  
  // Filter functions
  const applyFilters = () => {
    let result = [...tasks];
    
    // Date filter
    if (dateFilter !== 'all') {
      const today = new Date().toISOString().split('T')[0];
      const oneWeekLater = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      if (dateFilter === 'today') {
        result = result.filter(task => task.dueDate === today);
      } else if (dateFilter === 'week') {
        result = result.filter(task => task.dueDate >= today && task.dueDate <= oneWeekLater);
      } else if (dateFilter === 'upcoming') {
        result = result.filter(task => task.dueDate > oneWeekLater);
      }
    }
    
    // Habit/Goal filter
    if (habitGoalFilter !== 'all') {
      result = result.filter(task => 
        (task.habitId && task.habitId === habitGoalFilter) || 
        (task.goalId && task.goalId === habitGoalFilter)
      );
    }
    
    // Task type filter
    if (taskTypeFilter !== 'all') {
      result = result.filter(task => task.type === taskTypeFilter);
    }
    
    // Sort
    result.sort((a, b) => {
      if (sortBy === 'dueDate') {
        return a.dueDate.localeCompare(b.dueDate) || 
               (a.scheduledTime || '').localeCompare(b.scheduledTime || '');
      } else if (sortBy === 'priority') {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      } else if (sortBy === 'status') {
        const statusOrder = { pending: 0, completed: 1, skipped: 2 };
        return statusOrder[a.status] - statusOrder[b.status];
      }
      return 0;
    });
    
    setFilteredTasks(result);
  };
  
  // Apply filters when any filter changes
  React.useEffect(() => {
    applyFilters();
  }, [tasks, dateFilter, habitGoalFilter, taskTypeFilter, sortBy]);
  
  // Handler functions
  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsDetailsPanelOpen(true);
  };
  
  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(prev => prev.map(task => task.id === updatedTask.id ? updatedTask : task));
    setSelectedTask(null);
    setIsDetailsPanelOpen(false);
  };
  
  const handleTaskDelete = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    if (selectedTask?.id === taskId) {
      setSelectedTask(null);
      setIsDetailsPanelOpen(false);
    }
  };
  
  const handleBulkStatusChange = (status: 'completed' | 'pending' | 'skipped') => {
    setTasks(prev => 
      prev.map(task => 
        selectedItems.includes(task.id) ? { ...task, status } : task
      )
    );
    setSelectedItems([]);
  };
  
  const handleCreateTask = () => {
    // For now, just show a placeholder task in the panel
    const newTask: Task = {
      id: `new-${Date.now()}`,
      name: '',
      dueDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      priority: 'medium',
      type: 'manual',
    };
    setSelectedTask(newTask);
    setIsDetailsPanelOpen(true);
  };
  
  const findHabitOrGoalById = (id?: string): HabitOrGoal | undefined => {
    if (!id) return undefined;
    return mockHabitsAndGoals.find(item => item.id === id);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <TopNavBar />
      
      <main className="flex-1 container mx-auto px-4 py-6 max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your Tasks</h1>
          <Button onClick={handleCreateTask} className="ml-auto">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">Filter:</span>
              </div>
              
              <Select value={dateFilter} onValueChange={(value: any) => setDateFilter(value)}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="all">All Dates</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={habitGoalFilter} onValueChange={setHabitGoalFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Habit/Goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Habits/Goals</SelectItem>
                  {mockHabitsAndGoals.map(item => (
                    <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={taskTypeFilter} onValueChange={setTaskTypeFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Task Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                  <SelectItem value="recurring">Recurring</SelectItem>
                  <SelectItem value="ai">AI-Generated</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Sort:</span>
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dueDate">Due Date</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {selectedItems.length > 0 && (
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6 flex items-center justify-between">
            <div className="text-sm">
              <span className="font-medium">{selectedItems.length}</span> tasks selected
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleBulkStatusChange('completed')}
              >
                Mark Complete
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleBulkStatusChange('pending')}
              >
                Mark Pending
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSelectedItems([])}
              >
                Clear Selection
              </Button>
            </div>
          </div>
        )}
        
        {filteredTasks.length > 0 ? (
          <TasksList 
            tasks={filteredTasks}
            habitsAndGoals={mockHabitsAndGoals}
            onTaskClick={handleTaskClick}
            onTaskDelete={handleTaskDelete}
            onTaskUpdate={handleTaskUpdate}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
            <h3 className="text-lg font-medium mb-2">No tasks found for this view</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Try changing your filters or create a new task.
            </p>
            <Button onClick={handleCreateTask}>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Task
            </Button>
          </div>
        )}
      </main>
      
      <Sheet open={isDetailsPanelOpen} onOpenChange={setIsDetailsPanelOpen}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>
              {selectedTask?.id.startsWith('new-') ? 'Create New Task' : 'Task Details'}
            </SheetTitle>
            <SheetDescription>
              View and edit task information
            </SheetDescription>
          </SheetHeader>
          
          {selectedTask && (
            <TaskDetailsPanel 
              task={selectedTask}
              habitsAndGoals={mockHabitsAndGoals}
              onTaskUpdate={handleTaskUpdate}
              onTaskDelete={handleTaskDelete}
              onClose={() => setIsDetailsPanelOpen(false)}
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Tasks;
