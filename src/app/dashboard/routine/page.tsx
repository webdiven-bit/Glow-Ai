'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { RoutineBuilder } from '@/components/routine/RoutineBuilder';
import { RoutineView } from '@/components/routine/RoutineView';
import { useRoutine } from '@/hooks/useRoutine';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Sparkles, Calendar, Clock, ChevronRight, Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function RoutinePage() {
  const [showBuilder, setShowBuilder] = useState(false);
  const { loading, currentRoutine, routines, createRoutine, deleteRoutine } = useRoutine();

  const handleSaveRoutine = (newRoutine: any) => {
    createRoutine(newRoutine);
    setShowBuilder(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              My Skincare Routine
            </h1>
            <p className="text-gray-600 mt-2">
              {currentRoutine 
                ? 'Your personalized daily skincare routine' 
                : 'Create a personalized routine based on your skin type and concerns'}
            </p>
          </div>
          
          {!currentRoutine && (
            <button
              onClick={() => setShowBuilder(true)}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold hover:shadow-xl transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Build Your Routine
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500" />
          </div>
        ) : currentRoutine ? (
          <>
            {/* Active Routine Banner */}
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20" />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Your Active Routine</h2>
                    <p className="text-white/80">Created just for you based on your profile</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowBuilder(true)}
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl transition-all flex items-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => deleteRoutine(currentRoutine.id)}
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl transition-all flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              </div>
            </div>

            {/* Routine View */}
            <RoutineView routine={currentRoutine} />

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mb-3">
                  <Clock className="w-5 h-5 text-amber-500" />
                </div>
                <p className="text-2xl font-bold">15-20</p>
                <p className="text-sm text-gray-500">Minutes daily</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-3">
                  <Calendar className="w-5 h-5 text-purple-500" />
                </div>
                <p className="text-2xl font-bold">7</p>
                <p className="text-sm text-gray-500">Products used</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mb-3">
                  <Sparkles className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-gray-500">Weekly treatments</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center mb-3">
                  <ChevronRight className="w-5 h-5 text-pink-500" />
                </div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-gray-500">Day streak</p>
              </div>
            </div>
          </>
        ) : (
          // Empty State
          <div className="bg-white rounded-3xl p-12 text-center">
            <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-12 h-12 text-pink-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Routine Yet</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Create a personalized skincare routine based on your skin type, concerns, and daily schedule.
            </p>
            <button
              onClick={() => setShowBuilder(true)}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold hover:shadow-xl transition-all inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Build Your Routine Now
            </button>
          </div>
        )}

        {/* Previous Routines */}
        {routines.length > 1 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Previous Routines</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {routines.filter(r => r.id !== currentRoutine?.id).map(routine => (
                <Link
                  key={routine.id}
                  href={`/dashboard/routine/${routine.id}`}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">
                        Created {new Date(routine.createdAt).toLocaleDateString()}
                      </p>
                      <p className="font-semibold mt-2">Routine with {routine.products.length} products</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-pink-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Routine Builder Modal */}
      <AnimatePresence>
        {showBuilder && (
          <RoutineBuilder 
            onClose={() => setShowBuilder(false)}
            onSave={handleSaveRoutine}
          />
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
