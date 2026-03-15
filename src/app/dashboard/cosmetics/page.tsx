'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Search } from 'lucide-react';
import Image from 'next/image';

// Complete product database with Nigerian prices + transport (₦1000 added to each)
const PRODUCTS = [
  // FOUNDATIONS (with images and prices)
  { 
    id: 'f1', 
    name: 'Pro Filt\'r Soft Matte Foundation', 
    brand: 'Fenty Beauty', 
    category: 'foundation',
    price: 13500, // Original 12500 + 1000
    rating: 4.8,
    image: '/images/fenty-foundation.jpg',
    shades: [
      { name: '100 - Warm Porcelain', hex: '#F5E6D3', undertone: 'warm' },
      { name: '200 - Neutral Ivory', hex: '#E8D9C2', undertone: 'neutral' },
      { name: '300 - Warm Beige', hex: '#D4B99B', undertone: 'warm' },
      { name: '400 - Cool Tan', hex: '#B58C6F', undertone: 'cool' },
      { name: '450 - Warm Tan', hex: '#B57C58', undertone: 'warm' },
      { name: '500 - Neutral Deep', hex: '#8B5A3C', undertone: 'neutral' },
      { name: '600 - Cool Deep', hex: '#6D3F2C', undertone: 'cool' }
    ]
  },
  { 
    id: 'f2', 
    name: 'Skin Tint Foundation', 
    brand: 'Fenty Beauty', 
    category: 'foundation',
    price: 9500, // Original 8500 + 1000
    rating: 4.7,
    image: '/images/fenty-tint.jpg',
    shades: [
      { name: '1 - Fair', hex: '#F5E0C0', undertone: 'neutral' },
      { name: '3 - Light', hex: '#E8C9A8', undertone: 'warm' },
      { name: '5 - Medium', hex: '#D4A88C', undertone: 'neutral' },
      { name: '7 - Tan', hex: '#B57C58', undertone: 'warm' },
      { name: '9 - Deep', hex: '#8B5A3C', undertone: 'cool' }
    ]
  },

  // LIP PRODUCTS
  { 
    id: 'l1', 
    name: 'Stunna Lip Paint', 
    brand: 'Fenty Beauty', 
    category: 'lipstick',
    price: 9500, // Original 8500 + 1000
    rating: 4.9,
    image: '/images/stunna-lip.jpg',
    shades: [
      { name: 'Unveil', hex: '#9D2B4A', undertone: 'cool' },
      { name: 'Unlocked', hex: '#B85C3A', undertone: 'warm' },
      { name: 'Uncensored', hex: '#C92B3F', undertone: 'cool' }
    ]
  },
  { 
    id: 'l2', 
    name: 'Watermelon Lip Stain', 
    brand: 'House of Tara', 
    category: 'lipstain',
    price: 4800, // Original 3800 + 1000
    rating: 4.8,
    image: '/images/lip-stain.jpg',
    shades: [
      { name: 'Watermelon Splash', hex: '#F4676B', undertone: 'warm' },
      { name: 'Berry Bliss', hex: '#9D2B4A', undertone: 'cool' },
      { name: 'Peach Perfect', hex: '#F9AC7C', undertone: 'warm' },
      { name: 'Mauve Magic', hex: '#B784A7', undertone: 'neutral' },
      { name: 'Plum Wine', hex: '#6D2E46', undertone: 'cool' }
    ]
  },
  { 
    id: 'l3', 
    name: 'Gloss Bomb', 
    brand: 'Fenty Beauty', 
    category: 'lipgloss',
    price: 8500, // Original 7500 + 1000
    rating: 4.9,
    image: '/images/gloss-bomb.jpg',
    shades: [
      { name: 'Fenty Glow', hex: '#E8B5A0', undertone: 'warm' },
      { name: 'Fu$$y', hex: '#E7BACD', undertone: 'cool' },
      { name: 'Hot Cherry', hex: '#C93B4A', undertone: 'cool' }
    ]
  },

  // BLUSH
  { 
    id: 'b1', 
    name: 'Cream Blush', 
    brand: 'Rare Beauty', 
    category: 'blush',
    price: 9200, // Original 8200 + 1000
    rating: 4.7,
    image: '/images/cream-blush.jpg',
    shades: [
      { name: 'Happy', hex: '#F4A7A0', undertone: 'warm' },
      { name: 'Bliss', hex: '#E8A4B5', undertone: 'cool' },
      { name: 'Love', hex: '#C93B4A', undertone: 'cool' },
      { name: 'Joy', hex: '#F09B6A', undertone: 'warm' },
      { name: 'Peace', hex: '#B8858C', undertone: 'neutral' }
    ]
  },

  // SKINCARE
  { 
    id: 's1', 
    name: 'Salicylic Acid Cleanser', 
    brand: 'Cerave', 
    category: 'cleanser',
    price: 5500, // Original 4500 + 1000
    rating: 4.7,
    image: '/images/cerave-cleanser.jpg',
    benefits: ['Unclogs pores', 'Gentle exfoliation', 'Non-drying']
  },
  { 
    id: 's2', 
    name: 'Niacinamide Serum 10%', 
    brand: 'The Ordinary', 
    category: 'serum',
    price: 6200, // Original 5200 + 1000
    rating: 4.8,
    image: '/images/niacinamide.jpg',
    benefits: ['Reduces pigmentation', 'Minimizes pores', 'Controls oil']
  },
  { 
    id: 's3', 
    name: 'Vitamin C Suspension', 
    brand: 'The Ordinary', 
    category: 'serum',
    price: 5800, // Original 4800 + 1000
    rating: 4.6,
    image: '/images/vitamin-c.jpg',
    benefits: ['Brightens skin', 'Antioxidant', 'Reduces dark spots']
  },
  { 
    id: 's4', 
    name: 'Natural Moisturizing Factors', 
    brand: 'The Ordinary', 
    category: 'moisturizer',
    price: 5200, // Original 4200 + 1000
    rating: 4.5,
    image: '/images/moisturizer.jpg',
    benefits: ['Hydrates', 'Strengthens barrier', 'Lightweight']
  },
  { 
    id: 's5', 
    name: 'SPF 50 Sunscreen', 
    brand: 'Neutrogena', 
    category: 'sunscreen',
    price: 7500, // Original 6500 + 1000
    rating: 4.7,
    image: '/images/sunscreen.jpg',
    benefits: ['Broad spectrum', 'Non-greasy', 'Matte finish']
  }
];

// SKIN CONDITIONS with treatments and products
const SKIN_CONDITIONS = [
  {
    id: 'blackheads',
    name: 'Blackheads',
    description: 'Open comedones with oxidized sebum',
    severity: 'mild',
    image: '/images/blackheads.jpg',
    treatments: {
      mild: ['Salicylic Acid Cleanser - ₦5,500', 'Clay Mask - ₦4,500'],
      moderate: ['Retinoid Cream - ₦8,500', 'Professional Extraction - ₦15,000']
    },
    products: ['s1', 'b1']
  },
  {
    id: 'whiteheads',
    name: 'Whiteheads',
    description: 'Closed comedones under skin surface',
    image: '/images/whiteheads.jpg',
    treatments: {
      mild: ['Benzoyl Peroxide Gel - ₦4,500', 'Gentle Exfoliant - ₦5,200'],
      moderate: ['Retinoid Cream - ₦8,500', 'Chemical Peel - ₦12,000']
    }
  },
  {
    id: 'hyperpigmentation',
    name: 'Hyperpigmentation',
    description: 'Dark spots from inflammation or sun',
    image: '/images/pigmentation.jpg',
    treatments: {
      mild: ['Vitamin C Serum - ₦5,800', 'Niacinamide - ₦6,200'],
      moderate: ['Kojic Acid Cream - ₦7,500', 'SPF 50 - ₦7,500']
    }
  },
  {
    id: 'oily_skin',
    name: 'Oily Skin',
    description: 'Excess sebum production',
    image: '/images/oily-skin.jpg',
    treatments: {
      mild: ['Oil-Free Cleanser - ₦4,500', 'Niacinamide Serum - ₦6,200'],
      moderate: ['Salicylic Acid Toner - ₦5,500', 'Clay Mask - ₦4,500']
    }
  }
];

export default function CosmeticsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = PRODUCTS.filter(p => 
    (selectedCategory === 'all' || p.category === selectedCategory) &&
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              Cosmetics & Skincare
            </h1>
            <p className="text-gray-600 mt-2">Find your perfect match with Nigerian prices + delivery</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border-0 ring-1 ring-gray-200 focus:ring-2 focus:ring-pink-500 transition-all"
          />
        </div>

        {/* Category Buttons - Better Layout */}
        <div className="flex flex-wrap gap-3">
          {['all', 'foundation', 'lipstick', 'lipstain', 'lipgloss', 'blush', 'cleanser', 'serum', 'moisturizer', 'sunscreen'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/25'
                  : 'bg-white text-gray-700 hover:bg-pink-50 border border-gray-200'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1">
              {/* Product Image */}
              <div className="aspect-square bg-gradient-to-br from-pink-100 to-rose-100 relative group">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all" />
                {product.shades && (
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    {product.shades.slice(0, 3).map((shade, i) => (
                      <div key={i} 
                           className="w-6 h-6 rounded-full border-2 border-white shadow-lg"
                           style={{ backgroundColor: shade.hex }} />
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <p className="text-sm text-pink-500 font-medium">{product.brand}</p>
                <h3 className="text-lg font-bold mt-1">{product.name}</h3>
                
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                  ))}
                  <span className="text-sm text-gray-500 ml-2">({product.rating})</span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-pink-500">₦{product.price.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">incl. delivery</p>
                  </div>
                  <button className="px-4 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-all">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Skin Conditions Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8">Find Solutions for Your Skin Conditions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKIN_CONDITIONS.map(condition => (
              <div key={condition.id} 
                   className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer"
                   onClick={() => setSelectedCondition(condition.id === selectedCondition ? null : condition.id)}>
                
                <div className="aspect-video bg-gradient-to-br from-pink-100 to-rose-100 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white">{condition.name}</h3>
                    <p className="text-sm text-white/80">{condition.description}</p>
                  </div>
                </div>

                {selectedCondition === condition.id && (
                  <div className="p-6 space-y-4">
                    <div>
                      <p className="font-semibold text-green-600 mb-2">For Mild Cases:</p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {condition.treatments.mild.map((t, i) => (
                          <li key={i}>{t}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-orange-600 mb-2">For Moderate Cases:</p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {condition.treatments.moderate.map((t, i) => (
                          <li key={i}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
