import { Stack } from 'expo-router';
import React, { createContext, useEffect, useState } from 'react';

export const ExercisesContext = createContext(null);

const SAMPLE_EXERCISES = [
  {
    id: '1',
    name: 'Push Ups',
    description: 'A bodyweight exercise that works chest, shoulders and triceps.',
    image: 'https://images.unsplash.com/photo-1594737625785-7f9a8a1a1b3e?w=800',
    completed: false,
  },
  {
    id: '2',
    name: 'Squats',
    description: 'A lower-body exercise targeting quads, glutes and hamstrings.',
    image: 'https://images.unsplash.com/photo-1558611848-73f7eb4001d5?w=800',
    completed: false,
  },
  {
    id: '3',
    name: 'Plank',
    description: 'Core-strengthening isometric hold for abs and lower back.',
    image: 'https://images.unsplash.com/photo-1594737625779-4b7b3f2c4f1e?w=800',
    completed: false,
  },
  {
    id: '4',
    name: 'Lunges',
    description: 'Single-leg movement to build balance and leg strength.',
    image: 'https://images.unsplash.com/photo-1558611847-3ac8c8a7b3f2?w=800',
    completed: false,
  },
  {
    id: '5',
    name: 'Burpees',
    description: 'Full-body cardio move that builds strength and endurance.',
    image: 'https://images.unsplash.com/photo-1554284126-aa88f22d8d15?w=800',
    completed: false,
  },
  {
    id: '6',
    name: 'Jumping Jacks',
    description: 'Simple cardio exercise to raise heart rate and warm up.',
    image: 'https://images.unsplash.com/photo-1526403224746-3d6f3b8b4e22?w=800',
    completed: false,
  },
];

export default function RootLayout() {
  const [exercises, setExercises] = useState(SAMPLE_EXERCISES);

  // Try to use AsyncStorage if available to persist exercises between runs.
  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        // dynamic require so missing package doesn't break the app
        // install with: npm install @react-native-async-storage/async-storage
        // this will gracefully fall back if not installed
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const AsyncStorage = require('@react-native-async-storage/async-storage').default;
        const raw = await AsyncStorage.getItem('exercises');
        if (raw && mounted) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) setExercises(parsed);
        }
      } catch (err) {
        // no-op: AsyncStorage might not be installed or value missing
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    async function save() {
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const AsyncStorage = require('@react-native-async-storage/async-storage').default;
        await AsyncStorage.setItem('exercises', JSON.stringify(exercises));
      } catch (err) {
        // ignore if AsyncStorage not available
      }
    }
    save();
  }, [exercises]);

  function addExercise(item) {
    setExercises(prev => [item, ...prev]);
  }

  function toggleCompleted(id) {
    setExercises(prev => prev.map(e => (e.id === id ? { ...e, completed: !e.completed } : e)));
  }

  function removeExercise(id) {
    setExercises(prev => prev.filter(e => e.id !== id));
  }

  return (
    <ExercisesContext.Provider value={{ exercises, addExercise, toggleCompleted, removeExercise }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </ExercisesContext.Provider>
  );
}
