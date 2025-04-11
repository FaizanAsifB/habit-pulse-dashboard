import React, { useState, useCallback, useMemo } from 'react';
import { 
  Calendar as BigCalendar,
  dateFnsLocalizer, 
  Views
} from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, addDays, addHours, startOfDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import TopNavBar from '@/components/TopNavBar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  PlusCircle, 
  Filter 
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import EnergyLevelOverlay from '@/components/EnergyLevelOverlay';
import TimeBlockForm, { TimeBlockFormData } from '@/components/TimeBlockForm';
import { Calendar } from '@/components/ui/calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';

// Set up date-fns localizer for React Big Calendar
const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

// Type for calendar view options
type CalendarView = 'day' | 'week' | 'month';

// Event data structure for React Big Calendar
interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resource?: any;
  category?: string;
  completed?: boolean;
  description?: string;
}

// Energy level data type
interface EnergyLevelData {
  date: string;
  level: number;
  hour?: number;
}

const CalendarPage: React.FC = () => {
  // State variables
  const [view, setView] = useState<CalendarView>('week');
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [showCompleted, setShowCompleted] = useState<boolean>(true);
  const [energyLevels, setEnergyLevels] = useState<EnergyLevelData[]>(generateSampleEnergyData());
  const [events, setEvents] = useState<CalendarEvent[]>(generateSampleEvents());
  
  // Modal and form state
  const [isTimeBlockFormOpen, setIsTimeBlockFormOpen] = useState<boolean>(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);

  // Custom styles for the calendar
  const calendarStyles = useMemo(() => ({
    height: 'calc(100vh - 220px)',
    className: "bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-700"
  }), []);

  // Generate sample data for energy levels
  function generateSampleEnergyData(): EnergyLevelData[] {
    const data: EnergyLevelData[] = [];
    const today = new Date();
    
    // Generate daily energy data for the week
    for (let i = -3; i <= 3; i++) {
      const date = addDays(today, i);
      const dateString = format(date, 'yyyy-MM-dd');
      
      // Random energy level between 1 and 5
      const level = Math.floor(Math.random() * 5) + 1;
      
      data.push({
        date: dateString,
        level
      });
    }
    
    // Generate hourly energy data for today
    const todayString = format(today, 'yyyy-MM-dd');
    for (let hour = 8; hour <= 20; hour += 2) {
      // Random energy level between 1 and 5
      const level = Math.floor(Math.random() * 5) + 1;
      
      data.push({
        date: todayString,
        level,
        hour
      });
    }
    
    return data;
  }

  // Generate sample events
  function generateSampleEvents(): CalendarEvent[] {
    const today = new Date();
    
    // Create copies of today's date to modify without affecting the original
    const todayEvents = new Date(today);
    const tomorrowEvents = addDays(new Date(today), 1);
    const dayAfterEvents = addDays(new Date(today), 2);
    
    return [
      {
        id: '1',
        title: 'Morning Meditation',
        start: new Date(new Date(todayEvents).setHours(7, 0, 0, 0)),
        end: new Date(new Date(todayEvents).setHours(7, 30, 0, 0)),
        category: 'Mindfulness',
        completed: true,
        description: 'Focus on breathing and mindfulness'
      },
      {
        id: '2',
        title: 'Workout Session',
        start: new Date(new Date(todayEvents).setHours(8, 30, 0, 0)),
        end: new Date(new Date(todayEvents).setHours(9, 30, 0, 0)),
        category: 'Fitness',
        completed: false,
        description: 'Strength training day'
      },
      {
        id: '3',
        title: 'Project Planning',
        start: new Date(new Date(tomorrowEvents).setHours(10, 0, 0, 0)),
        end: new Date(new Date(tomorrowEvents).setHours(11, 30, 0, 0)),
        category: 'Work',
        completed: false,
        description: 'Quarterly goals review'
      },
      {
        id: '4',
        title: 'Team Meeting',
        start: new Date(new Date(tomorrowEvents).setHours(14, 0, 0, 0)),
        end: new Date(new Date(tomorrowEvents).setHours(15, 0, 0, 0)),
        category: 'Work',
        completed: false,
        description: 'Weekly sync'
      },
      {
        id: '5',
        title: 'Evening Run',
        start: new Date(new Date(dayAfterEvents).setHours(18, 0, 0, 0)),
        end: new Date(new Date(dayAfterEvents).setHours(19, 0, 0, 0)),
        category: 'Fitness',
        completed: false,
        description: '5k easy pace'
      },
      // Add more events scattered throughout the month for better monthly view
      {
        id: '6',
        title: 'Monthly Review',
        start: new Date(new Date(today.getFullYear(), today.getMonth(), 15, 10, 0)),
        end: new Date(new Date(today.getFullYear(), today.getMonth(), 15, 12, 0)),
        category: 'Work',
        completed: false,
        description: 'Monthly team review'
      },
      {
        id: '7',
        title: 'Yoga Class',
        start: new Date(new Date(today.getFullYear(), today.getMonth(), 20, 18, 0)),
        end: new Date(new Date(today.getFullYear(), today.getMonth(), 20, 19, 30)),
        category: 'Mindfulness',
        completed: false,
        description: 'Hatha yoga session'
      },
      {
        id: '8',
        title: 'Product Launch',
        start: new Date(new Date(today.getFullYear(), today.getMonth(), 25, 9, 0)),
        end: new Date(new Date(today.getFullYear(), today.getMonth(), 25, 17, 0)),
        category: 'Work',
        allDay: true,
        completed: false,
        description: 'New product launch day'
      }
    ];
  }

  // Navigation functions
  const goToToday = () => setCurrentDate(new Date());
  
  const navigatePrevious = () => {
    if (view === 'day') {
      setCurrentDate(prevDate => addDays(prevDate, -1));
    } else if (view === 'week') {
      setCurrentDate(prevDate => addDays(prevDate, -7));
    } else {
      // Month view
      const prevMonth = new Date(currentDate);
      prevMonth.setMonth(prevMonth.getMonth() - 1);
      setCurrentDate(prevMonth);
    }
  };
  
  const navigateNext = () => {
    if (view === 'day') {
      setCurrentDate(prevDate => addDays(prevDate, 1));
    } else if (view === 'week') {
      setCurrentDate(prevDate => addDays(prevDate, 7));
    } else {
      // Month view
      const nextMonth = new Date(currentDate);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      setCurrentDate(nextMonth);
    }
  };
  
  // Handle energy level updates
  const handleUpdateEnergyLevel = (date: string, level: number, hour?: number) => {
    setEnergyLevels(prev => {
      if (hour !== undefined) {
        // Handle hourly energy level update
        const existingHourlyIndex = prev.findIndex(item => item.date === date && item.hour === hour);
        
        if (existingHourlyIndex !== -1) {
          return prev.map(item => 
            (item.date === date && item.hour === hour) ? { ...item, level } : item
          );
        } else {
          return [...prev, { date, level, hour }];
        }
      } else {
        // Handle daily energy level update
        const existingDailyIndex = prev.findIndex(item => item.date === date && item.hour === undefined);
        
        if (existingDailyIndex !== -1) {
          return prev.map(item => 
            (item.date === date && item.hour === undefined) ? { ...item, level } : item
          );
        } else {
          return [...prev, { date, level }];
        }
      }
    });
  };
  
  // Get header title based on current view and date
  const getHeaderTitle = () => {
    if (view === 'day') {
      return format(currentDate, 'MMMM d, yyyy');
    } else if (view === 'week') {
      const start = startOfWeek(currentDate, { weekStartsOn: 1 });
      const end = addDays(start, 6);
      return `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`;
    } else {
      return format(currentDate, 'MMMM yyyy');
    }
  };
  
  // Event handlers for the calendar
  const handleSelectEvent = (event: CalendarEvent) => {
    setEditingEvent(event);
    setIsTimeBlockFormOpen(true);
  };

  const handleSelectSlot = ({ start, end }: { start: Date, end: Date }) => {
    const newEvent: CalendarEvent = {
      id: '',
      title: '',
      start,
      end,
      category: 'Work',
    };
    setEditingEvent(newEvent);
    setIsTimeBlockFormOpen(true);
  };
  
  // Handle saving time block from the form
  const handleSaveTimeBlock = (data: TimeBlockFormData) => {
    const { title, description, date, startTime, endTime, category, completed } = data;
    
    // Convert date and time strings to Date objects
    const startDate = new Date(date);
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    startDate.setHours(startHours, startMinutes, 0, 0);
    
    const endDate = new Date(date);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    endDate.setHours(endHours, endMinutes, 0, 0);
    
    const newEvent: CalendarEvent = {
      id: editingEvent?.id || Date.now().toString(),
      title,
      description,
      start: startDate,
      end: endDate,
      category,
      completed: completed || false
    };
    
    if (editingEvent?.id) {
      // Update existing event
      setEvents(events.map(event => 
        event.id === editingEvent.id ? newEvent : event
      ));
    } else {
      // Add new event
      setEvents([...events, newEvent]);
    }
    
    setIsTimeBlockFormOpen(false);
    setEditingEvent(null);
  };

  // Custom event styling
  const eventStyleGetter = (event: CalendarEvent) => {
    const style = {
      backgroundColor: event.category === 'Mindfulness' ? '#f3e8ff' :
                       event.category === 'Fitness' ? '#d1fae5' :
                       event.category === 'Work' ? '#dbeafe' :
                       event.category === 'Learning' ? '#fef3c7' :
                       event.category === 'Personal' ? '#fce7f3' : '#f9fafb',
      borderLeft: `4px solid ${
        event.category === 'Mindfulness' ? '#a78bfa' :
        event.category === 'Fitness' ? '#10b981' :
        event.category === 'Work' ? '#3b82f6' :
        event.category === 'Learning' ? '#f59e0b' :
        event.category === 'Personal' ? '#ec4899' : '#9ca3af'
      }`,
      color: '#374151',
      borderRadius: '4px',
      opacity: event.completed ? 0.6 : 1,
      paddingLeft: '4px'
    };
    
    return {
      style,
      className: `event-item ${event.completed ? 'completed' : ''}`
    };
  };
  
  // Map view strings between our app and react-big-calendar
  const mapViewToRBC = (view: CalendarView) => {
    switch (view) {
      case 'day': return Views.DAY;
      case 'week': return Views.WEEK;
      case 'month': return Views.MONTH;
      default: return Views.WEEK;
    }
  };
  
  return (
    <TooltipProvider>
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
                <PopoverContent className="w-auto p-0 z-50">
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
              <ToggleGroup 
                type="single" 
                value={view} 
                onValueChange={(value) => value && setView(value as CalendarView)}
              >
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
              
              <Button onClick={() => {
                setEditingEvent(null);
                setIsTimeBlockFormOpen(true);
              }}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Time Block
              </Button>
            </div>
          </div>
          
          {/* Energy Level Overlay positioned for time axis */}
          {(view === 'day' || view === 'week') && (
            <EnergyLevelOverlay 
              data={energyLevels}
              onUpdateEnergyLevel={handleUpdateEnergyLevel}
              view={view}
              className="mb-4"
            />
          )}
          
          {/* Main calendar content */}
          <div className="calendar-content bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-700">
            <BigCalendar
              localizer={localizer}
              events={showCompleted ? events : events.filter(event => !event.completed)}
              startAccessor="start"
              endAccessor="end"
              defaultView={mapViewToRBC(view)}
              view={mapViewToRBC(view)}
              onView={(newView) => {
                if (newView === Views.DAY) setView('day');
                else if (newView === Views.WEEK) setView('week');
                else if (newView === Views.MONTH) setView('month');
              }}
              onNavigate={date => setCurrentDate(date)}
              date={currentDate}
              onSelectEvent={handleSelectEvent}
              onSelectSlot={handleSelectSlot}
              selectable
              eventPropGetter={eventStyleGetter}
              dayPropGetter={(date) => {
                const today = new Date();
                return {
                  className: format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd') ? 'rbc-today' : ''
                };
              }}
              popup
              {...calendarStyles}
            />
          </div>
        </main>
        
        {/* Time Block Form Dialog */}
        <Dialog open={isTimeBlockFormOpen} onOpenChange={setIsTimeBlockFormOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingEvent?.id ? 'Edit Time Block' : 'Add Time Block'}</DialogTitle>
            </DialogHeader>
            <TimeBlockForm 
              initialData={editingEvent ? {
                title: editingEvent.title,
                description: editingEvent.description || '',
                date: editingEvent.start,
                startTime: format(editingEvent.start, 'HH:mm'),
                endTime: format(editingEvent.end, 'HH:mm'),
                category: editingEvent.category,
                completed: editingEvent.completed
              } : undefined}
              onSubmit={handleSaveTimeBlock}
              onCancel={() => setIsTimeBlockFormOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
};

export default CalendarPage;
