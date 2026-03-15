'use client';

import { useState } from 'react';
import { X, ChevronRight, ChevronLeft, Clock, Droplets, Sun, Moon, AlertCircle } from 'lucide-react';

interface RoutineBuilderProps {
  onClose: () => void;
  onSave?: (routine: any) => void;
}

export function RoutineBuilder({ onClose, onSave }: RoutineBuilderProps) {
  const [step, setStep] = useState(1);
  const [routineData, setRoutineData] = useState({
    wakeTime: '07:00',
    sleepTime: '22:00',
    skinType: '',
    concerns: [] as string[],
    products: [] as string[],
    morningSteps: [] as string[],
    nightSteps: [] as string[]
  });

  const skinTypes = [
    { id: 'dry', name: 'Dry Skin', description: 'Tight, flaky, rough texture' },
    { id: 'oily', name: 'Oily Skin', description: 'Shiny, enlarged pores, prone to acne' },
    { id: 'combination', name: 'Combination Skin', description: 'Oily T-zone, normal/dry cheeks' },
    { id: 'normal', name: 'Normal Skin', description: 'Well-balanced, minimal issues' },
    { id: 'sensitive', name: 'Sensitive Skin', description: 'Easily irritated, redness' }
  ];

  const skinConcerns = [
    { id: 'acne', name: 'Acne', emoji: '🔴' },
    { id: 'aging', name: 'Fine Lines & Wrinkles', emoji: '⏳' },
    { id: 'pigmentation', name: 'Hyperpigmentation', emoji: '⚫' },
    { id: 'dryness', name: 'Dryness', emoji: '🏜️' },
    { id: 'oiliness', name: 'Excess Oil', emoji: '💧' },
    { id: 'pores', name: 'Large Pores', emoji: '🔍' },
    { id: 'redness', name: 'Redness', emoji: '🔴' },
    { id: 'dullness', name: 'Dullness', emoji: '🌫️' }
  ];

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Save routine
      const newRoutine = {
        morning: routineData.morningSteps.length > 0 ? routineData.morningSteps : [
          'Cleanse with gentle foaming cleanser',
          'Apply vitamin C serum',
          'Moisturize with SPF 30+'
        ],
        night: routineData.nightSteps.length > 0 ? routineData.nightSteps : [
          'Double cleanse with oil cleanser',
          'Apply treatment serum',
          'Use night cream'
        ],
        weekly: ['Exfoliate twice a week', 'Use face mask on weekends'],
        products: [
          { name: 'Gentle Cleanser', brand: 'Cerave', time: 'Morning & Night' },
          { name: 'Vitamin C Serum', brand: 'The Ordinary', time: 'Morning' },
          { name: 'SPF 50', brand: 'Neutrogena', time: 'Morning' }
        ]
      };
      
      if (onSave) {
        onSave(newRoutine);
      }
      onClose();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const toggleConcern = (concernId: string) => {
    setRoutineData(prev => ({
      ...prev,
      concerns: prev.concerns.includes(concernId)
        ? prev.concerns.filter(c => c !== concernId)
        : [...prev.concerns, concernId]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
          <div>
            <h2 className="text-2xl font-bold">Build Your Routine</h2>
            <p className="text-gray-500 text-sm mt-1">Step {step} of 4</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4">
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full transition-all ${
                  i <= step ? 'bg-gradient-to-r from-pink-500 to-rose-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Your Schedule</h3>
                  <p className="text-sm text-gray-500">Tell us about your daily routine</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Sun className="w-4 h-4 text-amber-500" />
                    What time do you usually wake up?
                  </label>
                  <input
                    type="time"
                    value={routineData.wakeTime}
                    onChange={(e) => setRoutineData({...routineData, wakeTime: e.target.value})}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Moon className="w-4 h-4 text-indigo-500" />
                    What time do you usually sleep?
                  </label>
                  <input
                    type="time"
                    value={routineData.sleepTime}
                    onChange={(e) => setRoutineData({...routineData, sleepTime: e.target.value})}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-700">
                    Your routine will be customized based on your wake and sleep times for optimal product application.
                  </p>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Droplets className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Your Skin Type</h3>
                  <p className="text-sm text-gray-500">Select your primary skin type</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {skinTypes.map(type => (
                  <button
                    key={type.id}
                    onClick={() => setRoutineData({...routineData, skinType: type.id})}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      routineData.skinType === type.id
                        ? 'border-pink-500 bg-pink-50'
                        : 'border-gray-200 hover:border-pink-200'
                    }`}
                  >
                    <p className="font-semibold">{type.name}</p>
                    <p className="text-sm text-gray-500 mt-1">{type.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Skin Concerns</h3>
                  <p className="text-sm text-gray-500">Select all that apply</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {skinConcerns.map(concern => (
                  <button
                    key={concern.id}
                    onClick={() => toggleConcern(concern.id)}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      routineData.concerns.includes(concern.id)
                        ? 'border-pink-500 bg-pink-50'
                        : 'border-gray-200 hover:border-pink-200'
                    }`}
                  >
                    <span className="text-2xl mb-2 block">{concern.emoji}</span>
                    <p className="font-semibold text-sm">{concern.name}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Review & Confirm</h3>
                  <p className="text-sm text-gray-500">Your personalized routine is ready</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 text-white">
                <h4 className="font-bold text-xl mb-4">Your Routine Summary</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Wake up at {routineData.wakeTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Moon className="w-4 h-4" />
                    <span>Sleep at {routineData.sleepTime}</span>
                  </div>
                  {routineData.skinType && (
                    <div className="flex items-center gap-2">
                      <Droplets className="w-4 h-4" />
                      <span>Skin type: {skinTypes.find(t => t.id === routineData.skinType)?.name}</span>
                    </div>
                  )}
                  {routineData.concerns.length > 0 && (
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      <span>{routineData.concerns.length} concerns selected</span>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-sm text-gray-500 text-center">
                Click "Create Routine" to generate your personalized skincare routine based on your inputs.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 flex justify-between">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all ${
              step === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          <button
            onClick={handleNext}
            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
          >
            {step === 4 ? 'Create Routine' : 'Next'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}