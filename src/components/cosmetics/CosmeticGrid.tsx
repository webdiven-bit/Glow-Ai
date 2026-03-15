'use client';

import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

interface CosmeticGridProps {
  products: any[];
}

export function CosmeticGrid({ products }: CosmeticGridProps) {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No products found</p>
      </div>
    );
  }

  // Mock products if none provided
  const displayProducts = products.length > 0 ? products : [
    { id: '1', name: 'Pro Filt\'r Foundation', brand: 'Fenty Beauty', category: 'foundation', price: 12500, rating: 4.8, shades: [{ hexCode: 'F5E6D3' }] },
    { id: '2', name: 'Watermelon Lip Stain', brand: 'House of Tara', category: 'lipstain', price: 3800, rating: 4.8, shades: [{ hexCode: 'F4676B' }] },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {displayProducts.map((product) => {
        const isFavorite = favorites.includes(product.id);
        const bestShade = product.shades?.[0];

        return (
          <div key={product.id} className="group relative bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all">
            <Link href={`/dashboard/shop/${product.id}`}>
              <div className="aspect-square bg-pink-100 flex items-center justify-center">
                <div 
                  className="w-full h-full"
                  style={{ backgroundColor: bestShade ? `#${bestShade.hexCode}` : '#FDF7F4' }}
                />
              </div>
            </Link>

            <div className="p-4">
              <Link href={`/dashboard/shop/${product.id}`}>
                <p className="text-sm text-gray-500">{product.brand}</p>
                <h3 className="font-semibold mt-1 line-clamp-2">{product.name}</h3>
                
                <div className="flex items-center gap-1 mt-2">
                  <span>⭐</span>
                  <span className="text-sm">{product.rating}</span>
                </div>

                <p className="font-bold mt-2">₦{product.price.toLocaleString()}</p>
              </Link>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className={`flex-1 p-2 rounded-lg border transition-colors ${
                    isFavorite 
                      ? 'bg-pink-500 border-pink-500 text-white' 
                      : 'border-gray-200 hover:border-pink-500 text-gray-600 hover:text-pink-500'
                  }`}
                >
                  <Heart className="w-4 h-4 mx-auto" />
                </button>
                <button className="flex-1 p-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
                  <ShoppingCart className="w-4 h-4 mx-auto" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}