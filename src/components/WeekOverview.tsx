
import React from 'react';
import { WeeklyPlan } from '@/utils/weeklyWorkoutData';
import { cn } from '@/lib/utils';
import { Calendar, CheckCircle } from 'lucide-react';

interface WeekOverviewProps {
  weeklyPlan: WeeklyPlan;
  completedExercises: Record<string, boolean>;
  currentDayIndex: number;
  onSelectDay: (index: number) => void;
}

const WeekOverview: React.FC<WeekOverviewProps> = ({
  weeklyPlan,
  completedExercises,
  currentDayIndex,
  onSelectDay,
}) => {
  const calculateDayProgress = (dayIndex: number) => {
    const day = weeklyPlan.days[dayIndex];
    const totalExercises = day.warmup.length + day.exercises.length;
    
    if (totalExercises === 0) return 0;
    
    let completedCount = 0;
    
    day.warmup.forEach(ex => {
      if (completedExercises[ex.id]) completedCount++;
    });
    
    day.exercises.forEach(ex => {
      if (completedExercises[ex.id]) completedCount++;
    });
    
    return (completedCount / totalExercises) * 100;
  };

  return (
    <div className="mb-10 overflow-hidden">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-[#FFEB3B] p-2 rounded-full">
          <Calendar className="h-5 w-5 text-[#1B5E20]" />
        </div>
        <h3 className="text-xl font-bold text-[#1B5E20]">Weekly Overview</h3>
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {weeklyPlan.days.map((day, index) => {
          const progress = calculateDayProgress(index);
          const isComplete = progress === 100;
          const isCurrent = index === currentDayIndex;
          
          return (
            <button
              key={day.day}
              onClick={() => onSelectDay(index)}
              className={cn(
                "flex flex-col items-center p-3 rounded-lg transition-all",
                "border hover:shadow-md",
                isCurrent 
                  ? "border-[#C62828] bg-[#C62828]/5" 
                  : isComplete
                    ? "border-green-300 bg-green-50"
                    : "border-[#FFEB3B]/20 bg-white/80",
              )}
            >
              <span className={cn(
                "text-sm font-medium mb-1",
                isCurrent ? "text-[#C62828]" : "text-[#1B5E20]"
              )}>
                {day.day.substring(0, 3)}
              </span>
              
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-1">
                {isComplete ? (
                  <CheckCircle className="h-8 w-8 text-green-500" />
                ) : (
                  <div className="relative w-8 h-8">
                    <div className="absolute inset-0 rounded-full border-2 border-[#FFEB3B]/30"></div>
                    <svg viewBox="0 0 32 32" className="w-8 h-8 transform -rotate-90">
                      <circle
                        cx="16"
                        cy="16"
                        r="14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        className={cn(
                          "text-[#FFEB3B]",
                          isCurrent && "text-[#C62828]"
                        )}
                        strokeDasharray="87.96"
                        strokeDashoffset={87.96 - (87.96 * progress / 100)}
                      />
                    </svg>
                  </div>
                )}
              </div>
              
              <span className="text-xs text-[#1B5E20]/70 text-center truncate max-w-full">
                {day.muscleGroup}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default WeekOverview;
