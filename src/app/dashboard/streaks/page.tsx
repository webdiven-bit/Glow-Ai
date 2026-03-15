'use client'

import { useState, useEffect } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { StreakStats } from '@/components/streaks/StreakStats'
import { BadgesGallery } from '@/components/streaks/BadgesGallery'
import { Leaderboard } from '@/components/streaks/Leaderboard'
import { useStreak } from '@/hooks/useStreak'
import { motion } from 'framer-motion'
import { Flame, Award, Trophy } from 'lucide-react'

export default function StreaksPage() {
  const { streak, badges, leaderboard, loading, checkIn } = useStreak()
  const [activeTab, setActiveTab] = useState<'streaks' | 'badges' | 'leaderboard'>('streaks')

  const tabs = [
    { id: 'streaks', label: 'My Streak', icon: Flame },
    { id: 'badges', label: 'Badges', icon: Award },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">Gamification</h1>
          <p className="text-gray-600 mb-8">
            Track your progress and earn rewards
          </p>

          {/* Tabs */}
          <div className="flex gap-2 border-b border-gray-200 mb-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors relative ${
                    activeTab === tab.id
                      ? 'text-pink-500'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500"
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Content */}
          {activeTab === 'streaks' && (
            <StreakStats streak={streak} onCheckIn={checkIn} />
          )}
          {activeTab === 'badges' && (
            <BadgesGallery badges={badges} />
          )}
          {activeTab === 'leaderboard' && (
            <Leaderboard entries={leaderboard} />
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  )
}