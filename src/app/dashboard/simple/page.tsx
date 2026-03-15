'use client';

export default function SimpleDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-pink-600 mb-4">✨ Glow AI Dashboard</h1>
        <p className="text-gray-600 mb-8">Your app is working! Now we need to add the components.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Skin Analysis</h2>
            <p className="text-gray-500">Upload a photo to analyze your skin</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Shade Matcher</h2>
            <p className="text-gray-500">Find your perfect makeup shades</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Product Recommendations</h2>
            <p className="text-gray-500">Personalized skincare routine</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Streak Tracker</h2>
            <p className="text-gray-500">Track your daily skincare habits</p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            Connected to: https://huggingface.co/spaces/andevs/ewere
          </p>
        </div>
      </div>
    </div>
  );
}