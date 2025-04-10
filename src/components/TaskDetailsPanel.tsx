
import React from 'react';
import { Task, HabitOrGoal } from '@/pages/Tasks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TaskDetailsPanelProps {
  task: Task;
  habitsAndGoals: HabitOrGoal[];
  onTaskUpdate: (task: Task) => void;
  onTaskDelete: (taskId: string) => void;
  onClose: () => void;
}

const TaskDetailsPanel: React.FC<TaskDetailsPanelProps> = ({
  task,
  habitsAndGoals,
  onTaskUpdate,
  onTaskDelete,
  onClose,
}) => {
  const [formState, setFormState] = React.useState<Task>(task);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleHabitGoalChange = (value: string) => {
    if (value === 'none') {
      setFormState(prev => ({ ...prev, habitId: undefined, goalId: undefined }));
    } else {
      const isGoal = value.startsWith('g');
      
      if (isGoal) {
        setFormState(prev => ({ ...prev, goalId: value, habitId: undefined }));
      } else {
        setFormState(prev => ({ ...prev, habitId: value, goalId: undefined }));
      }
    }
  };
  
  const getCurrentHabitOrGoalId = (): string => {
    if (formState.habitId) return formState.habitId;
    if (formState.goalId) return formState.goalId || '';
    return 'none';
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For new tasks, generate a proper ID
    if (formState.id.startsWith('new-')) {
      onTaskUpdate({
        ...formState,
        id: `task-${Date.now()}`
      });
    } else {
      onTaskUpdate(formState);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Task Name</Label>
          <Input
            id="name"
            name="name"
            value={formState.name}
            onChange={handleInputChange}
            placeholder="Enter task name"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formState.description || ''}
            onChange={handleInputChange}
            placeholder="Enter task description"
            rows={3}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <div className="relative">
              <Input
                id="dueDate"
                name="dueDate"
                type="date"
                value={formState.dueDate}
                onChange={handleInputChange}
                required
              />
              <Calendar className="absolute right-3 top-3 h-4 w-4 text-gray-500 pointer-events-none" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="scheduledTime">Scheduled Time</Label>
            <Input
              id="scheduledTime"
              name="scheduledTime"
              type="time"
              value={formState.scheduledTime || ''}
              onChange={handleInputChange}
              placeholder="Select time"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="linkedTo">Linked Habit/Goal</Label>
          <Select 
            value={getCurrentHabitOrGoalId()} 
            onValueChange={handleHabitGoalChange}
          >
            <SelectTrigger id="linkedTo">
              <SelectValue placeholder="Select a habit or goal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="habits" disabled className="font-semibold">
                Habits
              </SelectItem>
              {habitsAndGoals
                .filter(item => !item.id.startsWith('g'))
                .map(habit => (
                  <SelectItem key={habit.id} value={habit.id}>
                    {habit.name}
                  </SelectItem>
                ))}
              <SelectItem value="goals" disabled className="font-semibold">
                Goals
              </SelectItem>
              {habitsAndGoals
                .filter(item => item.id.startsWith('g'))
                .map(goal => (
                  <SelectItem key={goal.id} value={goal.id}>
                    {goal.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select 
              value={formState.priority} 
              onValueChange={(value: any) => handleSelectChange('priority', value)}
            >
              <SelectTrigger id="priority">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select 
              value={formState.status} 
              onValueChange={(value: any) => handleSelectChange('status', value)}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="skipped">Skipped</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="type">Task Type</Label>
          <Select 
            value={formState.type} 
            onValueChange={(value: any) => handleSelectChange('type', value)}
          >
            <SelectTrigger id="type">
              <SelectValue placeholder="Task Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="manual">Manual</SelectItem>
              <SelectItem value="recurring">Recurring</SelectItem>
              <SelectItem value="ai">AI-Generated</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            value={formState.notes || ''}
            onChange={handleInputChange}
            placeholder="Additional notes"
            rows={3}
          />
        </div>
      </div>
      
      <div className="flex justify-between mt-8">
        {!formState.id.startsWith('new-') && (
          <Button 
            type="button" 
            variant="destructive"
            onClick={() => {
              onTaskDelete(formState.id);
              onClose();
            }}
          >
            Delete
          </Button>
        )}
        
        <div className="flex space-x-2 ml-auto">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {formState.id.startsWith('new-') ? 'Create' : 'Update'} Task
          </Button>
        </div>
      </div>
    </form>
  );
};

export default TaskDetailsPanel;
