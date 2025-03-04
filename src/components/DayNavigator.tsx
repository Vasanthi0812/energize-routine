
import React from 'react';
import { cn } from '@/lib/utils';
import { DayPlan } from '@/utils/weeklyWorkoutData';
import { ChevronLeft, ChevronRight, Calendar, Dumbbell } from 'lucide-react';

interface DayNavigatorProps {
  days: DayPlan[];
  currentDayIndex: number;
  onChangeDay: (index: number) => void;
}

const DayNavigator: React.FC<DayNavigatorProps> = ({
  days,
  currentDayIndex,
  onChangeDay,
}) => {
  const handlePrevious = () => {
    if (currentDayIndex > 0) {
      onChangeDay(currentDayIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentDayIndex < days.length - 1) {
      onChangeDay(currentDayIndex + 1);
    }
  };

  return (
    <div className="w-full flex items-center justify-between mb-8 animate-fade-in">
      <button
        onClick={handlePrevious}
        disabled={currentDayIndex === 0}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:-translate-y-1",
          currentDayIndex === 0
            ? "opacity-50 cursor-not-allowed bg-muted text-muted-foreground"
            : "bg-[#C62828] text-white hover:bg-[#B71C1C] hover:shadow-md"
        )}
      >
        <ChevronLeft size={18} className="animate-pulse-subtle" />
        <span>Previous</span>
      </button>

      <div className="flex items-center gap-2">
        <Calendar size={20} className="text-[#1B5E20] animate-pulse-subtle" />
        <div className="flex space-x-2">
          {days.map((day, index) => (
            <button
              key={day.day}
              onClick={() => onChangeDay(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                currentDayIndex === index
                  ? "bg-[#C62828] scale-125 animate-pulse-subtle"
                  : index < currentDayIndex
                    ? "bg-[#FFEB3B]" 
                    : "bg-muted"
              )}
              aria-label={`Go to ${day.day}`}
            />
          ))}
        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={currentDayIndex === days.length - 1}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:-translate-y-1",
          currentDayIndex === days.length - 1
            ? "opacity-50 cursor-not-allowed bg-muted text-muted-foreground"
            : "bg-[#C62828] text-white hover:bg-[#B71C1C] hover:shadow-md"
        )}
      >
        <span>Next</span>
        <ChevronRight size={18} className="animate-pulse-subtle" />
      </button>
    </div>
  );
};

export default DayNavigator;
