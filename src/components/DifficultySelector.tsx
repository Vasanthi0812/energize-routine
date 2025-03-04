
import React from 'react';
import { cn } from '@/lib/utils';
import { Difficulty } from '@/utils/weeklyWorkoutData';
import { Feather, Flame, Zap } from 'lucide-react';

interface DifficultySelectorProps {
  selectedDifficulty: Difficulty | null;
  onSelectDifficulty: (difficulty: Difficulty) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ 
  selectedDifficulty, 
  onSelectDifficulty 
}) => {
  const difficulties: { value: Difficulty; label: string; description: string; icon: React.ElementType }[] = [
    { 
      value: 'easy', 
      label: 'Easy', 
      description: 'Perfect for beginners or active recovery weeks',
      icon: Feather
    },
    { 
      value: 'medium', 
      label: 'Medium', 
      description: 'Moderate intensity for regular training',
      icon: Flame
    },
    { 
      value: 'hard', 
      label: 'Hard', 
      description: 'Challenging workouts for pushing your limits',
      icon: Zap
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="text-center mb-8 animate-fade-in">
        <h2 className="text-lg font-medium text-[#C62828] mb-2">Step 1</h2>
        <h3 className="text-2xl font-semibold mb-4 text-[#1B5E20]">Select Workout Difficulty</h3>
        <p className="text-[#1B5E20]/80">Choose your challenge level to generate a personalized weekly plan</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {difficulties.map((difficulty) => (
          <button
            key={difficulty.value}
            onClick={() => onSelectDifficulty(difficulty.value)}
            className={cn(
              "flex flex-col items-center justify-center p-6 rounded-xl hover-lift card-transition",
              "border border-transparent hover:border-[#C62828]/20",
              selectedDifficulty === difficulty.value
                ? "bg-[#C62828]/10 border-[#C62828]/30 shadow-md"
                : "bg-white/80 hover:bg-white shadow-sm backdrop-blur-sm",
            )}
          >
            <div 
              className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all",
                selectedDifficulty === difficulty.value
                  ? "bg-[#C62828] text-white"
                  : "bg-[#FFEB3B]/20 text-[#1B5E20]"
              )}
            >
              <difficulty.icon size={24} />
            </div>
            <h4 className="text-xl font-medium mb-2 text-[#1B5E20]">{difficulty.label}</h4>
            <p className="text-sm text-center text-[#1B5E20]/80">{difficulty.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelector;
