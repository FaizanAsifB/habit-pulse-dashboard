
import React from 'react';
import { format } from 'date-fns';
import { Check, Clock, Trash, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Task {
  id: string;
  title: string;
  time: string;
  status: 'completed' | 'pending' | 'skipped';
  category?: string;
}

interface TodayScheduleProps {
  date: Date;
  tasks: Task[];
  onUpdateTaskStatus: (taskId: string, status: 'completed' | 'pending' | 'skipped') => void;
}

const TodaySchedule: React.FC<TodayScheduleProps> = ({ date, tasks, onUpdateTaskStatus }) => {
  return (
    <div className="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="p-4 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold">
          Schedule for {format(date, 'EEEE, MMMM d')}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} scheduled
        </p>
      </div>
      
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {tasks.map((task) => (
          <div key={task.id} className="task-item">
            <div 
              className={`w-2 h-8 rounded-full mr-3 ${
                task.status === 'completed' 
                  ? 'bg-habit-success' 
                  : task.status === 'skipped' 
                    ? 'bg-habit-danger' 
                    : 'bg-habit-warning'
              }`}
            />
            
            <div className="flex-1">
              <div className="flex items-center">
                <h3 className={`font-medium ${
                  task.status === 'completed' ? 'line-through text-gray-400' : ''
                }`}>
                  {task.title}
                </h3>
                {task.category && (
                  <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-habit-accent text-habit-primary">
                    {task.category}
                  </span>
                )}
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Clock className="h-3 w-3 mr-1" />
                <span>{task.time}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              {task.status !== 'completed' && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => onUpdateTaskStatus(task.id, 'completed')}
                  className="h-8 w-8 text-habit-success hover:text-habit-success/80 hover:bg-habit-success/10"
                >
                  <Check className="h-4 w-4" />
                </Button>
              )}
              
              {task.status !== 'skipped' && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => onUpdateTaskStatus(task.id, 'skipped')}
                  className="h-8 w-8 text-habit-danger hover:text-habit-danger/80 hover:bg-habit-danger/10"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
              
              {task.status !== 'pending' && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => onUpdateTaskStatus(task.id, 'pending')}
                  className="h-8 w-8 text-habit-warning hover:text-habit-warning/80 hover:bg-habit-warning/10"
                >
                  <Clock className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
        
        {tasks.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">No tasks scheduled for today</p>
            <Button variant="outline" className="mt-4">
              Add Task
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodaySchedule;
