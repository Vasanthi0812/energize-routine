
import React, { useState } from 'react';
import { WarmupExercise, formatTime } from '@/utils/weeklyWorkoutData';
import { cn } from '@/lib/utils';
import { Flame, ChevronDown, ChevronUp, Check, Timer, Heart, Sparkles } from 'lucide-react';

interface WarmupSectionProps {
  warmupExercises: WarmupExercise[];
  onComplete: (exerciseId: string, completed: boolean) => void;
  completedExercises: Record<string, boolean>;
}

const WarmupSection: React.FC<WarmupSectionProps> = ({ 
  warmupExercises, 
  onComplete, 
  completedExercises 
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mb-8 rounded-xl overflow-hidden bg-white/80 shadow-md border border-[#FFEB3B]/20 backdrop-blur-sm animate-scale-in">
      <div 
        className="bg-gradient-to-r from-[#FFEB3B]/20 to-white p-4 flex items-center justify-between cursor-pointer"
        onClick={toggleExpanded}
      >
        <div className="flex items-center gap-3">
          <div className="bg-[#FFEB3B] p-2 rounded-full">
            <Flame className="h-5 w-5 text-[#1B5E20] animate-pulse-subtle" />
          </div>
          <h3 className="text-xl font-bold text-[#1B5E20]">Warm-up Session</h3>
        </div>
        <button className="text-[#1B5E20] focus:outline-none transition-transform duration-300">
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>
      
      {isExpanded && (
        <div className="p-4 divide-y divide-[#FFEB3B]/20 animate-fade-in">
          <p className="text-[#1B5E20]/80 mb-4 flex items-center gap-2">
            <Heart className="h-4 w-4 text-[#C62828] animate-pulse-subtle" />
            <span>Complete these exercises to prepare your body for the main workout.</span>
          </p>
          
          {warmupExercises.map((exercise, idx) => {
            const isCompleted = !!completedExercises[exercise.id];
            
            return (
              <div 
                key={exercise.id} 
                className={cn(
                  "py-4 flex flex-col md:flex-row md:items-center transition-all duration-300",
                  "animate-slide-in",
                  isCompleted ? "opacity-70" : "opacity-100"
                )}
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="flex-grow mb-2 md:mb-0">
                  <div className="flex items-start">
                    <div className="mr-3">
                      <div 
                        className={cn(
                          "h-6 w-6 rounded-full flex items-center justify-center border transition-colors",
                          isCompleted 
                            ? "bg-green-100 border-green-300" 
                            : "bg-[#FFEB3B]/10 border-[#FFEB3B]/30"
                        )}
                      >
                        {isCompleted ? 
                          <Check className="h-4 w-4 text-green-600" /> :
                          <Sparkles className="h-3 w-3 text-[#C62828] animate-pulse-subtle" />
                        }
                      </div>
                    </div>
                    <div>
                      <h4 className={cn(
                        "font-medium text-lg",
                        isCompleted ? "text-[#1B5E20]/60" : "text-[#1B5E20]"
                      )}>
                        {exercise.name}
                      </h4>
                      <p className="text-sm text-[#1B5E20]/70 mt-1">{exercise.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between md:w-48 md:pl-4">
                  <span className="bg-[#FFEB3B]/10 text-[#1B5E20] px-3 py-1 rounded-full text-sm flex items-center">
                    <Timer className="h-3 w-3 mr-1" />
                    {formatTime(exercise.duration)}
                  </span>
                  
                  <button
                    onClick={() => onComplete(exercise.id, !isCompleted)}
                    className={cn(
                      "ml-4 px-3 py-1 rounded-full text-sm transition-all duration-300",
                      "hover:shadow hover:scale-105",
                      isCompleted
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-[#C62828] text-white hover:bg-[#B71C1C]"
                    )}
                  >
                    {isCompleted ? "Completed" : "Mark Done"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WarmupSection;
