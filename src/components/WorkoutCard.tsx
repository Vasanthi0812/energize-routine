
import React, { useState } from 'react';
import { Exercise } from '@/utils/workoutData';
import { cn } from '@/lib/utils';

interface WorkoutCardProps {
  exercise: Exercise;
  isActive: boolean;
  isCompleted: boolean;
  index: number;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ 
  exercise, 
  isActive, 
  isCompleted,
  index
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row items-center p-6 rounded-xl transition-all duration-300 transform",
        "border hover:border-primary/30 animate-slide-in",
        isActive
          ? "bg-white shadow-md border-primary/30 scale-[1.02]"
          : isCompleted
            ? "bg-secondary/50 border-muted opacity-75"
            : "bg-card border-transparent",
        isHovered && !isCompleted && "shadow-lg"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
        <div className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold",
          isActive
            ? "bg-primary text-primary-foreground"
            : isCompleted
              ? "bg-green-100 text-green-700"
              : "bg-secondary text-secondary-foreground"
        )}>
          {isCompleted ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
          ) : (
            index + 1
          )}
        </div>
      </div>
      
      <div className="flex-grow text-center md:text-left">
        <h3 className={cn(
          "text-xl font-medium mb-1",
          isCompleted && "text-muted-foreground"
        )}>
          {exercise.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-2">
          {exercise.duration} seconds
        </p>
        <p className={cn(
          "text-sm",
          isCompleted ? "text-muted-foreground" : "text-foreground/80"
        )}>
          {exercise.description}
        </p>
      </div>
      
      <div className={cn(
        "flex-shrink-0 ml-0 md:ml-4 mt-4 md:mt-0 transform transition-transform duration-300",
        isActive && "scale-110"
      )}>
        {isActive ? (
          <div className="bg-primary/10 text-primary font-medium px-3 py-1 rounded-full text-sm">
            Current
          </div>
        ) : isCompleted ? (
          <div className="bg-green-100 text-green-700 font-medium px-3 py-1 rounded-full text-sm">
            Completed
          </div>
        ) : (
          <div className="bg-muted text-muted-foreground font-medium px-3 py-1 rounded-full text-sm">
            Upcoming
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutCard;
