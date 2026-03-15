'use client';

import { Droplets, Zap, Sun, Activity } from 'lucide-react';

const skinMetrics = [
  { label: 'Hydration', value: 75, icon: Droplets, color: 'bg-blue-500' },
  { label: 'Oiliness', value: 45, icon: Zap, color: 'bg-yellow-500' },
  { label: 'Sensitivity', value: 30, icon: Sun, color: 'bg-orange-500' },
  { label: 'Elasticity', value: 80, icon: Activity, color: 'bg-green-500' },
];

export function SkinProfile() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-6">Your Skin Profile</h3>
      
      <div className="space-y-4">
        <div className="p-4 bg-pink-50 rounded-xl">
          <p className="text-sm text-pink-600 mb-1">Skin Type</p>
          <p className="font-semibold">Combination</p>
        </div>

        <div className="p-4 bg-purple-50 rounded-xl">
          <p className="text-sm text-purple-600 mb-1">Skin Tone</p>
          <p className="font-semibold">Medium Deep</p>
        </div>

        <div className="p-4 bg-blue-50 rounded-xl">
          <p className="text-sm text-blue-600 mb-1">Concerns</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">Hyperpigmentation</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">Oily T-Zone</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">Fine Lines</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {skinMetrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className={`w-10 h-10 ${metric.color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                <metric.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm text-gray-600">{metric.label}</p>
              <p className="font-bold">{metric.value}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}