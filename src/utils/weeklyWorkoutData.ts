
export type MuscleGroup = 
  | 'Chest & Triceps'
  | 'Back & Biceps'
  | 'Legs & Glutes'
  | 'Core & Abs'
  | 'Cardio & Endurance'
  | 'Active Recovery'
  | 'Rest & Recovery';

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface WarmupExercise {
  id: string;
  name: string;
  description: string;
  duration: number; // in seconds
  imageUrl?: string;
}

export interface WorkoutExercise {
  id: string;
  name: string;
  description: string;
  sets: number;
  reps: number | string; // String for time-based exercises like "30 sec"
  restBetweenSets: number; // in seconds
  imageUrl?: string;
}

export interface DayPlan {
  day: DayOfWeek;
  muscleGroup: MuscleGroup;
  warmup: WarmupExercise[];
  exercises: WorkoutExercise[];
  description: string;
}

export interface WeeklyPlan {
  id: string;
  difficulty: 'easy' | 'medium' | 'hard';
  days: DayPlan[];
}

export type Difficulty = 'easy' | 'medium' | 'hard';

// Warmup exercises database
const warmupExercises: WarmupExercise[] = [
  {
    id: 'w1',
    name: 'Jumping Jacks',
    description: 'Stand with your feet together and arms at your sides, then jump to a position with legs spread and arms overhead.',
    duration: 60,
  },
  {
    id: 'w2',
    name: 'High Knees',
    description: 'Run in place, lifting your knees as high as possible with each step.',
    duration: 45,
  },
  {
    id: 'w3',
    name: 'Arm Circles',
    description: 'Extend your arms to the sides and make circular motions, starting small and getting larger.',
    duration: 30,
  },
  {
    id: 'w4',
    name: 'Torso Twists',
    description: 'Stand with feet shoulder-width apart and twist your torso from side to side.',
    duration: 40,
  },
  {
    id: 'w5',
    name: 'Leg Swings',
    description: 'Hold onto something stable and swing one leg forward and backward, then side to side. Repeat with the other leg.',
    duration: 60,
  },
  {
    id: 'w6',
    name: 'Neck Rolls',
    description: 'Gently roll your head in a circular motion to loosen neck muscles.',
    duration: 30,
  },
  {
    id: 'w7',
    name: 'Dynamic Lunges',
    description: 'Step forward into a lunge position, then return and repeat with the other leg.',
    duration: 60,
  },
  {
    id: 'w8',
    name: 'Hip Rotations',
    description: 'Stand on one leg and rotate your hip in circular motions. Switch legs and repeat.',
    duration: 40,
  },
];

// Workout exercises by muscle group and difficulty
const workoutExercises: Record<MuscleGroup, Record<Difficulty, WorkoutExercise[]>> = {
  'Chest & Triceps': {
    easy: [
      {
        id: 'ct-e1',
        name: 'Modified Push-ups',
        description: 'Perform push-ups with knees on the ground for an easier variation.',
        sets: 3,
        reps: 8,
        restBetweenSets: 60,
      },
      {
        id: 'ct-e2',
        name: 'Wall Push-ups',
        description: 'Stand facing a wall and perform push-ups against it.',
        sets: 3,
        reps: 12,
        restBetweenSets: 45,
      },
      {
        id: 'ct-e3',
        name: 'Tricep Dips (Chair)',
        description: 'Using a chair, place hands on the edge and dip body by bending elbows.',
        sets: 2,
        reps: 10,
        restBetweenSets: 60,
      },
    ],
    medium: [
      {
        id: 'ct-m1',
        name: 'Standard Push-ups',
        description: 'Perform full push-ups with proper form.',
        sets: 3,
        reps: 12,
        restBetweenSets: 60,
      },
      {
        id: 'ct-m2',
        name: 'Incline Push-ups',
        description: 'Perform push-ups with hands elevated on a stable surface.',
        sets: 3,
        reps: 15,
        restBetweenSets: 45,
      },
      {
        id: 'ct-m3',
        name: 'Diamond Push-ups',
        description: 'Push-ups with hands close together forming a diamond shape to target triceps.',
        sets: 3,
        reps: 10,
        restBetweenSets: 60,
      },
    ],
    hard: [
      {
        id: 'ct-h1',
        name: 'Decline Push-ups',
        description: 'Perform push-ups with feet elevated on a stable surface.',
        sets: 4,
        reps: 15,
        restBetweenSets: 60,
      },
      {
        id: 'ct-h2',
        name: 'Plyometric Push-ups',
        description: 'Explosive push-ups where hands leave the ground at the top of the movement.',
        sets: 3,
        reps: 12,
        restBetweenSets: 90,
      },
      {
        id: 'ct-h3',
        name: 'Tricep Dips (Parallel Bars)',
        description: 'Using parallel bars or sturdy surfaces, perform full tricep dips.',
        sets: 4,
        reps: 12,
        restBetweenSets: 60,
      },
    ],
  },
  'Back & Biceps': {
    easy: [
      {
        id: 'bb-e1',
        name: 'Supermans',
        description: 'Lie on your stomach and lift your arms and legs off the ground.',
        sets: 3,
        reps: 10,
        restBetweenSets: 45,
      },
      {
        id: 'bb-e2',
        name: 'Standing Wall Pull-aparts',
        description: 'Stand facing a wall in push-up position and pull your body away from the wall.',
        sets: 3,
        reps: 12,
        restBetweenSets: 60,
      },
      {
        id: 'bb-e3',
        name: 'Doorway Curls',
        description: 'Using a towel in a doorway, perform bicep curls by pulling against the resistance.',
        sets: 2,
        reps: 12,
        restBetweenSets: 45,
      },
    ],
    medium: [
      {
        id: 'bb-m1',
        name: 'Australian Pull-ups',
        description: 'Using a horizontal bar or table, perform rows from an inclined position.',
        sets: 3,
        reps: 12,
        restBetweenSets: 60,
      },
      {
        id: 'bb-m2',
        name: 'Superman Pulses',
        description: 'From superman position, pulse arms and legs for increased back engagement.',
        sets: 3,
        reps: '30 sec',
        restBetweenSets: 45,
      },
      {
        id: 'bb-m3',
        name: 'Towel Bicep Curls',
        description: 'Using a towel with resistance, perform bicep curls.',
        sets: 3,
        reps: 15,
        restBetweenSets: 60,
      },
    ],
    hard: [
      {
        id: 'bb-h1',
        name: 'Pull-ups',
        description: 'Using a bar, pull yourself up until chin clears the bar.',
        sets: 4,
        reps: 8,
        restBetweenSets: 90,
      },
      {
        id: 'bb-h2',
        name: 'Chin-ups',
        description: 'Using a bar with palms facing you, pull yourself up.',
        sets: 3,
        reps: 10,
        restBetweenSets: 90,
      },
      {
        id: 'bb-h3',
        name: 'Australian Pull-up Variations',
        description: 'Advanced variations of rows with different grip positions.',
        sets: 4,
        reps: 12,
        restBetweenSets: 60,
      },
    ],
  },
  'Legs & Glutes': {
    easy: [
      {
        id: 'lg-e1',
        name: 'Air Squats',
        description: 'Perform bodyweight squats with proper form.',
        sets: 3,
        reps: 15,
        restBetweenSets: 60,
      },
      {
        id: 'lg-e2',
        name: 'Glute Bridges',
        description: 'Lie on your back and lift hips off the ground by engaging glutes.',
        sets: 3,
        reps: 15,
        restBetweenSets: 45,
      },
      {
        id: 'lg-e3',
        name: 'Assisted Lunges',
        description: 'Perform lunges while holding onto a support for balance.',
        sets: 2,
        reps: 10,
        restBetweenSets: 60,
      },
    ],
    medium: [
      {
        id: 'lg-m1',
        name: 'Bulgarian Split Squats',
        description: 'Perform split squats with rear foot elevated on a bench or chair.',
        sets: 3,
        reps: 12,
        restBetweenSets: 60,
      },
      {
        id: 'lg-m2',
        name: 'Walking Lunges',
        description: 'Perform lunges while walking forward, alternating legs.',
        sets: 3,
        reps: 20,
        restBetweenSets: 60,
      },
      {
        id: 'lg-m3',
        name: 'Single-Leg Glute Bridges',
        description: 'Glute bridges performed with one leg raised in the air.',
        sets: 3,
        reps: 12,
        restBetweenSets: 45,
      },
    ],
    hard: [
      {
        id: 'lg-h1',
        name: 'Pistol Squats',
        description: 'Single-leg squats performed with the non-working leg extended forward.',
        sets: 3,
        reps: 8,
        restBetweenSets: 90,
      },
      {
        id: 'lg-h2',
        name: 'Jump Squats',
        description: 'Explosive squats with a jump at the top of the movement.',
        sets: 4,
        reps: 15,
        restBetweenSets: 60,
      },
      {
        id: 'lg-h3',
        name: 'Plyometric Lunges',
        description: 'Lunges with a jump to switch legs in mid-air.',
        sets: 3,
        reps: 12,
        restBetweenSets: 90,
      },
    ],
  },
  'Core & Abs': {
    easy: [
      {
        id: 'ca-e1',
        name: 'Modified Crunches',
        description: 'Perform crunches with a smaller range of motion.',
        sets: 3,
        reps: 15,
        restBetweenSets: 45,
      },
      {
        id: 'ca-e2',
        name: 'Bird Dog',
        description: 'On hands and knees, extend opposite arm and leg simultaneously.',
        sets: 3,
        reps: 10,
        restBetweenSets: 30,
      },
      {
        id: 'ca-e3',
        name: 'Dead Bug',
        description: 'Lie on back, extend opposite arm and leg while keeping core engaged.',
        sets: 3,
        reps: 10,
        restBetweenSets: 45,
      },
    ],
    medium: [
      {
        id: 'ca-m1',
        name: 'Mountain Climbers',
        description: 'From a plank position, alternate bringing knees to chest rapidly.',
        sets: 3,
        reps: '30 sec',
        restBetweenSets: 45,
      },
      {
        id: 'ca-m2',
        name: 'Russian Twists',
        description: 'Seated with feet elevated, twist torso from side to side.',
        sets: 3,
        reps: 20,
        restBetweenSets: 60,
      },
      {
        id: 'ca-m3',
        name: 'Plank',
        description: 'Hold body in straight line from head to heels, supporting on forearms and toes.',
        sets: 3,
        reps: '45 sec',
        restBetweenSets: 45,
      },
    ],
    hard: [
      {
        id: 'ca-h1',
        name: 'Hollow Body Hold',
        description: 'Lie on back, lift shoulders and legs off ground to create a dish shape.',
        sets: 3,
        reps: '60 sec',
        restBetweenSets: 60,
      },
      {
        id: 'ca-h2',
        name: 'V-Ups',
        description: 'Simultaneously lift torso and legs to form a V-shape.',
        sets: 4,
        reps: 15,
        restBetweenSets: 60,
      },
      {
        id: 'ca-h3',
        name: 'Dragon Flags',
        description: 'Lying on back, raise entire lower body as a unit while keeping it rigid.',
        sets: 3,
        reps: 8,
        restBetweenSets: 90,
      },
    ],
  },
  'Cardio & Endurance': {
    easy: [
      {
        id: 'ce-e1',
        name: 'Brisk Walking',
        description: 'Walk at a pace that elevates heart rate slightly.',
        sets: 1,
        reps: '15 min',
        restBetweenSets: 0,
      },
      {
        id: 'ce-e2',
        name: 'Step-Ups',
        description: 'Step up and down on a sturdy platform or stair.',
        sets: 3,
        reps: '45 sec',
        restBetweenSets: 60,
      },
      {
        id: 'ce-e3',
        name: 'Beginner Shadow Boxing',
        description: 'Practice basic punches in the air to elevate heart rate.',
        sets: 2,
        reps: '2 min',
        restBetweenSets: 60,
      },
    ],
    medium: [
      {
        id: 'ce-m1',
        name: 'Jogging in Place',
        description: 'Jog in place at moderate intensity.',
        sets: 3,
        reps: '3 min',
        restBetweenSets: 60,
      },
      {
        id: 'ce-m2',
        name: 'Burpees',
        description: 'Complete movement from standing to plank to jump.',
        sets: 3,
        reps: 12,
        restBetweenSets: 60,
      },
      {
        id: 'ce-m3',
        name: 'Jump Rope',
        description: 'Simulate or perform actual jump rope at moderate pace.',
        sets: 3,
        reps: '2 min',
        restBetweenSets: 60,
      },
    ],
    hard: [
      {
        id: 'ce-h1',
        name: 'HIIT Sprint Intervals',
        description: 'Alternate between sprinting in place and light jogging.',
        sets: 6,
        reps: '30 sec sprint, 30 sec jog',
        restBetweenSets: 30,
      },
      {
        id: 'ce-h2',
        name: 'Advanced Burpees',
        description: 'Burpees with push-up and high jump.',
        sets: 4,
        reps: 15,
        restBetweenSets: 60,
      },
      {
        id: 'ce-h3',
        name: 'Tabata Protocol',
        description: '20 seconds max effort, 10 seconds rest, repeated 8 times.',
        sets: 8,
        reps: '20 sec',
        restBetweenSets: 10,
      },
    ],
  },
  'Active Recovery': {
    easy: [
      {
        id: 'ar-e1',
        name: 'Gentle Yoga Flow',
        description: 'A series of gentle yoga poses focusing on deep breathing.',
        sets: 1,
        reps: '15 min',
        restBetweenSets: 0,
      },
      {
        id: 'ar-e2',
        name: 'Basic Stretching Routine',
        description: 'A full-body stretching routine holding each stretch for 20-30 seconds.',
        sets: 1,
        reps: '10 min',
        restBetweenSets: 0,
      },
      {
        id: 'ar-e3',
        name: 'Mindful Walking',
        description: 'A slow, deliberate walk focusing on breathing and movement awareness.',
        sets: 1,
        reps: '15 min',
        restBetweenSets: 0,
      },
    ],
    medium: [
      {
        id: 'ar-m1',
        name: 'Intermediate Yoga',
        description: 'A moderate yoga routine including sun salutations and balance poses.',
        sets: 1,
        reps: '20 min',
        restBetweenSets: 0,
      },
      {
        id: 'ar-m2',
        name: 'Foam Rolling Session',
        description: 'Self-myofascial release using a foam roller on major muscle groups.',
        sets: 1,
        reps: '15 min',
        restBetweenSets: 0,
      },
      {
        id: 'ar-m3',
        name: 'Dynamic Stretching Routine',
        description: 'Active stretches that take joints through complete range of motion.',
        sets: 3,
        reps: '5 min per set',
        restBetweenSets: 30,
      },
    ],
    hard: [
      {
        id: 'ar-h1',
        name: 'Advanced Yoga Flow',
        description: 'Challenging yoga sequence including arm balances and inversions.',
        sets: 1,
        reps: '30 min',
        restBetweenSets: 0,
      },
      {
        id: 'ar-h2',
        name: 'Mobility Circuit',
        description: 'Comprehensive mobility routine targeting all major joint systems.',
        sets: 3,
        reps: '7 min per set',
        restBetweenSets: 60,
      },
      {
        id: 'ar-h3',
        name: 'PNF Stretching Routine',
        description: 'Proprioceptive Neuromuscular Facilitation stretching techniques.',
        sets: 1,
        reps: '20 min',
        restBetweenSets: 0,
      },
    ],
  },
  'Rest & Recovery': {
    easy: [
      {
        id: 'rr-e1',
        name: 'Beginner Meditation',
        description: 'Simple guided meditation focusing on breathing and relaxation.',
        sets: 1,
        reps: '10 min',
        restBetweenSets: 0,
      },
      {
        id: 'rr-e2',
        name: 'Light Stretching',
        description: 'Very gentle stretching to promote blood flow without strain.',
        sets: 1,
        reps: '10 min',
        restBetweenSets: 0,
      },
      {
        id: 'rr-e3',
        name: 'Progressive Muscle Relaxation',
        description: 'Technique of tensing and relaxing muscle groups sequentially.',
        sets: 1,
        reps: '15 min',
        restBetweenSets: 0,
      },
    ],
    medium: [
      {
        id: 'rr-m1',
        name: 'Mindfulness Meditation',
        description: 'Focused meditation practice emphasizing present-moment awareness.',
        sets: 1,
        reps: '15 min',
        restBetweenSets: 0,
      },
      {
        id: 'rr-m2',
        name: 'Restorative Yoga',
        description: 'Gentle yoga poses held for longer periods using props for support.',
        sets: 1,
        reps: '20 min',
        restBetweenSets: 0,
      },
      {
        id: 'rr-m3',
        name: 'Deep Breathing Exercises',
        description: 'Various breathing techniques to reduce stress and promote recovery.',
        sets: 3,
        reps: '5 min',
        restBetweenSets: 0,
      },
    ],
    hard: [
      {
        id: 'rr-h1',
        name: 'Advanced Meditation',
        description: 'Longer, deeper meditation practice for experienced meditators.',
        sets: 1,
        reps: '30 min',
        restBetweenSets: 0,
      },
      {
        id: 'rr-h2',
        name: 'Guided Visualization',
        description: 'Mental imagery exercises for recovery and performance enhancement.',
        sets: 1,
        reps: '25 min',
        restBetweenSets: 0,
      },
      {
        id: 'rr-h3',
        name: 'Body Scan Meditation',
        description: 'Detailed awareness practice focusing on each part of the body sequentially.',
        sets: 1,
        reps: '30 min',
        restBetweenSets: 0,
      },
    ],
  },
};

// Generate a full weekly workout plan based on difficulty
export const generateWeeklyPlan = (difficulty: Difficulty): WeeklyPlan => {
  // Define the structure of the week
  const weekStructure: {day: DayOfWeek; muscleGroup: MuscleGroup; description: string}[] = [
    { 
      day: 'Monday', 
      muscleGroup: 'Chest & Triceps', 
      description: 'Focus on upper body pushing movements to build chest and triceps strength.'
    },
    { 
      day: 'Tuesday', 
      muscleGroup: 'Back & Biceps', 
      description: 'Target pulling movements to develop a strong back and defined biceps.'
    },
    { 
      day: 'Wednesday', 
      muscleGroup: 'Legs & Glutes', 
      description: 'Build lower body strength and power with targeted leg and glute exercises.'
    },
    { 
      day: 'Thursday', 
      muscleGroup: 'Core & Abs', 
      description: 'Strengthen your midsection with focused core and abdominal training.'
    },
    { 
      day: 'Friday', 
      muscleGroup: 'Cardio & Endurance', 
      description: 'Improve cardiovascular health and stamina with heart-pumping routines.'
    },
    { 
      day: 'Saturday', 
      muscleGroup: 'Active Recovery', 
      description: 'Enhance flexibility and recovery with low-intensity movement.'
    },
    { 
      day: 'Sunday', 
      muscleGroup: 'Rest & Recovery', 
      description: 'Give your body time to recover and prepare for the next week.'
    },
  ];

  // For each day, select appropriate warmup and workout exercises
  const days: DayPlan[] = weekStructure.map(({day, muscleGroup, description}) => {
    // Select 3-4 random warmup exercises
    const shuffledWarmups = [...warmupExercises].sort(() => 0.5 - Math.random());
    const selectedWarmups = shuffledWarmups.slice(0, 4);

    // Get the appropriate workout exercises for this muscle group and difficulty
    const muscleExercises = workoutExercises[muscleGroup][difficulty];

    return {
      day,
      muscleGroup,
      description,
      warmup: selectedWarmups,
      exercises: muscleExercises,
    };
  });

  return {
    id: `weekly-plan-${Date.now()}`,
    difficulty,
    days,
  };
};

// Format time helper function
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Local storage functions to persist workout progress
export const saveWorkoutProgress = (weeklyPlanId: string, progress: Record<string, boolean>) => {
  localStorage.setItem(`workout-progress-${weeklyPlanId}`, JSON.stringify(progress));
};

export const getWorkoutProgress = (weeklyPlanId: string): Record<string, boolean> => {
  const saved = localStorage.getItem(`workout-progress-${weeklyPlanId}`);
  return saved ? JSON.parse(saved) : {};
};
