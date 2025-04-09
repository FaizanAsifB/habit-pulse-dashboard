
import React, { useState } from 'react';
import { format, startOfWeek, addDays, isSameDay, subWeeks, addWeeks } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WeekCalendarStripProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const WeekCalendarStrip: React.FC<WeekCalendarStripProps> = ({ selectedDate, onDateChange }) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  
  // Generate the days of the week
  const weekDays = Array.from({ length: 7 }).map((_, i) => {
    const date = addDays(currentWeekStart, i);
    const dayName = format(date, 'EEE');
    const dayNumber = format(date, 'd');
    const isToday = isSameDay(date, new Date());
    const isSelected = isSameDay(date, selectedDate);
    
    return { date, dayName, dayNumber, isToday, isSelected };
  });
  
  const goToPreviousWeek = () => {
    setCurrentWeekStart(prevWeekStart => {
      const newStart = subWeeks(prevWeekStart, 1);
      return newStart;
    });
  };
  
  const goToNextWeek = () => {
    setCurrentWeekStart(prevWeekStart => {
      const newStart = addWeeks(prevWeekStart, 1);
      return newStart;
    });
  };
  
  return (
    <div className="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-3 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {format(currentWeekStart, 'MMMM d')} - {format(addDays(currentWeekStart, 6), 'MMMM d, yyyy')}
        </h2>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={goToPreviousWeek}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={goToNextWeek}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex justify-between">
        {weekDays.map((day) => (
          <button
            key={day.date.toISOString()}
            onClick={() => onDateChange(day.date)}
            className={`day-button ${day.isSelected ? 'active' : ''} ${day.isToday && !day.isSelected ? 'today' : ''}`}
          >
            <span className="text-xs font-medium">{day.dayName}</span>
            <span className="text-sm font-semibold">{day.dayNumber}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WeekCalendarStrip;
