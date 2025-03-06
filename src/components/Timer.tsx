
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { formatTime } from '@/utils/workoutData';
import { Play, Pause, Clock, RefreshCcw } from 'lucide-react';

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
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
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
      // Start animation
      setIsAnimating(true);
      
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setIsCompleted(true);
            setIsAnimating(false);
            onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      // Pause animation
      setIsAnimating(false);
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
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

  // Handle reset timer
  const handleResetTimer = () => {
    setTimeLeft(duration);
    setIsCompleted(false);
    if (!isPaused) {
      onTogglePause(); // Pause the timer first
    }
  };
  
  return (
    <div className="relative w-full max-w-xs mx-auto">
      <div className="flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center w-48 h-48 mb-4">
          {/* Background circle */}
          <div className="absolute inset-0 rounded-full bg-secondary"></div>
          
          {/* Animated countdown indicator */}
          <div className={cn(
            "absolute top-0 left-0 flex items-center justify-center w-full h-full",
            isAnimating && !isCompleted ? "animate-pulse-subtle" : ""
          )}>
            <Clock className={cn(
              "absolute h-8 w-8 text-muted-foreground opacity-20",
              isAnimating && !isCompleted ? "animate-spin-slow" : ""
            )} />
          </div>
          
          {/* Progress circle with stroke dasharray animation */}
          <svg className="absolute inset-0 transform -rotate-90" width="100%" height="100%" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              className={cn(
                "text-muted transition-all duration-1000", 
                getColor(),
                isAnimating && !isCompleted ? "animate-pulse-subtle" : ""
              )}
              strokeDasharray="283"
              strokeDashoffset={283 - (283 * progress / 100)}
              strokeLinecap="round"
            />
          </svg>
          
          {/* Timer text */}
          <div className="z-10 flex flex-col items-center">
            <span className={cn(
              "text-4xl font-bold tracking-tighter",
              timeLeft <= 3 && !isRest && !isCompleted ? "text-red-600 animate-pulse" : ""
            )}>
              {formatTime(timeLeft)}
            </span>
            <span className={cn(
              "text-sm font-medium uppercase mt-1",
              isRest ? "text-blue-600" : "text-muted-foreground"
            )}>
              {isRest ? 'REST' : 'WORK'}
            </span>
          </div>
        </div>
        
        {/* Control buttons */}
        <div className="flex items-center gap-3">
          {/* Reset button */}
          <button
            onClick={handleResetTimer}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            aria-label="Reset timer"
          >
            <RefreshCcw className="h-4 w-4" />
          </button>
          
          {/* Pause/Play button */}
          <button
            onClick={onTogglePause}
            className={cn(
              "flex items-center justify-center w-12 h-12 rounded-full text-primary-foreground transition-all duration-300 hover:scale-105",
              isPaused ? "bg-green-600 hover:bg-green-700" : "bg-primary hover:bg-primary/90"
            )}
            aria-label={isPaused ? "Play timer" : "Pause timer"}
          >
            {isPaused ? (
              <Play className="h-5 w-5" />
            ) : (
              <Pause className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;

