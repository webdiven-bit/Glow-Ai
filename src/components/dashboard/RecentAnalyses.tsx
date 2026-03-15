'use client';

import Link from 'next/link';

export function RecentAnalyses() {
  const analyses = [
    { id: 1, date: '2024-02-22', conditions: ['Blackheads', 'Oily Skin'] },
    { id: 2, date: '2024-02-20', conditions: ['Dry Skin', 'Fine Lines'] },
    { id: 3, date: '2024-02-18', conditions: ['Hyperpigmentation'] },
  ];

  return (
    <div className="bg-white rounded-2xl p-6">
      <h3 className="font-semibold mb-4">Recent Analyses</h3>
      <div className="space-y-4">
        {analyses.map((analysis) => (
          <div key={analysis.id} className="border-b border-gray-100 pb-4 last:border-0">
            <p className="text-sm text-gray-500">{analysis.date}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {analysis.conditions.map((condition) => (
                <span key={condition} className="px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-xs">
                  {condition}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Link href="/dashboard/analysis" className="text-pink-500 text-sm font-medium mt-4 inline-block">
        View All Analyses →
      </Link>
    </div>
  );
}