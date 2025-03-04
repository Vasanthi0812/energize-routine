
import React from 'react';
import { cn } from '@/lib/utils';
import { Difficulty } from '@/utils/workoutData';

interface DifficultySelectorProps {
  selectedDifficulty: Difficulty | null;
  onSelectDifficulty: (difficulty: Difficulty) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ 
  selectedDifficulty, 
  onSelectDifficulty 
}) => {
  const difficulties: { value: Difficulty; label: string; description: string }[] = [
    { 
      value: 'easy', 
      label: 'Easy', 
      description: 'Perfect for beginners or active recovery days'
    },
    { 
      value: 'medium', 
      label: 'Medium', 
      description: 'Moderate intensity for regular training days'
    },
    { 
      value: 'hard', 
      label: 'Hard', 
      description: 'Challenging workouts for pushing your limits'
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="text-center mb-8 animate-fade-in">
        <h2 className="text-lg font-medium text-primary mb-2">Step 1</h2>
        <h3 className="text-2xl font-semibold mb-4">Select Workout Difficulty</h3>
        <p className="text-muted-foreground">Choose your challenge level to generate a personalized workout</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {difficulties.map((difficulty) => (
          <button
            key={difficulty.value}
            onClick={() => onSelectDifficulty(difficulty.value)}
            className={cn(
              "flex flex-col items-center justify-center p-6 rounded-xl hover-lift card-transition",
              "border border-transparent hover:border-primary/20",
              selectedDifficulty === difficulty.value
                ? "bg-primary/10 border-primary/30 shadow-md"
                : "bg-card hover:bg-card/80 shadow-sm",
            )}
          >
            <div 
              className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all",
                selectedDifficulty === difficulty.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              )}
            >
              {difficulty.value === 'easy' && (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-feather"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" x2="2" y1="8" y2="22"/><line x1="17.5" x2="9" y1="15" y2="15"/></svg>
              )}
              {difficulty.value === 'medium' && (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-flame"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
              )}
              {difficulty.value === 'hard' && (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              )}
            </div>
            <h4 className="text-xl font-medium mb-2">{difficulty.label}</h4>
            <p className="text-sm text-center text-muted-foreground">{difficulty.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelector;
