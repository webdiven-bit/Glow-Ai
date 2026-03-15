'use client';

import { Camera, ShoppingBag, Heart, Star, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProfileStatsProps {
  stats?: {
    analyses: number;
    orders: number;
    wishlist: number;
    reviews: number;
    saved: number;
  };
}

const defaultStats = {
  analyses: 12,
  orders: 8,
  wishlist: 15,
  reviews: 6,
  saved: 45500
};

export function ProfileStats({ stats = defaultStats }: ProfileStatsProps) {
  const statItems = [
    { label: 'Analyses', value: stats.analyses, icon: Camera, color: 'bg-blue-500', change: '+3' },
    { label: 'Orders', value: stats.orders, icon: ShoppingBag, color: 'bg-green-500', change: '+2' },
    { label: 'Wishlist', value: stats.wishlist, icon: Heart, color: 'bg-red-500', change: '+5' },
    { label: 'Reviews', value: stats.reviews, icon: Star, color: 'bg-yellow-500', change: '+1' },
    { label: 'Saved', value: `₦${stats.saved.toLocaleString()}`, icon: TrendingUp, color: 'bg-purple-500', change: 'This month' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
      {statItems.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all"
        >
          <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
            <stat.icon className="w-5 h-5 text-white" />
          </div>
          <p className="text-2xl font-bold">{stat.value}</p>
          <p className="text-sm text-gray-600">{stat.label}</p>
          <p className="text-xs text-green-500 mt-1">{stat.change}</p>
        </motion.div>
      ))}
    </div>
  );
}