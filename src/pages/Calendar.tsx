
import React, { useState } from 'react';
import { format, addDays, subDays, addMonths, subMonths, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isSameDay } from 'date-fns';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, PlusCircle, Filter, Sun, Clock } from 'lucide-react';
import TopNavBar from '@/components/TopNavBar';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

// Type for calendar view options
type CalendarView = 'day' | 'week' | 'month';

// Sample time block/task data
interface TimeBlock {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  date: Date;
  category?: string;
  completed?: boolean;
}

// Generate sample data
const generateSampleTimeBlocks = (): TimeBlock[] => {
  const today = new Date();
  const tomorrow = addDays(today, 1);
  const dayAfter = addDays(today, 2);
  
  return [
    {
      id: '1',
      title: 'Morning Meditation',
      startTime: '07:00',
      endTime: '07:30',
      date: today,
      category: 'Mindfulness',
      completed: true
    },
    {
      id: '2',
      title: 'Workout Session',
      startTime: '08:30',
      endTime: '09:30',
      date: today,
      category: 'Fitness',
      completed: false
    },
    {
      id: '3',
      title: 'Project Planning',
      startTime: '10:00',
      endTime: '11:30',
      date: today,
      category: 'Work',
      completed: false
    },
    {
      id: '4',
      title: 'Team Meeting',
      startTime: '14:00',
      endTime: '15:00',
      date: tomorrow,
      category: 'Work',
      completed: false
    },
    {
      id: '5',
      title: 'Evening Run',
      startTime: '18:00',
      endTime: '19:00',
      date: dayAfter,
      category: 'Fitness',
      completed: false
    }
  ];
};

const CalendarPage: React.FC = () => {
  const [view, setView] = useState<CalendarView>('week');
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [timeBlocks, setTimeBlocks] = useState<TimeBlock[]>(generateSampleTimeBlocks());
  const [showCompleted, setShowCompleted] = useState<boolean>(true);
  
  // Navigation functions
  const goToToday = () => setCurrentDate(new Date());
  
  const navigatePrevious = () => {
    if (view === 'day') {
      setCurrentDate(prevDate => subDays(prevDate, 1));
    } else if (view === 'week') {
      setCurrentDate(prevDate => subDays(prevDate, 7));
    } else {
      setCurrentDate(prevDate => subMonths(prevDate, 1));
    }
  };
  
  const navigateNext = () => {
    if (view === 'day') {
      setCurrentDate(prevDate => addDays(prevDate, 1));
    } else if (view === 'week') {
      setCurrentDate(prevDate => addDays(prevDate, 7));
    } else {
      setCurrentDate(prevDate => addMonths(prevDate, 1));
    }
  };
  
  // Generate header title based on current view
  const getHeaderTitle = () => {
    if (view === 'day') {
      return format(currentDate, 'MMMM d, yyyy');
    } else if (view === 'week') {
      const start = startOfWeek(currentDate, { weekStartsOn: 1 });
      const end = endOfWeek(currentDate, { weekStartsOn: 1 });
      return `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`;
    } else {
      return format(currentDate, 'MMMM yyyy');
    }
  };
  
  // Filter time blocks based on current view and date
  const getVisibleTimeBlocks = (): TimeBlock[] => {
    let filteredBlocks = timeBlocks;
    
    if (!showCompleted) {
      filteredBlocks = filteredBlocks.filter(block => !block.completed);
    }
    
    if (view === 'day') {
      return filteredBlocks.filter(block => isSameDay(block.date, currentDate));
    } else if (view === 'week') {
      const start = startOfWeek(currentDate, { weekStartsOn: 1 });
      const end = endOfWeek(currentDate, { weekStartsOn: 1 });
      return filteredBlocks.filter(block => {
        const blockDate = new Date(block.date);
        return blockDate >= start && blockDate <= end;
      });
    } else {
      const start = startOfMonth(currentDate);
      const end = endOfMonth(currentDate);
      return filteredBlocks.filter(block => {
        const blockDate = new Date(block.date);
        return blockDate >= start && blockDate <= end;
      });
    }
  };
  
  // Generate time slots for day view
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return `${hour}:00`;
  });
  
  // Generate week days
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(startOfWeek(currentDate, { weekStartsOn: 1 }), i);
    return {
      date,
      dayName: format(date, 'EEE'),
      dayNumber: format(date, 'd')
    };
  });
  
  // Add a new time block
  const handleAddTimeBlock = () => {
    // This would typically open a modal or form to add a new time block
    alert('Add time block functionality would go here');
  };
  
  // Render time block card
  const renderTimeBlock = (block: TimeBlock) => {
    const categoryColors: Record<string, string> = {
      'Mindfulness': 'bg-purple-100 border-purple-300 text-purple-700',
      'Fitness': 'bg-emerald-100 border-emerald-300 text-emerald-700',
      'Work': 'bg-blue-100 border-blue-300 text-blue-700',
      'Learning': 'bg-amber-100 border-amber-300 text-amber-700'
    };
    
    const colorClass = block.category && categoryColors[block.category] 
      ? categoryColors[block.category] 
      : 'bg-gray-100 border-gray-300 text-gray-700';
    
    return (
      <div 
        key={block.id}
        className={`time-block p-2 rounded-md border mb-2 ${colorClass} ${block.completed ? 'opacity-60' : ''}`}
      >
        <div className="font-medium">{block.title}</div>
        <div className="text-xs flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          {block.startTime} - {block.endTime}
        </div>
        {block.category && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-white/30 inline-block mt-1">
            {block.category}
          </span>
        )}
      </div>
    );
  };
  
  // Render day view
  const renderDayView = () => {
    const blocks = getVisibleTimeBlocks();
    
    return (
      <div className="day-view h-[calc(100vh-220px)] overflow-y-auto">
        <div className="grid grid-cols-[100px_1fr] gap-2">
          {timeSlots.map(timeSlot => {
            const hour = parseInt(timeSlot.split(':')[0]);
            const timeBlocksForHour = blocks.filter(block => {
              const blockHour = parseInt(block.startTime.split(':')[0]);
              return blockHour === hour;
            });
            
            return (
              <React.Fragment key={timeSlot}>
                <div className="time-slot text-right pr-4 text-gray-500 text-sm py-2 sticky left-0">
                  {timeSlot}
                </div>
                <div className="time-content min-h-[60px] border-t border-gray-100 py-2">
                  {timeBlocksForHour.map(block => renderTimeBlock(block))}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  };
  
  // Render week view
  const renderWeekView = () => {
    const blocks = getVisibleTimeBlocks();
    
    return (
      <div className="week-view h-[calc(100vh-220px)] overflow-y-auto">
        <div className="grid grid-cols-[100px_1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-2">
          {/* Header row with day names */}
          <div className="sticky top-0 bg-white z-10">
            <div className="h-16"></div>
          </div>
          {weekDays.map(day => (
            <div 
              key={day.date.toISOString()} 
              className={`sticky top-0 bg-white z-10 text-center py-2 ${
                isSameDay(day.date, new Date()) ? 'bg-habit-accent text-habit-primary font-bold rounded-t-lg' : ''
              }`}
            >
              <div className="text-sm">{day.dayName}</div>
              <div className="font-semibold text-lg">{day.dayNumber}</div>
            </div>
          ))}
          
          {/* Time slots */}
          {timeSlots.map(timeSlot => {
            const hour = parseInt(timeSlot.split(':')[0]);
            
            return (
              <React.Fragment key={timeSlot}>
                <div className="time-slot text-right pr-4 text-gray-500 text-sm py-2 sticky left-0">
                  {timeSlot}
                </div>
                
                {/* Day columns */}
                {weekDays.map(day => {
                  const dayBlocks = blocks.filter(block => {
                    const blockHour = parseInt(block.startTime.split(':')[0]);
                    return blockHour === hour && isSameDay(block.date, day.date);
                  });
                  
                  return (
                    <div 
                      key={`${day.date.toISOString()}-${timeSlot}`} 
                      className="time-cell min-h-[60px] border-t border-gray-100 py-1 px-1"
                    >
                      {dayBlocks.map(block => renderTimeBlock(block))}
                    </div>
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  };
  
  // Render month view
  const renderMonthView = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const startDate = startOfWeek(start, { weekStartsOn: 1 });
    
    // Generate 6 weeks to ensure we cover the full month view
    const days = Array.from({ length: 42 }, (_, i) => addDays(startDate, i));
    const blocks = getVisibleTimeBlocks();
    
    return (
      <div className="month-view">
        <div className="grid grid-cols-7 gap-2">
          {/* Day names */}
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(dayName => (
            <div key={dayName} className="text-center py-2 font-medium text-sm">
              {dayName}
            </div>
          ))}
          
          {/* Calendar days */}
          {days.map(day => {
            const isCurrentMonth = day.getMonth() === currentDate.getMonth();
            const isToday = isSameDay(day, new Date());
            const dayBlocks = blocks.filter(block => isSameDay(new Date(block.date), day));
            
            return (
              <div 
                key={day.toISOString()}
                className={`calendar-day p-1 min-h-[100px] border rounded-md ${
                  isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'
                } ${isToday ? 'border-habit-primary' : 'border-gray-100'}`}
              >
                <div className={`text-right ${isToday ? 'font-bold text-habit-primary' : ''}`}>
                  {format(day, 'd')}
                </div>
                <div className="day-blocks mt-1 overflow-y-auto max-h-[80px]">
                  {dayBlocks.length > 0 ? (
                    dayBlocks.map(block => (
                      <div 
                        key={block.id}
                        className={`text-xs p-1 mb-1 rounded truncate ${
                          block.category === 'Mindfulness' ? 'bg-purple-100 text-purple-700' :
                          block.category === 'Fitness' ? 'bg-emerald-100 text-emerald-700' :
                          block.category === 'Work' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        } ${block.completed ? 'opacity-60' : ''}`}
                      >
                        {block.startTime} {block.title}
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-gray-400 italic">No events</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <TopNavBar />
      
      <main className="container mx-auto pt-6 px-4">
        <div className="header-controls flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          {/* Date selector and navigation */}
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <Button variant="outline" size="icon" onClick={navigatePrevious}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <h1 className="text-xl font-bold mx-2">{getHeaderTitle()}</h1>
            
            <Button variant="outline" size="icon" onClick={navigateNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" size="sm" onClick={goToToday} className="ml-2">
              Today
            </Button>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon">
                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={currentDate}
                  onSelect={(date) => date && setCurrentDate(date)}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Right side controls */}
          <div className="flex flex-wrap items-center gap-2">
            <ToggleGroup type="single" value={view} onValueChange={(value) => value && setView(value as CalendarView)}>
              <ToggleGroupItem value="day" aria-label="Day view">Day</ToggleGroupItem>
              <ToggleGroupItem value="week" aria-label="Week view">Week</ToggleGroupItem>
              <ToggleGroupItem value="month" aria-label="Month view">Month</ToggleGroupItem>
            </ToggleGroup>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => setShowCompleted(!showCompleted)}
                  className={!showCompleted ? 'bg-gray-100' : ''}
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {showCompleted ? 'Hide completed' : 'Show completed'}
              </TooltipContent>
            </Tooltip>
            
            <Button onClick={handleAddTimeBlock}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Time Block
            </Button>
          </div>
        </div>
        
        {/* Main calendar content */}
        <div className="calendar-content bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-700">
          {view === 'day' && renderDayView()}
          {view === 'week' && renderWeekView()}
          {view === 'month' && renderMonthView()}
          
          {/* Empty state */}
          {getVisibleTimeBlocks().length === 0 && (
            <div className="empty-state py-16 text-center">
              <div className="text-gray-400 mb-4">
                <CalendarIcon className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-medium mb-2">No time blocks scheduled</h3>
              <p className="text-gray-500 mb-4">Plan your day by adding some time blocks</p>
              <Button onClick={handleAddTimeBlock}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Schedule Your First Task
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CalendarPage;
