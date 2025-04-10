
import React from 'react';
import { 
  Check, 
  Clock, 
  Edit, 
  MoreVertical, 
  Trash2, 
  CalendarDays, 
  ArrowUp, 
  ArrowDown, 
  MinusCircle
} from 'lucide-react';
import { Task, HabitOrGoal } from '@/pages/Tasks';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface TasksListProps {
  tasks: Task[];
  habitsAndGoals: HabitOrGoal[];
  onTaskClick: (task: Task) => void;
  onTaskDelete: (taskId: string) => void;
  onTaskUpdate: (task: Task) => void;
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}

const TasksList: React.FC<TasksListProps> = ({
  tasks,
  habitsAndGoals,
  onTaskClick,
  onTaskDelete,
  onTaskUpdate,
  selectedItems,
  setSelectedItems,
}) => {
  const handleCheckboxChange = (checked: boolean | string, taskId: string) => {
    if (checked) {
      setSelectedItems(prev => [...prev, taskId]);
    } else {
      setSelectedItems(prev => prev.filter(id => id !== taskId));
    }
  };
  
  const handleToggleComplete = (task: Task) => {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    onTaskUpdate({ ...task, status: newStatus });
  };
  
  const getAssociatedItem = (task: Task): HabitOrGoal | undefined => {
    if (task.habitId) {
      return habitsAndGoals.find(item => item.id === task.habitId);
    }
    if (task.goalId) {
      return habitsAndGoals.find(item => item.id === task.goalId);
    }
    return undefined;
  };
  
  const formatDueDate = (dateString: string) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      if (dateString === today) return 'Today';
      if (dateString === tomorrow) return 'Tomorrow';
      
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (e) {
      return dateString;
    }
  };
  
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <ArrowUp className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <MinusCircle className="h-4 w-4 text-amber-500" />;
      case 'low':
        return <ArrowDown className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>Task</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Linked To</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map(task => {
            const associatedItem = getAssociatedItem(task);
            return (
              <TableRow 
                key={task.id}
                className={task.status === 'completed' ? 'opacity-60' : ''}
              >
                <TableCell>
                  <Checkbox
                    checked={selectedItems.includes(task.id)}
                    onCheckedChange={(checked) => handleCheckboxChange(checked, task.id)}
                  />
                </TableCell>
                <TableCell 
                  className="font-medium cursor-pointer"
                  onClick={() => onTaskClick(task)}
                >
                  <div className="flex flex-col">
                    <span className={task.status === 'completed' ? 'line-through' : ''}>
                      {task.name}
                    </span>
                    {task.scheduledTime && (
                      <span className="text-sm text-gray-500 flex items-center mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {task.scheduledTime}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <CalendarDays className="h-4 w-4 mr-2 text-gray-500" />
                    {formatDueDate(task.dueDate)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {getPriorityIcon(task.priority)}
                    <span className="ml-1 capitalize">{task.priority}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {associatedItem ? (
                    <Badge 
                      style={{ backgroundColor: associatedItem.color }}
                      className="text-white"
                    >
                      {associatedItem.name}
                    </Badge>
                  ) : (
                    <span className="text-gray-500">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      task.status === 'completed' 
                        ? 'default' 
                        : task.status === 'skipped' 
                          ? 'secondary' 
                          : 'outline'
                    }
                  >
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleToggleComplete(task)}
                    >
                      <Check className={`h-4 w-4 ${task.status === 'completed' ? 'text-green-500' : 'text-gray-500'}`} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onTaskClick(task)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onTaskClick(task)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => onTaskDelete(task.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TasksList;
