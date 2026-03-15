import { useState } from 'react';

export function useCosmetics() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);

  const getMatches = async (skinTone: any, conditions: any[]) => {
    setLoading(true);
    try {
      // Mock response
      return {
        foundation: [
          {
            product: { id: '1', name: 'Pro Filt\'r Foundation', brand: 'Fenty Beauty' },
            best_shade: { name: '300 - Warm Beige', hexCode: 'D4B99B' },
            match_score: 95.2
          }
        ],
        lipstick: [
          {
            product: { id: '2', name: 'Watermelon Lip Stain', brand: 'House of Tara' },
            best_shade: { name: 'Watermelon Splash', hexCode: 'F4676B' },
            match_score: 88.5
          }
        ]
      };
    } finally {
      setLoading(false);
    }
  };

  const getTrending = async () => {
    return [
      { id: '1', name: 'Pro Filt\'r Foundation', brand: 'Fenty Beauty', category: 'foundation', price: 12500, rating: 4.8, imageUrl: '' },
      { id: '2', name: 'Watermelon Lip Stain', brand: 'House of Tara', category: 'lipstain', price: 3800, rating: 4.8, imageUrl: '' },
    ];
  };

  return {
    loading,
    products,
    getMatches,
    getTrending
  };
}