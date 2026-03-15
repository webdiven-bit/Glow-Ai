'use client';

import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, ShoppingCart, Star, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface AnalysisResultsProps {
  results: any;
  onReset: () => void;
}

export function AnalysisResults({ results, onReset }: AnalysisResultsProps) {
  const [addedToCart, setAddedToCart] = useState<string | null>(null);

  // Handle case when results or recommendations is not an array
  const conditions = Array.isArray(results?.conditions) ? results.conditions : [];
  const recommendations = Array.isArray(results?.recommendations) ? results.recommendations : [];
  const skinTone = results?.skinTone || 'Medium';
  const skinType = results?.skinType || 'Combination';

  const handleAddToCart = (product: any) => {
    // Get existing cart
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Add new item
    cart.push({
      id: product.id || `temp-${Date.now()}`,
      name: product.name,
      brand: product.brand || 'Recommended Product',
      price: product.price || 5000,
      quantity: 1,
      image: product.image || '/images/products/placeholder.jpg'
    });
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    setAddedToCart(product.name);
    setTimeout(() => setAddedToCart(null), 2000);
    
    // Dispatch event for cart update
    window.dispatchEvent(new Event('cartUpdated'));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full mb-4">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <span className="text-green-700 font-medium">Analysis Complete</span>
        </div>
        <h2 className="text-3xl font-bold mb-2">Your Skin Analysis Results</h2>
        <p className="text-gray-600">Based on your scan, here's what we found</p>
      </div>

      {/* Skin Profile Summary */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 text-white">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-white/80 text-sm">Skin Tone</p>
            <p className="text-xl font-semibold">{skinTone}</p>
          </div>
          <div>
            <p className="text-white/80 text-sm">Skin Type</p>
            <p className="text-xl font-semibold">{skinType}</p>
          </div>
        </div>
      </div>

      {/* Detected Conditions */}
      {conditions.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-4">Detected Conditions</h3>
          <div className="grid gap-4">
            {conditions.map((condition: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    {condition.severity === 'mild' ? (
                      <AlertCircle className="w-6 h-6 text-green-500" />
                    ) : condition.severity === 'moderate' ? (
                      <AlertCircle className="w-6 h-6 text-orange-500" />
                    ) : (
                      <AlertCircle className="w-6 h-6 text-red-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold text-lg">{condition.name}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        condition.severity === 'mild' ? 'bg-green-100 text-green-700' :
                        condition.severity === 'moderate' ? 'bg-orange-100 text-orange-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {condition.severity}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-1">{condition.description}</p>
                    <Link 
                      href={`/dashboard/skin-conditions/${condition.id}`}
                      className="text-pink-500 text-sm mt-2 inline-block hover:underline"
                    >
                      Learn more & see treatments →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Products */}
      {recommendations.length > 0 ? (
        <div>
          <h3 className="text-xl font-bold mb-4">Recommended Products</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {recommendations.map((product: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-pink-100 rounded-xl overflow-hidden flex-shrink-0">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-pink-200 to-rose-200 flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-pink-500" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-pink-500 font-medium">{product.brand || 'Recommended'}</p>
                    <h4 className="font-semibold">{product.name}</h4>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{product.rating || 4.5}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-pink-500 font-bold">₦{(product.price || 5000).toLocaleString()}</p>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="px-3 py-1 bg-pink-500 text-white text-sm rounded-lg hover:bg-pink-600 transition-all flex items-center gap-1"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add
                      </button>
                    </div>
                    {addedToCart === product.name && (
                      <p className="text-xs text-green-500 mt-1">✓ Added to cart!</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-8 text-center">
          <p className="text-gray-500">No product recommendations available</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onReset}
          className="flex-1 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all"
        >
          New Analysis
        </button>
        <Link
          href="/dashboard/shop"
          className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:shadow-lg transition-all text-center"
        >
          Shop All Products
        </Link>
      </div>
    </div>
  );
}