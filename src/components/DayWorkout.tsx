
import React from 'react';
import { DayPlan } from '@/utils/weeklyWorkoutData';
import { cn } from '@/lib/utils';
import { Dumbbell, Heart, Trophy, ZapOff, Medal, ThumbsUp } from 'lucide-react';
import WarmupSection from './WarmupSection';
import WorkoutExerciseCard from './WorkoutExerciseCard';

interface DayWorkoutProps {
  dayPlan: DayPlan;
  onExerciseComplete: (exerciseId: string, completed: boolean) => void;
  completedExercises: Record<string, boolean>;
}

const DayWorkout: React.FC<DayWorkoutProps> = ({
  dayPlan,
  onExerciseComplete,
  completedExercises,
}) => {
  const isRestDay = dayPlan.muscleGroup === 'Rest & Recovery';

  return (
    <div className="animate-fade-in">
      <div className="mb-8 text-center">
        <div className="inline-block bg-[#FFEB3B]/20 px-4 py-1 rounded-full text-[#1B5E20] font-medium mb-3">
          {dayPlan.day.toUpperCase()}
        </div>
        <h2 className="text-3xl font-bold mb-2 text-[#1B5E20] flex items-center justify-center gap-2">
          {isRestDay ? (
            <Heart className="h-6 w-6 text-[#C62828] animate-pulse-subtle" />
          ) : (
            <Trophy className="h-6 w-6 text-[#FFEB3B] animate-pulse-subtle" />
          )}
          {dayPlan.muscleGroup}
        </h2>
        <p className="text-[#1B5E20]/80 max-w-2xl mx-auto">{dayPlan.description}</p>
      </div>

      {/* Warmup Section */}
      <WarmupSection 
        warmupExercises={dayPlan.warmup} 
        onComplete={onExerciseComplete}
        completedExercises={completedExercises}
      />

      {/* Main Workout Section */}
      <div className="mb-8 animate-slide-in" style={{ animationDelay: '300ms' }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-[#C62828] p-2 rounded-full">
            {isRestDay ? (
              <ZapOff className="h-5 w-5 text-white" />
            ) : (
              <Dumbbell className="h-5 w-5 text-white animate-pulse-subtle" />
            )}
          </div>
          <h3 className="text-xl font-bold text-[#1B5E20]">Main Workout</h3>
        </div>

        {isRestDay ? (
          <div className="bg-white/80 rounded-xl p-8 shadow-md border border-[#FFEB3B]/20 text-center backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <ThumbsUp className="h-12 w-12 text-[#C62828] mx-auto mb-4 animate-pulse-subtle" />
            <h3 className="text-xl font-semibold text-[#1B5E20] mb-3">Rest Day</h3>
            <p className="text-[#1B5E20]/80 mb-6">
              Today is your rest day. Your body needs time to recover and grow stronger. 
              Consider light stretching, meditation, or simply relaxing.
            </p>
            <div className="bg-[#FFEB3B]/10 inline-block px-5 py-3 rounded-lg">
              <p className="text-[#1B5E20] font-medium flex items-center gap-2">
                <Medal className="h-4 w-4 text-[#C62828]" />
                "Recovery is when the magic happens."
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dayPlan.exercises.map((exercise, index) => (
              <WorkoutExerciseCard
                key={exercise.id}
                exercise={exercise}
                isCompleted={!!completedExercises[exercise.id]}
                onToggleComplete={(id) => onExerciseComplete(id, !completedExercises[id])}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DayWorkout;
