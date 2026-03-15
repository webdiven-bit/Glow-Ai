'use client';

import Link from 'next/link';

export function TrendingProducts() {
  const products = [
    { id: 1, name: 'Salicylic Acid Cleanser', brand: 'Cerave', price: 4500, rating: 4.7 },
    { id: 2, name: 'Niacinamide Serum 10%', brand: 'The Ordinary', price: 5200, rating: 4.8 },
    { id: 3, name: 'Vitamin C Suspension', brand: 'The Ordinary', price: 4800, rating: 4.6 },
    { id: 4, name: 'SPF 50 Sunscreen', brand: 'Neutrogena', price: 6500, rating: 4.7 }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Trending Now</h2>
        <Link href="/dashboard/shop" className="text-pink-500 hover:text-pink-600">See All</Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link key={product.id} href={`/dashboard/shop/${product.id}`} className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all">
            <div className="aspect-square bg-pink-100 flex items-center justify-center">
              <span className="text-4xl">✨</span>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-500">{product.brand}</p>
              <h3 className="font-semibold mt-1">{product.name}</h3>
              <div className="flex items-center gap-1 mt-2">
                <span>⭐</span>
                <span className="text-sm">{product.rating}</span>
              </div>
              <p className="font-bold mt-2">₦{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}