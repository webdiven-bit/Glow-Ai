'use client'

import { motion } from 'framer-motion'
import { Award, Lock } from 'lucide-react'

interface BadgesGalleryProps {
  badges: any[]
}

export function BadgesGallery({ badges }: BadgesGalleryProps) {
  const allBadges = [
    {
      id: '7-day',
      name: '7-Day Dedication',
      description: 'Completed 7 days streak',
      icon: '🌟',
      color: 'from-yellow-400 to-yellow-500',
      requirement: 7,
    },
    {
      id: '30-day',
      name: '30-Day Warrior',
      description: 'Completed 30 days streak',
      icon: '⚡',
      color: 'from-purple-400 to-purple-500',
      requirement: 30,
    },
    {
      id: '50-day',
      name: '50-Day Champion',
      description: 'Completed 50 days streak',
      icon: '👑',
      color: 'from-pink-400 to-pink-500',
      requirement: 50,
    },
    {
      id: '100-day',
      name: '100-Day Legend',
      description: 'Completed 100 days streak',
      icon: '🏆',
      color: 'from-orange-400 to-orange-500',
      requirement: 100,
    },
    {
      id: 'first-analysis',
      name: 'First Analysis',
      description: 'Completed first skin analysis',
      icon: '🔬',
      color: 'from-blue-400 to-blue-500',
      requirement: 0,
    },
    {
      id: 'first-purchase',
      name: 'First Purchase',
      description: 'Made first purchase',
      icon: '🛍️',
      color: 'from-green-400 to-green-500',
      requirement: 0,
    },
    {
      id: 'social-butterfly',
      name: 'Social Butterfly',
      description: 'Added 5 friends',
      icon: '🦋',
      color: 'from-pink-400 to-pink-500',
      requirement: 0,
    },
    {
      id: 'reviewer',
      name: 'Top Reviewer',
      description: 'Left 10 product reviews',
      icon: '✍️',
      color: 'from-indigo-400 to-indigo-500',
      requirement: 0,
    },
  ]

  const earnedBadgeIds = badges.map(b => b.id)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Your Badges</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {allBadges.map((badge, index) => {
          const isEarned = earnedBadgeIds.includes(badge.id)

          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`relative bg-white rounded-xl p-4 text-center ${
                !isEarned && 'opacity-50'
              }`}
            >
              <div
                className={`w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r ${badge.color} flex items-center justify-center`}
              >
                <span className="text-2xl">{badge.icon}</span>
              </div>

              <h3 className="font-semibold text-sm">{badge.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{badge.description}</p>

              {!isEarned && (
                <div className="absolute inset-0 bg-white/50 rounded-xl flex items-center justify-center backdrop-blur-[1px]">
                  <Lock className="w-6 h-6 text-gray-400" />
                </div>
              )}

              {isEarned && (
                <div className="absolute top-2 right-2">
                  <Award className="w-4 h-4 text-yellow-500" />
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Progress */}
      <div className="bg-white rounded-xl p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">Progress</h3>
          <span className="text-sm text-gray-600">
            {badges.length} / {allBadges.length} Badges
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-pink-500 to-rose-500"
            style={{ width: `${(badges.length / allBadges.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}