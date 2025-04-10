
import React, { useState } from 'react';
import TopNavBar from '@/components/TopNavBar';
import { Button } from '@/components/ui/button';
import { 
  Filter, 
  Plus, 
  ChevronDown, 
  Target, 
  Check, 
  Calendar, 
  ArrowUpDown,
  Clock,
  Tag
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import GoalCard from '@/components/GoalCard';
import GoalDetailPanel from '@/components/GoalDetailPanel';
import GoalProgressSnapshot from '@/components/GoalProgressSnapshot';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Define types for our goals
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

// Schema for new goal form
const goalFormSchema = z.object({
  name: z.string().min(2, {
    message: "Goal name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  deadline: z.string(),
  tags: z.string().optional(),
});

const Goals = () => {
  // State for goals and UI controls
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isNewGoalOpen, setIsNewGoalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'progress' | 'deadline'>('deadline');
  const [filterTag, setFilterTag] = useState<string | null>(null);

  // Form for creating a new goal
  const form = useForm<z.infer<typeof goalFormSchema>>({
    resolver: zodResolver(goalFormSchema),
    defaultValues: {
      name: "",
      description: "",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
      tags: "",
    },
  });

  // Handle opening goal details
  const handleGoalClick = (goal: Goal) => {
    setSelectedGoal(goal);
    setIsDetailOpen(true);
  };

  // Handle creating a new goal
  const onSubmit = (values: z.infer<typeof goalFormSchema>) => {
    const newGoal: Goal = {
      id: `goal-${Date.now()}`,
      name: values.name,
      description: values.description || "",
      progress: 0,
      target: 100,
      deadline: values.deadline,
      createdAt: new Date().toISOString(),
      tags: values.tags ? values.tags.split(',').map(tag => tag.trim()) : [],
      linkedHabits: [],
      linkedTasks: [],
      milestones: [],
      completed: false
    };
    
    setGoals([newGoal, ...goals]);
    setIsNewGoalOpen(false);
    form.reset();
  };

  // Filter and sort goals
  const filteredGoals = goals
    .filter(goal => {
      if (filterStatus === 'active') return !goal.completed;
      if (filterStatus === 'completed') return goal.completed;
      return true;
    })
    .filter(goal => {
      if (!filterTag) return true;
      return goal.tags.includes(filterTag);
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'progress') return b.progress - a.progress;
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    });

  // Handle marking a goal as complete
  const handleMarkComplete = (goalId: string) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? { ...goal, completed: !goal.completed } 
        : goal
    ));
  };

  // Handle deleting a goal
  const handleDeleteGoal = (goalId: string) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      setGoals(goals.filter(goal => goal.id !== goalId));
      if (selectedGoal?.id === goalId) {
        setIsDetailOpen(false);
      }
    }
  };

  // Get all unique tags
  const allTags = Array.from(new Set(goals.flatMap(goal => goal.tags)));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <TopNavBar />
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Your Goals</h1>
          <Button onClick={() => setIsNewGoalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> New Goal
          </Button>
        </div>

        {/* Progress Snapshot */}
        <GoalProgressSnapshot 
          totalGoals={goals.length}
          activeGoals={goals.filter(g => !g.completed).length}
          completedThisMonth={goals.filter(g => 
            g.completed && new Date(g.deadline).getMonth() === new Date().getMonth()
          ).length}
          averageProgress={
            goals.filter(g => !g.completed).length > 0 
              ? goals.filter(g => !g.completed).reduce((acc, g) => acc + g.progress, 0) / 
                goals.filter(g => !g.completed).length
              : 0
          }
        />

        {/* Filters and Sorting */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <div className="flex flex-wrap gap-2">
            <Tabs defaultValue="all" className="w-auto" onValueChange={(v) => setFilterStatus(v as any)}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
            </Tabs>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  <Tag className="mr-2 h-4 w-4" />
                  {filterTag || 'All Tags'}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilterTag(null)}>
                  All Tags
                </DropdownMenuItem>
                {allTags.map(tag => (
                  <DropdownMenuItem key={tag} onClick={() => setFilterTag(tag)}>
                    {tag}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                Sort: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSortBy('name')}>
                Name
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('progress')}>
                Progress
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('deadline')}>
                Deadline
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Goals Grid View */}
        {filteredGoals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGoals.map(goal => (
              <GoalCard 
                key={goal.id} 
                goal={goal} 
                onClick={() => handleGoalClick(goal)}
                onMarkComplete={() => handleMarkComplete(goal.id)}
                onDelete={() => handleDeleteGoal(goal.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow">
            <Target className="mx-auto h-12 w-12 text-gray-400" />
            <h2 className="mt-4 text-xl font-medium text-gray-900 dark:text-gray-100">No goals found</h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {goals.length === 0 
                ? "Set clear targets and track your progress over time." 
                : "No goals match your current filters."}
            </p>
            {goals.length === 0 && (
              <Button 
                onClick={() => setIsNewGoalOpen(true)}
                className="mt-4"
              >
                Create your first goal
              </Button>
            )}
          </div>
        )}

        {/* Goal Detail Panel */}
        {selectedGoal && (
          <GoalDetailPanel 
            goal={selectedGoal}
            isOpen={isDetailOpen}
            onClose={() => setIsDetailOpen(false)}
            onMarkComplete={() => handleMarkComplete(selectedGoal.id)}
            onDelete={() => handleDeleteGoal(selectedGoal.id)}
          />
        )}

        {/* New Goal Dialog */}
        <Dialog open={isNewGoalOpen} onOpenChange={setIsNewGoalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Goal</DialogTitle>
              <DialogDescription>
                Set a meaningful goal with a clear deadline. You can link habits and tasks later.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Goal Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Run a Marathon" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your goal and why it matters to you" 
                          className="resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deadline</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormDescription>
                        When do you want to achieve this goal?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="health, career, learning (separate with commas)" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Tags help you categorize and filter your goals
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="submit">Create Goal</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

// Mock data for goals
const mockGoals: Goal[] = [
  {
    id: 'goal-1',
    name: 'Run a Marathon',
    description: 'Complete a full marathon (26.2 miles) with a time under 4 hours.',
    progress: 65,
    target: 100,
    deadline: '2025-10-15',
    createdAt: '2025-01-05',
    tags: ['health', 'fitness'],
    linkedHabits: ['Morning Runs', 'Stretching Routine'],
    linkedTasks: [
      { id: 'task-1', name: 'Sign up for marathon', completed: true },
      { id: 'task-2', name: 'Complete 15-mile training run', completed: true },
      { id: 'task-3', name: 'Buy new running shoes', completed: false },
      { id: 'task-4', name: 'Complete 20-mile training run', completed: false },
    ],
    milestones: [
      { id: 'milestone-1', name: 'Run 10 miles without stopping', completed: true },
      { id: 'milestone-2', name: 'Run half-marathon distance', completed: true },
      { id: 'milestone-3', name: 'Run 20 miles', completed: false },
      { id: 'milestone-4', name: 'Complete full marathon', completed: false }
    ],
    completed: false
  },
  {
    id: 'goal-2',
    name: 'Learn Spanish',
    description: 'Achieve B2 level proficiency in Spanish, able to hold conversations and read books.',
    progress: 30,
    target: 100,
    deadline: '2025-12-31',
    createdAt: '2025-01-10',
    tags: ['learning', 'language'],
    linkedHabits: ['Daily Vocabulary Practice', 'Language Exchange'],
    linkedTasks: [
      { id: 'task-5', name: 'Complete beginner Spanish course', completed: true },
      { id: 'task-6', name: 'Find language exchange partner', completed: true },
      { id: 'task-7', name: 'Read first Spanish book', completed: false },
    ],
    milestones: [
      { id: 'milestone-5', name: 'Complete A1 level', completed: true },
      { id: 'milestone-6', name: 'Hold 5-minute conversation', completed: false },
      { id: 'milestone-7', name: 'Watch movie without subtitles', completed: false },
      { id: 'milestone-8', name: 'B2 proficiency test', completed: false }
    ],
    completed: false
  },
  {
    id: 'goal-3',
    name: 'Save for Down Payment',
    description: 'Save $60,000 for a house down payment by cutting expenses and increasing income.',
    progress: 85,
    target: 100,
    deadline: '2025-06-30',
    createdAt: '2024-09-15',
    tags: ['finance', 'home'],
    linkedHabits: ['Monthly Budget Review', 'No-Spend Weekends'],
    linkedTasks: [
      { id: 'task-8', name: 'Open high-yield savings account', completed: true },
      { id: 'task-9', name: 'Cut subscription services', completed: true },
      { id: 'task-10', name: 'Meet with financial advisor', completed: true },
    ],
    milestones: [
      { id: 'milestone-9', name: 'Save first $15,000', completed: true },
      { id: 'milestone-10', name: 'Save $30,000', completed: true },
      { id: 'milestone-11', name: 'Save $45,000', completed: true },
      { id: 'milestone-12', name: 'Reach $60,000 goal', completed: false }
    ],
    completed: false
  },
  {
    id: 'goal-4',
    name: 'Publish a Novel',
    description: 'Write and publish a science fiction novel of at least 80,000 words.',
    progress: 100,
    target: 100,
    deadline: '2025-01-01',
    createdAt: '2024-01-10',
    tags: ['creative', 'writing'],
    linkedHabits: ['Daily Writing', 'Reading Fiction'],
    linkedTasks: [
      { id: 'task-11', name: 'Outline complete story', completed: true },
      { id: 'task-12', name: 'Write first draft', completed: true },
      { id: 'task-13', name: 'Edit manuscript', completed: true },
      { id: 'task-14', name: 'Submit to publishers', completed: true },
    ],
    milestones: [
      { id: 'milestone-13', name: 'Complete outline', completed: true },
      { id: 'milestone-14', name: 'Finish first draft', completed: true },
      { id: 'milestone-15', name: 'Complete final edits', completed: true },
      { id: 'milestone-16', name: 'Book published', completed: true }
    ],
    completed: true
  }
];

export default Goals;
