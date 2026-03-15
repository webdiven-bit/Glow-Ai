'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useStreak } from '@/hooks/useStreak';
import { Flame, Calendar, Award } from 'lucide-react';

export default function StreaksPage() {
  const { currentStreak, longestStreak, todayChecked, checkIn, lastCheckIn } = useStreak();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto">
          <div className="h-8 bg-gray-200 rounded w-48 mb-8 animate-pulse" />
          <div className="grid md:grid-cols-3 gap-6">
            {[1,2,3].map(i => <div key={i} className="h-32 bg-gray-100 rounded-2xl animate-pulse" />)}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Your Streaks</h1>
        <p className="text-gray-600 mb-8">Track your daily check-ins and build consistency</p>

        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 text-white mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Current Streak</h2>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-bold">{currentStreak}</span>
                <span className="text-xl opacity-90">days</span>
              </div>
            </div>
            <Flame className="w-20 h-20 opacity-80" />
          </div>
          
          <button
            onClick={checkIn}
            disabled={todayChecked}
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
              todayChecked
                ? 'bg-white/20 text-white cursor-not-allowed'
                : 'bg-white text-orange-500 hover:bg-white/90 hover:scale-105'
            }`}
          >
            {todayChecked ? '✓ Checked In Today' : '🔥 Check In Now'}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Longest Streak</h3>
              <Award className="w-6 h-6 text-yellow-500" />
            </div>
            <p className="text-4xl font-bold text-gray-800">{longestStreak}</p>
            <p className="text-sm text-gray-500 mt-2">days</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Last Check-in</h3>
              <Calendar className="w-6 h-6 text-blue-500" />
            </div>
            <p className="text-xl font-bold text-gray-800">
              {lastCheckIn ? new Date(lastCheckIn).toLocaleDateString() : 'Never'}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {todayChecked ? '✓ Today' : 'Not checked in today'}
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
