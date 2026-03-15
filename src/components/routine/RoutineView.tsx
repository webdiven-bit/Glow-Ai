'use client';

import { Clock, Sun, Moon, Droplets, Sparkles, CheckCircle } from 'lucide-react';

interface RoutineViewProps {
  routine: any;
}

export function RoutineView({ routine }: RoutineViewProps) {
  // Mock routine if none provided
  const displayRoutine = routine || {
    morning: [
      'Cleanse with gentle foaming cleanser',
      'Apply vitamin C serum',
      'Moisturize with SPF 30+',
      'Apply eye cream'
    ],
    night: [
      'Double cleanse with oil cleanser',
      'Apply toner',
      'Apply retinol serum',
      'Use night cream',
      'Apply eye cream'
    ],
    weekly: [
      'Exfoliate with AHA/BHA (Tuesday, Friday)',
      'Use clay mask (Saturday)',
      'Apply hydrating mask (Sunday)'
    ],
    products: [
      { name: 'Gentle Foaming Cleanser', brand: 'Cerave', time: 'Morning & Night' },
      { name: 'Vitamin C Serum', brand: 'The Ordinary', time: 'Morning' },
      { name: 'SPF 50 Sunscreen', brand: 'Neutrogena', time: 'Morning' },
      { name: 'Retinol Serum', brand: 'The Ordinary', time: 'Night' },
      { name: 'Night Cream', brand: 'Cerave', time: 'Night' }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Morning Routine */}
      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center">
            <Sun className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Morning Routine</h3>
            <p className="text-sm text-gray-500">Start your day fresh</p>
          </div>
          <div className="ml-auto bg-amber-100 text-amber-600 px-3 py-1 rounded-full text-sm font-medium">
            5-10 mins
          </div>
        </div>

        <div className="space-y-4">
          {displayRoutine.morning.map((step: string, i: number) => (
            <div key={i} className="flex items-start gap-4 group">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-amber-200 transition-all">
                <span className="text-amber-600 font-semibold">{i + 1}</span>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 group-hover:text-gray-900 transition-all">{step}</p>
                {i === 2 && (
                  <p className="text-xs text-amber-500 mt-1">✨ Most important step for protection</p>
                )}
              </div>
              <CheckCircle className="w-5 h-5 text-gray-300 group-hover:text-green-500 transition-all" />
            </div>
          ))}
        </div>
      </div>

      {/* Night Routine */}
      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center">
            <Moon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Night Routine</h3>
            <p className="text-sm text-gray-500">Repair and regenerate while you sleep</p>
          </div>
          <div className="ml-auto bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium">
            10-15 mins
          </div>
        </div>

        <div className="space-y-4">
          {displayRoutine.night.map((step: string, i: number) => (
            <div key={i} className="flex items-start gap-4 group">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-200 transition-all">
                <span className="text-indigo-600 font-semibold">{i + 1}</span>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 group-hover:text-gray-900 transition-all">{step}</p>
                {i === 2 && (
                  <p className="text-xs text-purple-500 mt-1">✨ Cell renewal happens at night</p>
                )}
              </div>
              <CheckCircle className="w-5 h-5 text-gray-300 group-hover:text-green-500 transition-all" />
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Treatments */}
      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Weekly Treatments</h3>
            <p className="text-sm text-gray-500">Extra care for glowing skin</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {displayRoutine.weekly.map((treatment: string, i: number) => (
            <div key={i} className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 font-semibold">{i + 1}</span>
                </div>
                <p className="text-sm text-gray-700">{treatment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Products */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-xl flex items-center justify-center">
            <Droplets className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Products in Your Routine</h3>
            <p className="text-sm text-gray-500">Click to shop</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayRoutine.products.map((product: any, i: number) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-pink-50 transition-all cursor-pointer group">
              <div className="w-16 h-16 bg-pink-100 rounded-lg overflow-hidden flex-shrink-0">
                <div className="w-full h-full bg-gradient-to-br from-pink-200 to-rose-200" />
              </div>
              <div className="flex-1">
                <p className="font-semibold group-hover:text-pink-500 transition-all">{product.name}</p>
                <p className="text-sm text-gray-500">{product.brand}</p>
                <p className="text-xs text-pink-500 mt-1">{product.time}</p>
              </div>
              <Clock className="w-5 h-5 text-gray-400 group-hover:text-pink-500 transition-all" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}