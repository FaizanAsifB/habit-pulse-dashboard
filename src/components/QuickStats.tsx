
import React from 'react';
import { 
  CalendarCheck, 
  CheckCircle, 
  Flame, 
  Target 
} from 'lucide-react';

interface StatsData {
  activeHabits: number;
  activeGoals: number;
  completedToday: number;
  totalToday: number;
  completedThisWeek: number;
  totalThisWeek: number;
}

interface QuickStatsProps {
  stats: StatsData;
}

const QuickStats: React.FC<QuickStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Active Habits Card */}
      <div className="habit-card">
        <div className="flex justify-between items-start">
          <div>
            <p className="stat-label">Active Habits</p>
            <p className="stat-value">{stats.activeHabits}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-habit-accent flex items-center justify-center">
            <Flame className="h-5 w-5 text-habit-primary" />
          </div>
        </div>
        <div className="mt-4 text-xs font-medium">
          <a href="#" className="text-habit-primary">View All Habits →</a>
        </div>
      </div>
      
      {/* Active Goals Card */}
      <div className="habit-card">
        <div className="flex justify-between items-start">
          <div>
            <p className="stat-label">Active Goals</p>
            <p className="stat-value">{stats.activeGoals}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-habit-accent flex items-center justify-center">
            <Target className="h-5 w-5 text-habit-primary" />
          </div>
        </div>
        <div className="mt-4 text-xs font-medium">
          <a href="#" className="text-habit-primary">View All Goals →</a>
        </div>
      </div>
      
      {/* Today's Completion Card */}
      <div className="habit-card">
        <div className="flex justify-between items-start">
          <div>
            <p className="stat-label">Completed Today</p>
            <p className="stat-value">
              {stats.completedToday}/{stats.totalToday}
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-1">
                ({Math.round((stats.completedToday / stats.totalToday) * 100)}%)
              </span>
            </p>
          </div>
          <div className="h-10 w-10 rounded-full bg-habit-accent flex items-center justify-center">
            <CheckCircle className="h-5 w-5 text-habit-primary" />
          </div>
        </div>
        <div className="w-full h-1 bg-gray-100 dark:bg-gray-700 rounded-full mt-4">
          <div 
            className="h-1 bg-habit-primary rounded-full"
            style={{ width: `${Math.round((stats.completedToday / stats.totalToday) * 100)}%` }}  
          ></div>
        </div>
      </div>
      
      {/* Weekly Completion Card */}
      <div className="habit-card">
        <div className="flex justify-between items-start">
          <div>
            <p className="stat-label">Completed This Week</p>
            <p className="stat-value">
              {stats.completedThisWeek}/{stats.totalThisWeek}
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-1">
                ({Math.round((stats.completedThisWeek / stats.totalThisWeek) * 100)}%)
              </span>
            </p>
          </div>
          <div className="h-10 w-10 rounded-full bg-habit-accent flex items-center justify-center">
            <CalendarCheck className="h-5 w-5 text-habit-primary" />
          </div>
        </div>
        <div className="w-full h-1 bg-gray-100 dark:bg-gray-700 rounded-full mt-4">
          <div 
            className="h-1 bg-habit-primary rounded-full"
            style={{ width: `${Math.round((stats.completedThisWeek / stats.totalThisWeek) * 100)}%` }}  
          ></div>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;
