
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import DifficultySelector from '@/components/DifficultySelector';
import DayNavigator from '@/components/DayNavigator';
import DayWorkout from '@/components/DayWorkout';
import WeekOverview from '@/components/WeekOverview';
import { 
  Difficulty, 
  WeeklyPlan, 
  generateWeeklyPlan, 
  saveWorkoutProgress, 
  getWorkoutProgress 
} from '@/utils/weeklyWorkoutData';

const WeeklyPlanner = () => {
  const { toast } = useToast();
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan | null>(null);
  const [currentDayIndex, setCurrentDayIndex] = useState<number>(0);
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({});

  // Load saved progress from localStorage when weekly plan changes
  useEffect(() => {
    if (weeklyPlan) {
      const savedProgress = getWorkoutProgress(weeklyPlan.id);
      setCompletedExercises(savedProgress);
    }
  }, [weeklyPlan]);

  const handleSelectDifficulty = (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);
    setWeeklyPlan(null);
    setCurrentDayIndex(0);
    setCompletedExercises({});
  };

  const handleGeneratePlan = () => {
    if (!selectedDifficulty) return;
    
    const newPlan = generateWeeklyPlan(selectedDifficulty);
    setWeeklyPlan(newPlan);
    setCurrentDayIndex(0);
    setCompletedExercises({});
    
    toast({
      title: "Workout Plan Generated",
      description: `Your ${selectedDifficulty} weekly plan is ready. Let's get started!`,
    });
  };

  const handleChangeDay = (newIndex: number) => {
    setCurrentDayIndex(newIndex);
  };

  const handleExerciseComplete = (exerciseId: string, completed: boolean) => {
    if (!weeklyPlan) return;
    
    const updatedProgress = { ...completedExercises };
    
    if (completed) {
      updatedProgress[exerciseId] = true;
    } else {
      delete updatedProgress[exerciseId];
    }
    
    setCompletedExercises(updatedProgress);
    saveWorkoutProgress(weeklyPlan.id, updatedProgress);
    
    toast({
      title: completed ? "Exercise Completed" : "Progress Updated",
      description: completed ? "Great job! Keep up the good work." : "Your progress has been updated.",
      variant: "default",
    });
  };

  const handleGenerateNewPlan = () => {
    setWeeklyPlan(null);
    setCurrentDayIndex(0);
    setCompletedExercises({});
  };

  return (
    <div className="min-h-screen bg-[#F1F8E9] px-4 py-10 md:py-20">
      <div className="container max-w-6xl mx-auto">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#1B5E20]">Weekly Workout Planner</h1>
          <p className="text-xl text-[#1B5E20]/80">Your personalized 7-day fitness journey</p>
        </header>

        {!weeklyPlan ? (
          <>
            <DifficultySelector 
              selectedDifficulty={selectedDifficulty} 
              onSelectDifficulty={handleSelectDifficulty} 
            />
            
            {selectedDifficulty && (
              <div className="mt-12 text-center animate-fade-in">
                <button
                  onClick={handleGeneratePlan}
                  className="bg-[#C62828] text-white px-8 py-4 rounded-full text-lg font-medium hover-lift hover:bg-[#B71C1C] shadow-md"
                >
                  Generate Weekly Plan
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="animate-scale-in">
            {/* Week Overview */}
            <WeekOverview 
              weeklyPlan={weeklyPlan}
              completedExercises={completedExercises}
              currentDayIndex={currentDayIndex}
              onSelectDay={handleChangeDay}
            />
            
            {/* Day Navigator */}
            <DayNavigator 
              days={weeklyPlan.days}
              currentDayIndex={currentDayIndex}
              onChangeDay={handleChangeDay}
            />
            
            {/* Current Day Workout */}
            <DayWorkout 
              dayPlan={weeklyPlan.days[currentDayIndex]}
              onExerciseComplete={handleExerciseComplete}
              completedExercises={completedExercises}
            />
            
            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-10">
              <button
                onClick={handleGeneratePlan}
                className="bg-[#C62828] text-white px-8 py-3 rounded-full text-lg font-medium hover-lift hover:bg-[#B71C1C] shadow-md w-full md:w-auto"
              >
                Regenerate Plan
              </button>
              
              <button
                onClick={handleGenerateNewPlan}
                className="bg-white text-[#1B5E20] border border-[#C62828]/20 px-8 py-3 rounded-full text-lg font-medium hover-lift hover:bg-white/80 shadow-sm w-full md:w-auto"
              >
                Change Difficulty
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeeklyPlanner;
