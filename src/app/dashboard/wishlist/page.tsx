'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { Heart, ShoppingCart, Trash2, ArrowLeft, AlertCircle } from 'lucide-react';
import { useCart } from '@/components/cart/CartProvider';
import { motion, AnimatePresence } from 'framer-motion';

interface WishlistItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  image?: string;
  rating?: number;
  inStock?: boolean;
}

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    setMounted(true);
    loadWishlist();
  }, []);

  const loadWishlist = () => {
    try {
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (error) {
      console.error('Failed to parse wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = (productId: string) => {
    setRemovingId(productId);
    
    // Add a small delay for animation
    setTimeout(() => {
      const newWishlist = wishlist.filter(item => item.id !== productId);
      setWishlist(newWishlist);
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      setRemovingId(null);
    }, 300);
  };

  const moveToCart = (item: WishlistItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      brand: item.brand,
      price: item.price,
      quantity: 1,
      image: item.image
    });
    removeFromWishlist(item.id);
  };

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.setItem('wishlist', '[]');
  };

  // Loading skeleton
  if (!mounted || loading) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto">
          <div className="h-8 bg-gray-200 rounded w-48 mb-8 animate-pulse" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (wishlist.length === 0) {
    return (
      <DashboardLayout>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center py-12"
        >
          <div className="bg-white rounded-3xl p-12 shadow-xl">
            <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-pink-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">Save items you love to your wishlist</p>
            <Link
              href="/dashboard/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:shadow-lg transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Browse Products
            </Link>
          </div>
        </motion.div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Wishlist</h1>
            <p className="text-gray-600 mt-1">{wishlist.length} items saved</p>
          </div>
          <button
            onClick={clearWishlist}
            className="px-4 py-2 text-red-500 hover:bg-red-50 rounded-xl transition-all flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        </div>

        {/* Wishlist Items */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {wishlist.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ 
                  opacity: 0, 
                  x: -100,
                  transition: { duration: 0.2 }
                }}
                className={`bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all ${
                  removingId === item.id ? 'opacity-50' : ''
                }`}
              >
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <span className="text-2xl">✨</span>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <p className="text-sm text-pink-500 font-medium">{item.brand}</p>
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        {item.rating && (
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-yellow-400">★</span>
                            <span className="text-sm">{item.rating}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-pink-500 font-bold text-xl">
                        ₦{item.price?.toLocaleString()}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => moveToCart(item)}
                        disabled={removingId === item.id}
                        className="flex-1 sm:flex-none px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Move to Cart
                      </button>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        disabled={removingId === item.id}
                        className="px-4 py-2 border border-red-200 text-red-500 rounded-xl hover:bg-red-50 transition-all flex items-center gap-2 disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Continue Shopping Link */}
        <div className="mt-8 text-center">
          <Link
            href="/dashboard/shop"
            className="inline-flex items-center gap-2 text-pink-500 hover:text-pink-600 transition-all group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Continue Shopping
          </Link>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}