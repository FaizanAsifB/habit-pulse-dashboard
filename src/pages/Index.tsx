
import React, { useState } from 'react';
import TopNavBar from '@/components/TopNavBar';
import WeekCalendarStrip from '@/components/WeekCalendarStrip';
import TodaySchedule from '@/components/TodaySchedule';
import QuickStats from '@/components/QuickStats';
import StreaksAndProgress from '@/components/StreaksAndProgress';
import MotivationalInsight from '@/components/MotivationalInsight';

// Updated type definition to include 'skipped' status
type TaskStatus = 'completed' | 'pending' | 'skipped';

interface Task {
  id: string;
  title: string;
  time: string;
  status: TaskStatus;
  category?: string;
}

// Sample mock data with updated type
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Morning Meditation',
    time: '7:00 AM',
    status: 'completed',
    category: 'Mindfulness'
  },
  {
    id: '2',
    title: 'Workout Session',
    time: '8:30 AM',
    status: 'completed',
    category: 'Fitness'
  },
  {
    id: '3',
    title: 'Read Book',
    time: '12:00 PM',
    status: 'pending',
    category: 'Learning'
  },
  {
    id: '4',
    title: 'Project Planning',
    time: '3:00 PM',
    status: 'pending',
    category: 'Work'
  },
  {
    id: '5',
    title: 'Evening Walk',
    time: '6:00 PM',
    status: 'pending',
    category: 'Fitness'
  }
];

const mockStats = {
  activeHabits: 8,
  activeGoals: 3,
  completedToday: 2,
  totalToday: 5,
  completedThisWeek: 14,
  totalThisWeek: 23
};

const mockHabitStreaks = [
  {
    id: '1',
    name: 'Morning Meditation',
    streak: 23,
    category: 'Mindfulness'
  },
  {
    id: '2',
    name: 'Daily Exercise',
    streak: 16,
    category: 'Fitness'
  },
  {
    id: '3',
    name: 'Reading',
    streak: 7,
    category: 'Learning'
  }
];

const mockGoalProgress = [
  {
    id: '1',
    name: 'Read 12 Books',
    progress: 3,
    target: 12,
    unit: 'books',
    category: 'Learning'
  },
  {
    id: '2',
    name: 'Run 100 Miles',
    progress: 42,
    target: 100,
    unit: 'miles',
    category: 'Fitness'
  },
  {
    id: '3',
    name: 'Meditate 30 Hours',
    progress: 12,
    target: 30,
    unit: 'hours',
    category: 'Mindfulness'
  }
];

const motivationalMessages = [
  "You're most productive on Wednesdays! Schedule important tasks on Wednesdays for maximum efficiency.",
  "Great job keeping up with your meditation streak! Research shows it boosts focus by 14%.",
  "Your consistency this week is 24% better than last week. Keep up the momentum!",
  "You've completed more morning tasks than 85% of users. Morning routines lead to success!",
  "Tip: Try grouping similar habits together for better adherence. Your brain loves patterns!"
];

const Index = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [motivationalMessage, setMotivationalMessage] = useState(
    motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]
  );
  
  const handleUpdateTaskStatus = (taskId: string, status: TaskStatus) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, status } : task
      )
    );
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      
      <div className="flex-1 container mx-auto px-4 py-6 max-w-6xl">
        <WeekCalendarStrip 
          selectedDate={selectedDate} 
          onDateChange={setSelectedDate}
        />
        
        <QuickStats stats={mockStats} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <TodaySchedule 
              date={selectedDate} 
              tasks={tasks} 
              onUpdateTaskStatus={handleUpdateTaskStatus} 
            />
          </div>
          
          <div className="lg:col-span-1">
            <MotivationalInsight message={motivationalMessage} />
          </div>
        </div>
        
        <StreaksAndProgress 
          habitStreaks={mockHabitStreaks} 
          goalProgress={mockGoalProgress} 
        />
      </div>
    </div>
  );
};

export default Index;
