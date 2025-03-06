
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import DifficultySelector from '@/components/DifficultySelector';
import WorkoutCard from '@/components/WorkoutCard';
import Timer from '@/components/Timer';
import { generateWorkout, Difficulty, Workout, formatTime } from '@/utils/workoutData';

const Index = () => {
  const { toast } = useToast();
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(-1);
  const [isResting, setIsResting] = useState<boolean>(false);
  const [isWorkoutComplete, setIsWorkoutComplete] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [totalWorkoutTime, setTotalWorkoutTime] = useState<number>(0);

  // Effect to calculate total workout time
  useEffect(() => {
    if (workout) {
      let total = 0;
      // Add all exercise durations
      workout.exercises.forEach(exercise => {
        total += exercise.duration;
      });
      // Add rest periods (number of exercises - 1) * rest time
      total += (workout.exercises.length - 1) * workout.restBetweenExercises;
      setTotalWorkoutTime(total);
    }
  }, [workout]);

  const handleSelectDifficulty = (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);
    setWorkout(null);
    setCurrentExerciseIndex(-1);
    setIsResting(false);
    setIsWorkoutComplete(false);
  };

  const handleGenerateWorkout = () => {
    if (!selectedDifficulty) return;
    
    const newWorkout = generateWorkout(selectedDifficulty);
    setWorkout(newWorkout);
    setCurrentExerciseIndex(-1);
    setIsResting(false);
    setIsWorkoutComplete(false);
    
    toast({
      title: "Workout Generated",
      description: `Your ${selectedDifficulty} workout is ready. Let's get started!`,
    });
  };

  const handleStartWorkout = () => {
    setCurrentExerciseIndex(0);
    setIsPaused(false);
  };

  const handleExerciseComplete = () => {
    if (!workout) return;
    
    const nextIndex = currentExerciseIndex + 1;
    
    // If there are more exercises, set up rest period
    if (nextIndex < workout.exercises.length) {
      setIsResting(true);
    } else {
      // All exercises completed
      setIsWorkoutComplete(true);
      toast({
        title: "Workout Complete!",
        description: "Great job! You've finished your workout.",
      });
    }
  };

  const handleRestComplete = () => {
    setIsResting(false);
    setCurrentExerciseIndex(prev => prev + 1);
  };

  const handleTogglePause = () => {
    setIsPaused(prev => !prev);
  };

  const handleGenerateNewWorkout = () => {
    setWorkout(null);
    setCurrentExerciseIndex(-1);
    setIsResting(false);
    setIsWorkoutComplete(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 px-4 py-10 md:py-16 pb-20">
      <div className="container max-w-5xl mx-auto">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Fitness Flow</h1>
          <p className="text-xl text-muted-foreground">Discover your perfect workout routine</p>
        </header>

        {!workout ? (
          <>
            <DifficultySelector 
              selectedDifficulty={selectedDifficulty} 
              onSelectDifficulty={handleSelectDifficulty} 
            />
            
            {selectedDifficulty && (
              <div className="mt-12 text-center animate-fade-in">
                <button
                  onClick={handleGenerateWorkout}
                  className="bg-primary text-white px-8 py-4 rounded-full text-lg font-medium hover-lift hover:bg-primary/90"
                >
                  Generate Workout
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="animate-scale-in">
            {/* Workout header */}
            <div className="text-center mb-8">
              <div className="inline-block bg-primary/10 text-primary font-medium px-4 py-1 rounded-full text-sm mb-3">
                {selectedDifficulty?.toUpperCase()} WORKOUT
              </div>
              <h2 className="text-3xl font-semibold mb-2">Your Personalized Circuit</h2>
              <p className="text-muted-foreground">
                {workout.exercises.length} exercises · {formatTime(totalWorkoutTime)} total time
              </p>
            </div>
            
            {/* Timer section (visible during workout) */}
            {currentExerciseIndex >= 0 && !isWorkoutComplete && (
              <div className="mb-10">
                <div className="glass-effect max-w-md mx-auto rounded-2xl p-6 text-center">
                  {isResting ? (
                    <>
                      <h3 className="text-xl font-medium mb-4">Rest Time</h3>
                      <Timer 
                        duration={workout.restBetweenExercises} 
                        isRest={true}
                        onComplete={handleRestComplete}
                        isPaused={isPaused}
                        onTogglePause={handleTogglePause}
                      />
                      <p className="mt-4 text-muted-foreground">
                        Next: {workout.exercises[currentExerciseIndex + 1].name}
                      </p>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-medium mb-4">
                        {workout.exercises[currentExerciseIndex].name}
                      </h3>
                      <Timer 
                        duration={workout.exercises[currentExerciseIndex].duration}
                        onComplete={handleExerciseComplete}
                        isPaused={isPaused}
                        onTogglePause={handleTogglePause}
                      />
                    </>
                  )}
                </div>
              </div>
            )}
            
            {/* Exercise list */}
            <div className="space-y-4 mb-8">
              {workout.exercises.map((exercise, index) => (
                <WorkoutCard
                  key={exercise.id}
                  exercise={exercise}
                  isActive={currentExerciseIndex === index && !isResting}
                  isCompleted={currentExerciseIndex > index || isWorkoutComplete}
                  index={index}
                />
              ))}
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-10">
              {currentExerciseIndex === -1 && !isWorkoutComplete && (
                <button
                  onClick={handleStartWorkout}
                  className="bg-primary text-white px-8 py-3 rounded-full text-lg font-medium hover-lift hover:bg-primary/90 w-full md:w-auto"
                >
                  Start Workout
                </button>
              )}
              
              {isWorkoutComplete && (
                <button
                  onClick={handleGenerateNewWorkout}
                  className="bg-primary text-white px-8 py-3 rounded-full text-lg font-medium hover-lift hover:bg-primary/90 w-full md:w-auto"
                >
                  Generate New Workout
                </button>
              )}
              
              <button
                onClick={handleGenerateWorkout}
                className="bg-secondary text-foreground border border-primary/20 px-8 py-3 rounded-full text-lg font-medium hover-lift hover:bg-secondary/80 w-full md:w-auto"
              >
                Shuffle Exercises
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
