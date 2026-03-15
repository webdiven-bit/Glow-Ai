'use client'

import { motion } from 'framer-motion'
import { Flame, Award, Calendar, TrendingUp } from 'lucide-react'

interface StreakStatsProps {
  streak: {
    current: number
    longest: number
    total: number
    lastCheckIn?: string
  }
  onCheckIn: () => Promise<void>
}

export function StreakStats({ streak, onCheckIn }: StreakStatsProps) {
  const canCheckIn = () => {
    if (!streak.lastCheckIn) return true
    const last = new Date(streak.lastCheckIn)
    const today = new Date()
    return last.toDateString() !== today.toDateString()
  }

  return (
    <div className="space-y-6">
      {/* Main Streak Card */}
      <motion.div
        whileHover={{ y: -2 }}
        className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 text-white"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold opacity-90">Current Streak</h2>
          <Flame className="w-6 h-6" />
        </div>

        <div className="flex items-end gap-2 mb-6">
          <span className="text-5xl font-bold">{streak.current}</span>
          <span className="text-lg opacity-90 mb-1">days</span>
        </div>

        {canCheckIn() ? (
          <button
            onClick={onCheckIn}
            className="w-full bg-white text-pink-500 font-semibold py-3 px-4 rounded-xl hover:bg-opacity-90 transition-all"
          >
            Check In Today
          </button>
        ) : (
          <div className="text-center py-3 px-4 bg-white/20 rounded-xl">
            Already checked in today
          </div>
        )}
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-purple-500" />
            <span className="text-sm text-gray-600">Longest</span>
          </div>
          <p className="text-2xl font-bold">{streak.longest} days</p>
        </div>

        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-gray-600">Total</span>
          </div>
          <p className="text-2xl font-bold">{streak.total} days</p>
        </div>
      </div>

      {/* Motivation */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
        <p className="text-sm text-gray-700">
          {streak.current === 0
            ? "Start your streak today! Check in daily to build consistency."
            : streak.current < 7
            ? `You're on fire! ${7 - streak.current} more days until your first badge!`
            : streak.current < 30
            ? `Amazing consistency! ${30 - streak.current} days until a special reward!`
            : "You're a skincare master! Keep up the great work!"}
        </p>
      </div>

      {/* Milestone Progress */}
      <div className="bg-white rounded-xl p-4">
        <h3 className="font-semibold mb-4">Milestones</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>7 Days - Bronze Badge</span>
              <span className="font-medium">{Math.min(100, (streak.current / 7) * 100)}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500"
                style={{ width: `${Math.min(100, (streak.current / 7) * 100)}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>30 Days - 15% Discount</span>
              <span className="font-medium">{Math.min(100, (streak.current / 30) * 100)}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-400 to-purple-500"
                style={{ width: `${Math.min(100, (streak.current / 30) * 100)}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>50 Days - Raffle Entry</span>
              <span className="font-medium">{Math.min(100, (streak.current / 50) * 100)}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-400 to-pink-500"
                style={{ width: `${Math.min(100, (streak.current / 50) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}