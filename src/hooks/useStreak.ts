'use client';

import { useState, useEffect } from 'react';

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastCheckIn: Date | null;
  todayChecked: boolean;
}

export function useStreak() {
  const [streak, setStreak] = useState<StreakData>({
    currentStreak: 0,
    longestStreak: 0,
    lastCheckIn: null,
    todayChecked: false
  });

  useEffect(() => {
    const savedStreak = localStorage.getItem('streak');
    if (savedStreak) {
      try {
        const parsed = JSON.parse(savedStreak);
        parsed.lastCheckIn = parsed.lastCheckIn ? new Date(parsed.lastCheckIn) : null;
        
        const today = new Date();
        const lastCheck = parsed.lastCheckIn;
        if (lastCheck) {
          parsed.todayChecked = 
            lastCheck.getDate() === today.getDate() &&
            lastCheck.getMonth() === today.getMonth() &&
            lastCheck.getFullYear() === today.getFullYear();
        }
        
        setStreak(parsed);
      } catch (error) {
        console.error('Failed to parse streak data');
      }
    }
  }, []);

  const checkIn = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    setStreak(prev => {
      let newStreak = { ...prev };
      
      if (prev.lastCheckIn) {
        const lastCheck = new Date(prev.lastCheckIn);
        if (
          lastCheck.getDate() === yesterday.getDate() &&
          lastCheck.getMonth() === yesterday.getMonth() &&
          lastCheck.getFullYear() === yesterday.getFullYear()
        ) {
          newStreak.currentStreak = prev.currentStreak + 1;
        } else if (!prev.todayChecked) {
          newStreak.currentStreak = 1;
        }
      } else {
        newStreak.currentStreak = 1;
      }
      
      if (newStreak.currentStreak > prev.longestStreak) {
        newStreak.longestStreak = newStreak.currentStreak;
      }
      
      newStreak.lastCheckIn = today;
      newStreak.todayChecked = true;
      
      localStorage.setItem('streak', JSON.stringify(newStreak));
      
      return newStreak;
    });
  };

  const resetStreak = () => {
    const newStreak = {
      currentStreak: 0,
      longestStreak: streak.longestStreak,
      lastCheckIn: null,
      todayChecked: false
    };
    setStreak(newStreak);
    localStorage.setItem('streak', JSON.stringify(newStreak));
  };

  return {
    ...streak,
    checkIn,
    resetStreak
  };
}
