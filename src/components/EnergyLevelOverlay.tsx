
import React, { useState } from 'react';
import { Battery, BatteryCharging, BatteryFull, BatteryLow, BatteryMedium, BatteryWarning } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface EnergyLevelData {
  date: string; // ISO date string
  level: number; // 1-5 energy level
}

interface EnergyLevelOverlayProps {
  data: EnergyLevelData[];
  onUpdateEnergyLevel: (date: string, level: number) => void;
  className?: string;
  view: 'day' | 'week';
}

const EnergyLevelOverlay: React.FC<EnergyLevelOverlayProps> = ({ 
  data, 
  onUpdateEnergyLevel, 
  className,
  view
}) => {
  const [activeDate, setActiveDate] = useState<string | null>(null);
  
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
  
  const handleEnergyClick = (date: string) => {
    setActiveDate(date === activeDate ? null : date);
  };
  
  const handleSelectLevel = (date: string, level: number) => {
    onUpdateEnergyLevel(date, level);
    setActiveDate(null);
  };
  
  // Only display for day or week views
  if (view !== 'day' && view !== 'week') {
    return null;
  }
  
  return (
    <div className={cn("energy-level-overlay relative", className)} style={{ zIndex: 40 }}>
      {view === 'day' && (
        <div className="energy-day-view mb-2 p-2 rounded-md">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Energy Level</h3>
            {activeDate ? (
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map(level => (
                  <button
                    key={level}
                    onClick={() => handleSelectLevel(activeDate, level)}
                    className={`p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      data.find(d => d.date === activeDate)?.level === level 
                        ? 'bg-gray-200 dark:bg-gray-600' 
                        : ''
                    }`}
                  >
                    {getEnergyIcon(level)}
                  </button>
                ))}
              </div>
            ) : (
              <button 
                onClick={() => handleEnergyClick(new Date().toISOString().split('T')[0])}
                className="text-xs px-2 py-1 bg-brand-indigo/10 text-brand-indigo rounded-md hover:bg-brand-indigo/20"
              >
                Set Energy
              </button>
            )}
          </div>
        </div>
      )}
      
      {view === 'week' && (
        <div className="energy-week-view flex justify-between mb-2 px-[100px]">
          {data.map(item => (
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
                        className={`p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${
                          item.level === level ? 'bg-gray-200 dark:bg-gray-600' : ''
                        }`}
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
    </div>
  );
};

export default EnergyLevelOverlay;
