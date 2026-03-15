'use client';

import { useEffect, useState } from 'react';
import { priceUpdater } from '@/lib/priceUpdater';

export default function PriceUpdaterClient() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Only run on client after mount
    if (mounted) {
      // Start auto-updating prices every 6 hours
      // Only in production to avoid unnecessary API calls
      if (process.env.NODE_ENV === 'production') {
        priceUpdater.startAutoUpdate(6);
      } else {
        // In development, you might want to run it once for testing
        console.log('🔧 Dev mode: Price updater would run here');
      }
      
      return () => {
        priceUpdater.stopAutoUpdate();
      };
    }
  }, [mounted]);

  // This component doesn't render anything visible
  return null;
}