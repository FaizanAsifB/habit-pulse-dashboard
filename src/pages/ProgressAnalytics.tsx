
import React, { useState } from 'react';
import TopNavBar from '@/components/TopNavBar';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { 
  ArrowUpRight, 
  Calendar, 
  CheckCircle2, 
  Dumbbell, 
  Flame, 
  Target, 
  Trophy, 
  Zap 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import MotivationalInsight from '@/components/MotivationalInsight';
import CompletionTrendsChart from '@/components/CompletionTrendsChart';
import HabitProgressList from '@/components/HabitProgressList';
import GoalProgressList from '@/components/GoalProgressList';
import AchievementBadges from '@/components/AchievementBadges';

type DateRange = 'week' | 'month' | 'quarter' | 'year';

const ProgressAnalytics = () => {
  const [dateRange, setDateRange] = useState<DateRange>('week');
  
  // Mock data for summary stats
  const summaryStats = {
    tasksCompleted: 42,
    tasksCompletedChange: 8,
    activeHabits: 7,
    activeHabitsChange: 1,
    goalsInProgress: 3,
    goalsInProgressChange: 0,
    longestStreak: 30,
    longestStreakChange: 4,
    completionRate: 78,
    completionRateChange: 5,
  };
  
  // Mock data for insights
  const insights = [
    "You're most productive on Wednesday afternoons",
    "Your meditation habit has the highest completion rate (92%)",
    "Consider scheduling exercise earlier in the day for better consistency",
    "You've improved your reading habit completion by 15% this month"
  ];
  
  // Weekly activity data for timeline chart
  const weeklyActivityData = [
    { day: 'Mon', completed: 6, total: 8 },
    { day: 'Tue', completed: 7, total: 8 },
    { day: 'Wed', completed: 8, total: 8 },
    { day: 'Thu', completed: 5, total: 8 },
    { day: 'Fri', completed: 4, total: 8 },
    { day: 'Sat', completed: 6, total: 8 },
    { day: 'Sun', completed: 6, total: 8 },
  ];
  
  // Daily productivity trend data
  const productivityTrendData = [
    { date: '04/03', productivity: 65 },
    { date: '04/04', productivity: 72 },
    { date: '04/05', productivity: 78 },
    { date: '04/06', productivity: 63 },
    { date: '04/07', productivity: 82 },
    { date: '04/08', productivity: 88 },
    { date: '04/09', productivity: 76 },
  ];
  
  const chartConfig = {
    completed: {
      label: 'Completed',
      theme: { light: '#9b87f5', dark: '#9b87f5' },
    },
    total: {
      label: 'Total',
      theme: { light: '#e5deff', dark: '#6E59A5' },
    },
    productivity: {
      label: 'Productivity',
      theme: { light: '#9b87f5', dark: '#9b87f5' },
    },
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <TopNavBar />
      
      <div className="flex-1 container mx-auto px-4 py-6 max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Progress & Analytics</h1>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                <Calendar className="h-4 w-4 mr-1" />
                {dateRange === 'week' && 'This Week'}
                {dateRange === 'month' && 'This Month'}
                {dateRange === 'quarter' && 'This Quarter'}
                {dateRange === 'year' && 'This Year'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setDateRange('week')}>This Week</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateRange('month')}>This Month</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateRange('quarter')}>This Quarter</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateRange('year')}>This Year</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Summary Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <StatCard 
            title="Tasks Completed" 
            value={summaryStats.tasksCompleted}
            change={summaryStats.tasksCompletedChange}
            icon={<CheckCircle2 className="h-5 w-5 text-green-500" />}
          />
          <StatCard 
            title="Active Habits" 
            value={summaryStats.activeHabits}
            change={summaryStats.activeHabitsChange}
            icon={<Dumbbell className="h-5 w-5 text-blue-500" />}
          />
          <StatCard 
            title="Goals In Progress" 
            value={summaryStats.goalsInProgress}
            change={summaryStats.goalsInProgressChange}
            icon={<Target className="h-5 w-5 text-purple-500" />}
          />
          <StatCard 
            title="Longest Streak" 
            value={summaryStats.longestStreak}
            suffix="days"
            change={summaryStats.longestStreakChange}
            icon={<Flame className="h-5 w-5 text-orange-500" />}
          />
          <StatCard 
            title="Completion Rate" 
            value={summaryStats.completionRate}
            suffix="%"
            change={summaryStats.completionRateChange}
            icon={<Zap className="h-5 w-5 text-yellow-500" />}
          />
        </div>
        
        {/* AI Insights Section */}
        <MotivationalInsight 
          message={insights[Math.floor(Math.random() * insights.length)]} 
          title="Analytics Insight"
        />
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Weekly Activity Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Activity</CardTitle>
              <CardDescription>Tasks completed per day this week</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer 
                className="h-[250px]" 
                config={chartConfig}
              >
                <BarChart data={weeklyActivityData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Bar 
                    dataKey="total" 
                    name="total" 
                    fill="var(--color-total)" 
                    radius={[4, 4, 0, 0]} 
                  />
                  <Bar 
                    dataKey="completed" 
                    name="completed" 
                    fill="var(--color-completed)" 
                    radius={[4, 4, 0, 0]} 
                  />
                  <ChartTooltip />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          
          {/* Productivity Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Productivity Trend</CardTitle>
              <CardDescription>Your productivity score over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer 
                className="h-[250px]" 
                config={chartConfig}
              >
                <LineChart data={productivityTrendData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Line 
                    type="monotone" 
                    dataKey="productivity" 
                    name="productivity" 
                    stroke="var(--color-productivity)" 
                    strokeWidth={2}
                    dot={{ r: 4, fill: "var(--color-productivity)" }}
                  />
                  <ChartTooltip />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
        
        {/* Habit Progress Section */}
        <HabitProgressList dateRange={dateRange} />
        
        {/* Goal Progress Section */}
        <GoalProgressList dateRange={dateRange} />
        
        {/* Completion Trends Section */}
        <CompletionTrendsChart dateRange={dateRange} />
        
        {/* Achievements Section */}
        <AchievementBadges />
      </div>
    </div>
  );
};

// Stat Card Component
interface StatCardProps {
  title: string;
  value: number;
  suffix?: string;
  change?: number;
  icon?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, suffix = '', change = 0, icon }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}{suffix}</p>
            
            {change !== 0 && (
              <div className={`flex items-center text-xs mt-1 ${change > 0 ? 'text-green-500' : change < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                <ArrowUpRight className={`h-3 w-3 mr-1 ${change < 0 ? 'rotate-180' : ''}`} />
                <span>{Math.abs(change)}{suffix} {change > 0 ? 'increase' : 'decrease'}</span>
              </div>
            )}
          </div>
          
          <div className="h-10 w-10 rounded-full bg-background border-2 border-muted flex items-center justify-center">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressAnalytics;
