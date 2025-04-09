
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface CompletionTrendsProps {
  dateRange: 'week' | 'month' | 'quarter' | 'year';
}

type ChartView = 'timeOfDay' | 'dayOfWeek' | 'categories';

const CompletionTrendsChart: React.FC<CompletionTrendsProps> = ({ dateRange }) => {
  const [chartView, setChartView] = useState<ChartView>('timeOfDay');
  
  // Mock data for time of day
  const timeOfDayData = [
    { time: '5-8 AM', completions: 14, fill: '#E5DEFF' },
    { time: '8-11 AM', completions: 30, fill: '#D6BCFA' },
    { time: '11-2 PM', completions: 18, fill: '#9b87f5' },
    { time: '2-5 PM', completions: 25, fill: '#7E69AB' },
    { time: '5-8 PM', completions: 20, fill: '#6E59A5' },
    { time: '8-11 PM', completions: 10, fill: '#1A1F2C' },
  ];
  
  // Mock data for day of week
  const dayOfWeekData = [
    { day: 'Mon', completions: 15, fill: '#E5DEFF' },
    { day: 'Tue', completions: 18, fill: '#D6BCFA' },
    { day: 'Wed', completions: 25, fill: '#9b87f5' },
    { day: 'Thu', completions: 20, fill: '#7E69AB' },
    { day: 'Fri', completions: 16, fill: '#6E59A5' },
    { day: 'Sat', completions: 12, fill: '#9b87f5' },
    { day: 'Sun', completions: 10, fill: '#1A1F2C' },
  ];
  
  // Mock data for categories
  const categoriesData = [
    { category: 'Fitness', completions: 22, fill: '#60A5FA' },
    { category: 'Learning', completions: 18, fill: '#34D399' },
    { category: 'Mindfulness', completions: 24, fill: '#9b87f5' },
    { category: 'Health', completions: 16, fill: '#F87171' },
    { category: 'Work', completions: 12, fill: '#FBBF24' },
  ];
  
  const getChartData = () => {
    switch (chartView) {
      case 'timeOfDay':
        return {
          data: timeOfDayData,
          xKey: 'time',
          title: 'Completion by Time of Day',
          description: 'When you tend to complete your habits and tasks'
        };
      case 'dayOfWeek':
        return {
          data: dayOfWeekData,
          xKey: 'day',
          title: 'Completion by Day of Week',
          description: 'Your most productive days of the week'
        };
      case 'categories':
        return {
          data: categoriesData,
          xKey: 'category',
          title: 'Completion by Category',
          description: 'Which types of habits you complete most consistently'
        };
      default:
        return {
          data: timeOfDayData,
          xKey: 'time',
          title: 'Completion by Time of Day',
          description: 'When you tend to complete your habits and tasks'
        };
    }
  };
  
  const chartInfo = getChartData();
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{chartInfo.title}</CardTitle>
            <CardDescription>{chartInfo.description}</CardDescription>
          </div>
          <ToggleGroup 
            type="single" 
            value={chartView} 
            onValueChange={(value) => value && setChartView(value as ChartView)}
          >
            <ToggleGroupItem value="timeOfDay" aria-label="Time of Day">Time</ToggleGroupItem>
            <ToggleGroupItem value="dayOfWeek" aria-label="Day of Week">Day</ToggleGroupItem>
            <ToggleGroupItem value="categories" aria-label="Categories">Category</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartInfo.data} margin={{ top: 10, right: 10, left: 0, bottom: 30 }}>
              <XAxis dataKey={chartInfo.xKey} />
              <YAxis />
              <ChartTooltip />
              <Bar dataKey="completions" radius={[4, 4, 0, 0]}>
                {chartInfo.data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompletionTrendsChart;
