'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface ShadeMatcherProps {
  skinTone: any;
  conditions: any[];
  onClose: () => void;
}

export function ShadeMatcher({ skinTone, conditions, onClose }: ShadeMatcherProps) {
  return (
    <div className="bg-white rounded-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Your Perfect Matches</h2>
          <p className="text-gray-600 mt-1">
            Based on your {skinTone?.primary_tone || 'medium'} skin
          </p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div className="border rounded-xl p-4">
          <p className="font-semibold">Foundation</p>
          <p className="text-sm text-gray-600 mt-1">Fenty Beauty Pro Filt'r - Shade 300</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">95% match</span>
            <span className="text-xs text-gray-500">Warm undertone</span>
          </div>
        </div>

        <div className="border rounded-xl p-4">
          <p className="font-semibold">Lipstick</p>
          <p className="text-sm text-gray-600 mt-1">House of Tara - Watermelon Splash</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">88% match</span>
            <span className="text-xs text-gray-500">Warm undertone</span>
          </div>
        </div>

        <div className="border rounded-xl p-4">
          <p className="font-semibold">Blush</p>
          <p className="text-sm text-gray-600 mt-1">Rare Beauty - Joy</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">92% match</span>
            <span className="text-xs text-gray-500">Warm undertone</span>
          </div>
        </div>
      </div>
    </div>
  );
}