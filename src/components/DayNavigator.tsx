
import React from 'react';
import { cn } from '@/lib/utils';
import { DayPlan } from '@/utils/weeklyWorkoutData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
    <div className="w-full flex items-center justify-between mb-8">
      <button
        onClick={handlePrevious}
        disabled={currentDayIndex === 0}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full transition-all",
          currentDayIndex === 0
            ? "opacity-50 cursor-not-allowed bg-muted text-muted-foreground"
            : "bg-[#C62828] text-white hover:bg-[#B71C1C]"
        )}
      >
        <ChevronLeft size={18} />
        <span>Previous</span>
      </button>

      <div className="flex space-x-1">
        {days.map((day, index) => (
          <button
            key={day.day}
            onClick={() => onChangeDay(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all",
              currentDayIndex === index
                ? "bg-[#C62828] scale-125"
                : index < currentDayIndex
                  ? "bg-[#FFEB3B]" 
                  : "bg-muted"
            )}
            aria-label={`Go to ${day.day}`}
          />
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={currentDayIndex === days.length - 1}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full transition-all",
          currentDayIndex === days.length - 1
            ? "opacity-50 cursor-not-allowed bg-muted text-muted-foreground"
            : "bg-[#C62828] text-white hover:bg-[#B71C1C]"
        )}
      >
        <span>Next</span>
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default DayNavigator;
