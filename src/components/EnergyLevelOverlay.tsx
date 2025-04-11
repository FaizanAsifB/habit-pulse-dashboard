
import React, { useState, useEffect } from 'react';
import { Battery, BatteryCharging, BatteryFull, BatteryLow, BatteryMedium, BatteryWarning } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, addHours, startOfDay, parse } from 'date-fns';

interface EnergyLevelData {
  date: string; // ISO date string
  level: number; // 1-5 energy level
  hour?: number; // Optional hour of the day (0-23)
}

interface EnergyLevelOverlayProps {
  data: EnergyLevelData[];
  onUpdateEnergyLevel: (date: string, level: number, hour?: number) => void;
  className?: string;
  view: 'day' | 'week' | 'month';
}

const EnergyLevelOverlay: React.FC<EnergyLevelOverlayProps> = ({ 
  data, 
  onUpdateEnergyLevel, 
  className,
  view
}) => {
  const [activeDate, setActiveDate] = useState<string | null>(null);
  const [activeHour, setActiveHour] = useState<number | null>(null);
  const [hourlyEnergyLevels, setHourlyEnergyLevels] = useState<Record<string, number>>({});
  
  // Prepare hourly energy levels
  useEffect(() => {
    const hourlyMap: Record<string, number> = {};
    
    data.forEach(item => {
      if (item.hour !== undefined) {
        const key = `${item.date}-${item.hour}`;
        hourlyMap[key] = item.level;
      }
    });
    
    setHourlyEnergyLevels(hourlyMap);
  }, [data]);
  
  const getEnergyIcon = (level: number) => {
    switch (level) {
      case 1: return <BatteryLow className="h-4 w-4 text-red-500" />;
      case 2: return <BatteryWarning className="h-4 w-4 text-orange-500" />;
      case 3: return <Battery className="h-4 w-4 text-yellow-500" />;
      case 4: return <BatteryMedium className="h-4 w-4 text-green-500" />;
      case 5: return <BatteryFull className="h-4 w-4 text-brand-green" />;
      default: return <BatteryCharging className="h-4 w-4 text-brand-indigo" />;
    }
  };
  
  const getEnergyColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-red-100 dark:bg-red-900/20';
      case 2: return 'bg-orange-100 dark:bg-orange-900/20';
      case 3: return 'bg-yellow-100 dark:bg-yellow-900/20';
      case 4: return 'bg-green-100 dark:bg-green-900/20';
      case 5: return 'bg-brand-green/10 dark:bg-brand-green/20';
      default: return 'bg-transparent';
    }
  };
  
  const handleEnergyClick = (date: string, hour?: number) => {
    setActiveDate(date);
    setActiveHour(hour ?? null);
  };
  
  const handleSelectLevel = (date: string, level: number, hour?: number) => {
    onUpdateEnergyLevel(date, level, hour);
    setActiveDate(null);
    setActiveHour(null);
  };
  
  // Render time-axis energy levels for day/week view
  const renderTimeAxisEnergyLevels = () => {
    // Generate hours from 0 to 23
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const today = format(new Date(), 'yyyy-MM-dd');
    
    return (
      <div className="time-axis-energy-levels">
        {hours.map(hour => {
          const timeKey = `${today}-${hour}`;
          const level = hourlyEnergyLevels[timeKey] || 0;
          
          return (
            <div key={hour} className="energy-hour-marker" style={{ top: `calc(${hour * (100/24)}% + 22px)` }}>
              <Popover>
                <PopoverTrigger asChild>
                  <button 
                    className={cn(
                      "energy-indicator w-6 h-6 rounded-full flex items-center justify-center",
                      level > 0 ? getEnergyColor(level) : "bg-gray-100 dark:bg-gray-800"
                    )}
                    aria-label={`Set energy level for ${hour}:00`}
                  >
                    {level > 0 ? getEnergyIcon(level) : null}
                  </button>
                </PopoverTrigger>
                <PopoverContent 
                  className="p-0 w-auto bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700"
                  sideOffset={5}
                  align="center"
                  style={{ zIndex: 100 }}
                >
                  <div className="p-2">
                    <div className="text-xs font-medium mb-2">{`Energy at ${hour}:00`}</div>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map(energyLevel => (
                        <button
                          key={energyLevel}
                          onClick={() => handleSelectLevel(today, energyLevel, hour)}
                          className={cn(
                            "p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
                            level === energyLevel ? "bg-gray-200 dark:bg-gray-600" : ""
                          )}
                        >
                          {getEnergyIcon(energyLevel)}
                        </button>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          );
        })}
      </div>
    );
  };
  
  // Only display for day or week views
  if (view !== 'day' && view !== 'week') {
    return null;
  }
  
  return (
    <div className={cn("energy-level-overlay relative", className)} style={{ zIndex: 40 }}>
      {/* Day view for integrated time-axis energy levels */}
      {view === 'day' && renderTimeAxisEnergyLevels()}
      
      {/* Week view top bar remains */}
      {view === 'week' && (
        <div className="energy-week-view flex justify-between mb-2 px-[100px]">
          {data.filter(item => !item.hour).map(item => (
            <div 
              key={item.date}
              className={`energy-indicator relative flex-1 mx-px h-2 rounded-full ${getEnergyColor(item.level)}`}
            >
              <Popover>
                <PopoverTrigger asChild>
                  <button 
                    className="absolute inset-0 w-full h-full cursor-pointer"
                    aria-label={`Set energy level for ${item.date}`}
                  />
                </PopoverTrigger>
                <PopoverContent 
                  className="p-0 w-auto bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700"
                  sideOffset={5}
                  align="center"
                  style={{ zIndex: 100 }}
                >
                  <div className="flex space-x-1 p-2">
                    {[1, 2, 3, 4, 5].map(level => (
                      <button
                        key={level}
                        onClick={() => handleSelectLevel(item.date, level)}
                        className={cn(
                          "p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
                          item.level === level ? "bg-gray-200 dark:bg-gray-600" : ""
                        )}
                      >
                        {getEnergyIcon(level)}
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          ))}
        </div>
      )}
      
      {/* In week view, also render the time axis markers */}
      {view === 'week' && renderTimeAxisEnergyLevels()}
    </div>
  );
};

export default EnergyLevelOverlay;
