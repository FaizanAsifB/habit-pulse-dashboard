
import React from 'react';
import { Lightbulb } from 'lucide-react';

interface MotivationalInsightProps {
  message: string;
  title?: string;
}

const MotivationalInsight: React.FC<MotivationalInsightProps> = ({ 
  message, 
  title = "Daily Insight" 
}) => {
  return (
    <div className="bg-habit-accent text-habit-secondary rounded-xl p-5 border border-habit-primary/10 mb-6">
      <div className="flex items-center space-x-3">
        <div className="h-8 w-8 rounded-full bg-habit-primary/20 flex items-center justify-center">
          <Lightbulb className="h-4 w-4 text-habit-primary" />
        </div>
        <div>
          <h3 className="font-medium text-habit-primary">{title}</h3>
          <p className="text-sm mt-1">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default MotivationalInsight;
