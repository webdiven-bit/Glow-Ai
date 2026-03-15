'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Medal, Flame } from 'lucide-react'
import Image from 'next/image'

interface LeaderboardProps {
  entries: any[]
}

export function Leaderboard({ entries }: LeaderboardProps) {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'alltime'>('weekly')

  const timeframes = [
    { id: 'weekly', label: 'This Week' },
    { id: 'monthly', label: 'This Month' },
    { id: 'alltime', label: 'All Time' },
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />
      case 3:
        return <Medal className="w-5 h-5 text-amber-600" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Leaderboard</h2>
        <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
          {timeframes.map((tf) => (
            <button
              key={tf.id}
              onClick={() => setTimeframe(tf.id as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeframe === tf.id
                  ? 'bg-white text-pink-500 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Podium */}
      {entries.length >= 3 && (
        <div className="flex items-end justify-center gap-4 mb-8">
          {/* 2nd Place */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <div className="relative">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-2 overflow-hidden">
                {entries[1]?.avatar ? (
                  <Image src={entries[1].avatar} alt="" fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <span className="text-xl">{entries[1]?.name?.[0]}</span>
                  </div>
                )}
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                2
              </div>
            </div>
            <p className="font-medium mt-2">{entries[1]?.name}</p>
            <p className="text-sm text-gray-500">{entries[1]?.streak} days</p>
            <div className="h-16 w-16 bg-gray-200 rounded-t-lg mt-2" style={{ height: '60px' }} />
          </motion.div>

          {/* 1st Place */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
            className="text-center"
          >
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full mx-auto mb-2 p-1">
                <div className="w-full h-full bg-white rounded-full overflow-hidden">
                  {entries[0]?.avatar ? (
                    <Image src={entries[0].avatar} alt="" fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-2xl">{entries[0]?.name?.[0]}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
            </div>
            <p className="font-medium mt-2">{entries[0]?.name}</p>
            <p className="text-sm text-gray-500">{entries[0]?.streak} days</p>
            <div className="h-20 w-20 bg-gradient-to-t from-yellow-400 to-yellow-300 rounded-t-lg mt-2" />
          </motion.div>

          {/* 3rd Place */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="relative">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-2 overflow-hidden">
                {entries[2]?.avatar ? (
                  <Image src={entries[2].avatar} alt="" fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-amber-100 flex items-center justify-center">
                    <span className="text-xl">{entries[2]?.name?.[0]}</span>
                  </div>
                )}
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                3
              </div>
            </div>
            <p className="font-medium mt-2">{entries[2]?.name}</p>
            <p className="text-sm text-gray-500">{entries[2]?.streak} days</p>
            <div className="h-12 w-16 bg-amber-600/20 rounded-t-lg mt-2" style={{ height: '40px' }} />
          </motion.div>
        </div>
      )}

      {/* Leaderboard List */}
      <div className="bg-white rounded-xl overflow-hidden">
        {entries.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`flex items-center gap-4 p-4 ${
              index < entries.length - 1 ? 'border-b border-gray-100' : ''
            } ${index < 3 ? 'bg-gradient-to-r from-yellow-50 to-amber-50' : ''}`}
          >
            <div className="w-8 text-center font-bold text-gray-400">
              {index + 1}
            </div>

            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
              {entry.avatar ? (
                <Image src={entry.avatar} alt="" width={40} height={40} className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-lg">{entry.name?.[0]}</span>
                </div>
              )}
            </div>

            <div className="flex-1">
              <p className="font-medium">{entry.name}</p>
              <p className="text-sm text-gray-500">@{entry.username}</p>
            </div>

            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="font-bold">{entry.streak}</span>
              <span className="text-sm text-gray-500">days</span>
            </div>

            {getRankIcon(index + 1)}
          </motion.div>
        ))}
      </div>
    </div>
  )
}