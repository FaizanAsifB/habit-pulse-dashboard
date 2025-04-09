
import React from 'react';

interface HabitStreak {
  id: string;
  name: string;
  streak: number;
  category?: string;
}

interface GoalProgress {
  id: string;
  name: string;
  progress: number;
  target: number;
  unit?: string;
  category?: string;
}

interface StreaksAndProgressProps {
  habitStreaks: HabitStreak[];
  goalProgress: GoalProgress[];
}

const StreaksAndProgress: React.FC<StreaksAndProgressProps> = ({ habitStreaks, goalProgress }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {/* Habit Streaks Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
        <h2 className="text-lg font-semibold mb-4">Current Streaks</h2>
        
        <div className="space-y-4">
          {habitStreaks.map((habit) => (
            <div key={habit.id} className="flex items-center">
              <div className="w-full">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <span className="font-medium">{habit.name}</span>
                    {habit.category && (
                      <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-habit-accent text-habit-primary">
                        {habit.category}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-semibold text-habit-primary">
                      {habit.streak} {habit.streak === 1 ? 'day' : 'days'}
                    </span>
                    <span className="ml-1 text-xl">🔥</span>
                  </div>
                </div>
                
                <div className="flex items-center w-full">
                  <div className="h-2 flex-grow rounded-full bg-gray-100 dark:bg-gray-700">
                    <div 
                      className="h-2 rounded-full bg-habit-primary"
                      style={{ 
                        width: `${Math.min(100, (habit.streak / 30) * 100)}%`,
                        transition: 'width 1s ease-in-out'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {habitStreaks.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              No active streaks yet. Start a habit to build your first streak!
            </p>
          )}
        </div>
      </div>
      
      {/* Goal Progress Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
        <h2 className="text-lg font-semibold mb-4">Goal Progress</h2>
        
        <div className="space-y-4">
          {goalProgress.map((goal) => (
            <div key={goal.id} className="flex items-center">
              <div className="w-full">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <span className="font-medium">{goal.name}</span>
                    {goal.category && (
                      <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-habit-accent text-habit-primary">
                        {goal.category}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-semibold">
                    {goal.progress} / {goal.target} {goal.unit || ''}
                  </span>
                </div>
                
                <div className="flex items-center w-full">
                  <div className="h-2 flex-grow rounded-full bg-gray-100 dark:bg-gray-700">
                    <div 
                      className="h-2 rounded-full bg-habit-primary"
                      style={{ 
                        width: `${Math.min(100, (goal.progress / goal.target) * 100)}%`,
                        transition: 'width 1s ease-in-out'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {goalProgress.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              No active goals yet. Set a goal to track your progress!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StreaksAndProgress;
