
import React from 'react';
import { WorkoutExercise } from '@/utils/weeklyWorkoutData';
import { cn } from '@/lib/utils';
import { Clock, Check } from 'lucide-react';

interface WorkoutExerciseCardProps {
  exercise: WorkoutExercise;
  isCompleted: boolean;
  onToggleComplete: (id: string) => void;
  index: number;
}

const WorkoutExerciseCard: React.FC<WorkoutExerciseCardProps> = ({
  exercise,
  isCompleted,
  onToggleComplete,
  index
}) => {
  return (
    <div 
      className={cn(
        "relative rounded-xl overflow-hidden bg-white/80 border shadow-sm transition-all duration-300",
        "hover:shadow-md animate-slide-in",
        isCompleted 
          ? "border-green-200 bg-green-50/50" 
          : "border-[#FFEB3B]/20"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {isCompleted && (
        <div className="absolute top-3 right-3 bg-green-100 rounded-full p-1">
          <Check className="h-4 w-4 text-green-600" />
        </div>
      )}
      
      <div className="p-5">
        <h3 className={cn(
          "text-xl font-bold mb-2",
          isCompleted ? "text-[#1B5E20]/70" : "text-[#1B5E20]"
        )}>
          {exercise.name}
        </h3>
        
        <p className="text-[#1B5E20]/80 text-sm mb-4">{exercise.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="bg-[#FFEB3B]/10 text-[#1B5E20] px-3 py-1 rounded-full text-sm">
            {exercise.sets} sets
          </div>
          <div className="bg-[#FFEB3B]/10 text-[#1B5E20] px-3 py-1 rounded-full text-sm">
            {exercise.reps} reps
          </div>
          <div className="flex items-center bg-[#FFEB3B]/10 text-[#1B5E20] px-3 py-1 rounded-full text-sm">
            <Clock className="h-3 w-3 mr-1" />
            <span>Rest: {exercise.restBetweenSets}s</span>
          </div>
        </div>
        
        <button
          onClick={() => onToggleComplete(exercise.id)}
          className={cn(
            "w-full py-2 px-4 rounded-md transition-colors text-center font-medium",
            isCompleted
              ? "bg-green-100 text-green-700 hover:bg-green-200"
              : "bg-[#C62828] text-white hover:bg-[#B71C1C]"
          )}
        >
          {isCompleted ? "Completed" : "Mark as Complete"}
        </button>
      </div>
    </div>
  );
};

export default WorkoutExerciseCard;
