'use client';

export function SkinProfileCard() {
  return (
    <div className="bg-white rounded-2xl p-6">
      <h3 className="font-semibold mb-4">Your Skin Profile</h3>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-amber-200 to-amber-400 rounded-full border-2 border-pink-500" />
        <div>
          <p className="font-medium">Medium • Warm undertone</p>
          <p className="text-sm text-gray-500">Melanin Level: 45%</p>
        </div>
      </div>
      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-600">Skin Type</p>
          <p className="font-medium">Combination</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Concerns</p>
          <div className="flex flex-wrap gap-2 mt-1">
            <span className="px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-xs">Blackheads</span>
            <span className="px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-xs">Oily T-zone</span>
          </div>
        </div>
      </div>
    </div>
  );
}