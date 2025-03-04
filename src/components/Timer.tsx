
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { formatTime } from '@/utils/workoutData';

interface TimerProps {
  duration: number;
  isRest?: boolean;
  onComplete: () => void;
  isPaused: boolean;
  onTogglePause: () => void;
}

const Timer: React.FC<TimerProps> = ({ 
  duration, 
  isRest = false, 
  onComplete, 
  isPaused,
  onTogglePause
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(duration);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);
  
  // Calculate the progress percentage
  const progress = (timeLeft / duration) * 100;
  
  useEffect(() => {
    // Reset timer when duration changes
    setTimeLeft(duration);
    setIsCompleted(false);
  }, [duration]);
  
  useEffect(() => {
    if (!isPaused && !isCompleted) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setIsCompleted(true);
            onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, isCompleted, onComplete]);
  
  // Determine color based on type and time left
  const getColor = () => {
    if (isRest) return 'bg-blue-500';
    
    // For workout timers, change color as time gets lower
    if (progress > 66) return 'bg-green-500';
    if (progress > 33) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  return (
    <div className="relative w-full max-w-xs mx-auto">
      <div className="flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center w-48 h-48 mb-4">
          {/* Background circle */}
          <div className="absolute inset-0 rounded-full bg-secondary"></div>
          
          {/* Progress circle with stroke dasharray animation */}
          <svg className="absolute inset-0 transform -rotate-90" width="100%" height="100%" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              className={cn("text-muted transition-all duration-1000", getColor())}
              strokeDasharray="283"
              strokeDashoffset={283 - (283 * progress / 100)}
              strokeLinecap="round"
            />
          </svg>
          
          {/* Timer text */}
          <div className="z-10 flex flex-col items-center">
            <span className="text-4xl font-bold tracking-tighter">{formatTime(timeLeft)}</span>
            <span className="text-sm font-medium uppercase mt-1 text-muted-foreground">
              {isRest ? 'REST' : 'WORK'}
            </span>
          </div>
        </div>
        
        {/* Pause/Play button */}
        <button
          onClick={onTogglePause}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          {isPaused ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pause"><rect width="4" height="16" x="6" y="4"/><rect width="4" height="16" x="14" y="4"/></svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default Timer;
