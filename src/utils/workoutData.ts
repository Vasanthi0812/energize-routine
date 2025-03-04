export interface Exercise {
  id: string;
  name: string;
  description: string;
  duration: number; // in seconds
  imageUrl?: string;
}

export interface Workout {
  id: string;
  difficulty: 'easy' | 'medium' | 'hard';
  exercises: Exercise[];
  restBetweenExercises: number; // in seconds
}

export type Difficulty = 'easy' | 'medium' | 'hard';

// Exercise database
const exercises: Exercise[] = [
  // Easy exercises
  {
    id: 'e1',
    name: 'Jumping Jacks',
    description: 'Stand with your feet together and arms at your sides, then jump to a position with legs spread and arms overhead.',
    duration: 30,
  },
  {
    id: 'e2',
    name: 'Wall Sit',
    description: 'Lean against a wall with your feet shoulder-width apart, and slide down until your thighs are parallel to the ground.',
    duration: 20,
  },
  {
    id: 'e3',
    name: 'Push-ups (Modified)',
    description: 'Perform push-ups with knees on the ground for a modified version that\'s easier on your upper body.',
    duration: 30,
  },
  {
    id: 'e4',
    name: 'Crunches',
    description: 'Lie on your back with knees bent, and lift your shoulders toward your pelvis to engage your core.',
    duration: 30,
  },
  {
    id: 'e5',
    name: 'Chair Step-Ups',
    description: 'Step up onto a sturdy chair or bench with one foot, then the other, and step back down.',
    duration: 30,
  },
  {
    id: 'e6',
    name: 'Stationary Lunges',
    description: 'Take a step forward with one leg and lower your hips until both knees are bent at 90-degree angles.',
    duration: 30,
  },
  {
    id: 'e7',
    name: 'Triceps Dips on Chair',
    description: 'Using a chair, position your hands on the edge and dip your body down by bending your elbows.',
    duration: 30,
  },
  {
    id: 'e8',
    name: 'Plank (Knee)',
    description: 'Hold a plank position with knees on the ground to develop core strength.',
    duration: 20,
  },
  
  // Medium exercises
  {
    id: 'm1',
    name: 'Mountain Climbers',
    description: 'Start in a plank position and bring one knee to your chest, then alternate quickly with the other leg.',
    duration: 40,
  },
  {
    id: 'm2',
    name: 'Push-ups',
    description: 'Lower your body until your chest nearly touches the floor, keeping your body straight, then push back up.',
    duration: 30,
  },
  {
    id: 'm3',
    name: 'Burpees',
    description: 'Begin in a standing position, move into a squat position with hands on the ground, kick feet back into a plank position, return to squat position, and jump up from squat position.',
    duration: 40,
  },
  {
    id: 'm4',
    name: 'High Knees',
    description: 'Run in place, lifting your knees as high as possible with each step.',
    duration: 40,
  },
  {
    id: 'm5',
    name: 'Regular Plank',
    description: 'Hold a push-up position with your body in a straight line from head to heels.',
    duration: 45,
  },
  {
    id: 'm6',
    name: 'Side Planks',
    description: 'Lie on your side with legs extended, prop yourself up on your forearm, and hold your body in a diagonal line.',
    duration: 30,
  },
  {
    id: 'm7',
    name: 'Russian Twists',
    description: 'Sit on the floor with knees bent, lean back slightly, and twist your torso from side to side.',
    duration: 40,
  },
  {
    id: 'm8',
    name: 'Jump Squats',
    description: 'Perform a regular squat, but explosively jump up when returning to the standing position.',
    duration: 40,
  },
  
  // Hard exercises
  {
    id: 'h1',
    name: 'Burpee Push-ups',
    description: 'Perform a burpee with a push-up when in the plank position for added intensity.',
    duration: 45,
  },
  {
    id: 'h2',
    name: 'Plank to Push-up',
    description: 'Start in a forearm plank, then push up to a high plank one arm at a time, then lower back down.',
    duration: 45,
  },
  {
    id: 'h3',
    name: 'Diamond Push-ups',
    description: 'Perform push-ups with hands close together forming a diamond shape to target triceps.',
    duration: 40,
  },
  {
    id: 'h4',
    name: 'Pistol Squats',
    description: 'A single-leg squat where you extend the non-squatting leg forward, lowering until the thigh of your standing leg is parallel to the ground.',
    duration: 40,
  },
  {
    id: 'h5',
    name: 'Plyo Lunges',
    description: 'Perform lunges with an explosive jump to switch legs in mid-air.',
    duration: 45,
  },
  {
    id: 'h6',
    name: 'Jumping Burpees',
    description: 'Perform a burpee with an explosive high jump at the end.',
    duration: 50,
  },
  {
    id: 'h7',
    name: 'Hollow Body Hold',
    description: 'Lie on your back, arms extended overhead, lift shoulders and legs off the ground, forming a dish shape with your body.',
    duration: 40,
  },
  {
    id: 'h8',
    name: 'Hindu Push-ups',
    description: 'A flowing push-up variation where your body moves from downward dog into an upward-facing position.',
    duration: 40,
  }
];

// Workout generator function
export const generateWorkout = (difficulty: Difficulty): Workout => {
  let filteredExercises: Exercise[] = [];
  let restTime = 15; // Default rest time

  // Filter exercises by difficulty
  switch (difficulty) {
    case 'easy':
      filteredExercises = exercises.filter(e => e.id.startsWith('e'));
      restTime = 15;
      break;
    case 'medium':
      filteredExercises = exercises.filter(e => e.id.startsWith('m'));
      restTime = 10;
      break;
    case 'hard':
      filteredExercises = exercises.filter(e => e.id.startsWith('h'));
      restTime = 10;
      break;
    default:
      filteredExercises = exercises.filter(e => e.id.startsWith('e'));
      restTime = 15;
  }

  // Shuffle and select 5 exercises
  const shuffled = [...filteredExercises].sort(() => 0.5 - Math.random());
  const selectedExercises = shuffled.slice(0, 5);

  return {
    id: `workout-${Date.now()}`,
    difficulty,
    exercises: selectedExercises,
    restBetweenExercises: restTime
  };
};

// Formatting time functions
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};
