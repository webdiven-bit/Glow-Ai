'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'

interface Condition {
  id: string
  name: string
  category: string
  icon: string
  color: string
}

const conditions: Condition[] = [
  { id: 'blackheads', name: 'Blackheads', category: 'acne', icon: '⚫', color: 'bg-gray-500' },
  { id: 'whiteheads', name: 'Whiteheads', category: 'acne', icon: '⚪', color: 'bg-gray-300' },
  { id: 'papules', name: 'Papules', category: 'acne', icon: '🔴', color: 'bg-red-300' },
  { id: 'pustules', name: 'Pustules', category: 'acne', icon: '🟡', color: 'bg-yellow-500' },
  { id: 'cystic_acne', name: 'Cystic Acne', category: 'acne', icon: '🔵', color: 'bg-purple-500' },
  { id: 'hyperpigmentation', name: 'Hyperpigmentation', category: 'tone', icon: '🟤', color: 'bg-brown-500' },
  { id: 'oily_skin', name: 'Oily Skin', category: 'type', icon: '💧', color: 'bg-blue-300' },
  { id: 'dry_skin', name: 'Dry Skin', category: 'type', icon: '🏜️', color: 'bg-orange-200' },
]

interface ConditionSelectorProps {
  selectedConditions: string[]
  onSelect: (conditions: string[]) => void
  onAnalyze: () => void
  loading: boolean
}

export function ConditionSelector({
  selectedConditions,
  onSelect,
  onAnalyze,
  loading,
}: ConditionSelectorProps) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const categories = ['all', 'acne', 'tone', 'type', 'texture']

  const filteredConditions = conditions.filter(condition => {
    const matchesSearch = condition.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'all' || condition.category === category
    return matchesSearch && matchesCategory
  })

  const toggleCondition = (conditionId: string) => {
    if (selectedConditions.includes(conditionId)) {
      onSelect(selectedConditions.filter(id => id !== conditionId))
    } else {
      onSelect([...selectedConditions, conditionId])
    }
  }

  return (
    <div className="bg-white rounded-2xl p-6 space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search conditions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              category === cat
                ? 'bg-pink-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Conditions Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-96 overflow-y-auto p-1">
        {filteredConditions.map((condition) => {
          const isSelected = selectedConditions.includes(condition.id)
          return (
            <motion.button
              key={condition.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleCondition(condition.id)}
              className={`p-4 rounded-xl border-2 transition-all ${
                isSelected
                  ? 'border-pink-500 bg-pink-50'
                  : 'border-gray-200 hover:border-pink-300'
              }`}
            >
              <div className="text-2xl mb-2">{condition.icon}</div>
              <div className="text-sm font-medium">{condition.name}</div>
            </motion.button>
          )
        })}
      </div>

      {/* Selected Count & Analyze */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          {selectedConditions.length} condition{selectedConditions.length !== 1 ? 's' : ''} selected
        </p>
        <button
          onClick={onAnalyze}
          disabled={selectedConditions.length === 0 || loading}
          className={`btn-primary px-8 ${
            selectedConditions.length === 0 && 'opacity-50 cursor-not-allowed'
          }`}
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>
    </div>
  )
}