'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { priceUpdater } from '@/lib/priceUpdater';
import { RefreshCw, CheckCircle, XCircle } from 'lucide-react';

export default function PriceAdminPage() {
  const [updating, setUpdating] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  
  const handleUpdatePrices = async () => {
    setUpdating(true);
    try {
      const response = await fetch('/api/admin/update-prices', {
        method: 'POST'
      });
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error('Failed to update prices:', error);
    } finally {
      setUpdating(false);
    }
  };
  
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Price Management</h1>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <button
            onClick={handleUpdatePrices}
            disabled={updating}
            className="px-6 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 disabled:opacity-50 flex items-center gap-2"
          >
            <RefreshCw className={`w-5 h-5 ${updating ? 'animate-spin' : ''}`} />
            {updating ? 'Updating Prices...' : 'Update All Prices'}
          </button>
        </div>
        
        {results.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Update Results</h2>
            <div className="space-y-2">
              {results.map((result, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  {result.changed ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-gray-400" />
                  )}
                  <span className="flex-1">{result.name}</span>
                  {result.changed ? (
                    <span className="text-green-600">
                      ₦{result.oldPrice.toLocaleString()} → ₦{result.newPrice.toLocaleString()}
                    </span>
                  ) : (
                    <span className="text-gray-500">No change</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}