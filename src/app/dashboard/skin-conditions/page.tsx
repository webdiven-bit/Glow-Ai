'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { SKIN_CONDITIONS, categories, getTotalConditions } from '@/data/skin-conditions';
import Link from 'next/link';
import { Search, ChevronRight, Filter, X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SkinConditionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mounted, setMounted] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredConditions = SKIN_CONDITIONS.filter(condition => {
    const matchesSearch = condition.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         condition.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         condition.symptoms.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || condition.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      acne: 'bg-red-100 text-red-700 border-red-200',
      pigmentation: 'bg-orange-100 text-orange-700 border-orange-200',
      texture: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      dryness: 'bg-blue-100 text-blue-700 border-blue-200',
      oiliness: 'bg-green-100 text-green-700 border-green-200',
      aging: 'bg-purple-100 text-purple-700 border-purple-200',
      scars: 'bg-pink-100 text-pink-700 border-pink-200',
      sun: 'bg-amber-100 text-amber-700 border-amber-200',
      hair: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      scalp: 'bg-cyan-100 text-cyan-700 border-cyan-200',
    };
    return colors[category] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getCategoryName = (category: string) => {
    const names: { [key: string]: string } = {
      acne: 'Acne & Pimples',
      pigmentation: 'Dark Marks & Pigmentation',
      texture: 'Texture & Bumps',
      dryness: 'Dry & Sensitive Skin',
      oiliness: 'Oily Skin & Shine',
      aging: 'Aging & Firmness',
      scars: 'Marks & Scars',
      sun: 'Sun & Environmental',
      hair: 'Razor & Hair-Related',
      scalp: 'Scalp & Body',
    };
    return names[category] || category;
  };

  if (!mounted) {
    return (
      <DashboardLayout>
        <div className="max-w-7xl mx-auto">
          <div className="h-8 bg-gray-200 rounded w-64 mb-8 animate-pulse" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="h-48 bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-2">
            Skin Conditions
          </h1>
          <p className="text-gray-600">
            Browse {getTotalConditions()} common skin conditions and find recommended treatments
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-lg mb-8">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search conditions, symptoms, or treatments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-3 rounded-xl transition-all flex items-center gap-2 ${
                showFilters ? 'bg-pink-500 text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Filter className="w-5 h-5" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>

          {/* Category Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-4 pt-4 border-t border-gray-100 overflow-hidden"
              >
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-4 py-2 rounded-xl transition-all ${
                      selectedCategory === 'all'
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All Conditions ({getTotalConditions()})
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-4 py-2 rounded-xl transition-all ${
                        selectedCategory === cat.id
                          ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {cat.name} ({cat.count})
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-600">
          Showing {filteredConditions.length} conditions
        </div>

        {/* Conditions Grid */}
        {filteredConditions.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl">
            <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No conditions found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredConditions.map((condition, index) => (
              <motion.div
                key={condition.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/dashboard/skin-conditions/${condition.id}`}>
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group cursor-pointer h-full flex flex-col">
                    {/* Category Badge */}
                    <div className="flex items-start justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(condition.category)}`}>
                        {getCategoryName(condition.category)}
                      </span>
                      {condition.scientificName && (
                        <span className="text-xs text-gray-400 italic">
                          {condition.scientificName}
                        </span>
                      )}
                    </div>

                    {/* Condition Name */}
                    <h3 className="text-xl font-bold mb-2 group-hover:text-pink-500 transition-colors">
                      {condition.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {condition.description}
                    </p>

                    {/* Key Symptoms */}
                    <div className="mb-4 flex-1">
                      <div className="flex flex-wrap gap-1">
                        {condition.symptoms.slice(0, 3).map((symptom, i) => (
                          <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            {symptom}
                          </span>
                        ))}
                        {condition.symptoms.length > 3 && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            +{condition.symptoms.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Treatment Count & Link */}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                      <span className="text-sm text-pink-500 font-medium">
                        {condition.treatments.mild.length + condition.treatments.moderate.length} treatments
                      </span>
                      <span className="text-pink-500 group-hover:translate-x-1 transition-transform">
                        <ChevronRight className="w-5 h-5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}