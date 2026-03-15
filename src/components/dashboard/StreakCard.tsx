'use client';

import { Flame } from 'lucide-react';

export function StreakCard() {
  return (
    <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold opacity-90">Current Streak</h2>
        <Flame className="w-6 h-6" />
      </div>

      <div className="flex items-end gap-2 mb-6">
        <span className="text-5xl font-bold">0</span>
        <span className="text-lg opacity-90 mb-1">days</span>
      </div>

      <button className="w-full bg-white text-pink-500 font-semibold py-3 px-4 rounded-xl hover:bg-opacity-90 transition-all">
        Check In Today
      </button>
    </div>
  );
}