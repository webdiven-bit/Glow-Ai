'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Camera, ShoppingBag, TrendingUp, Clock, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="h-8 bg-gray-100 rounded w-64 animate-pulse" />
          <div className="grid md:grid-cols-4 gap-6">
            {[1,2,3,4].map(i => <div key={i} className="h-32 bg-gray-100 rounded-2xl animate-pulse" />)}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Welcome back!</h1>
        
        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: Camera, label: 'Analyses', value: '12', color: 'bg-blue-500', change: '+3 this month' },
            { icon: ShoppingBag, label: 'Orders', value: '8', color: 'bg-green-500', change: '+2 this month' },
            { icon: TrendingUp, label: 'Saved', value: '₦45,500', color: 'bg-purple-500', change: 'This month' },
            { icon: Clock, label: 'Reviews', value: '6', color: 'bg-orange-500', change: '+2 this month' }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-gray-600">{stat.label}</p>
              <p className="text-xs text-green-500 mt-2">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/dashboard/analysis">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 text-white hover:shadow-xl transition-all group cursor-pointer">
                <Camera className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2">New Skin Analysis</h3>
                <p className="text-white/90 mb-4">Get personalized recommendations with AI</p>
                <div className="flex items-center gap-2 text-white/80 group-hover:gap-3 transition-all">
                  <span>Start now</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
            
            <Link href="/dashboard/shop">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group cursor-pointer">
                <ShoppingBag className="w-12 h-12 text-pink-500 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2">Shop Products</h3>
                <p className="text-gray-600 mb-4">Browse our curated collection</p>
                <div className="flex items-center gap-2 text-pink-500 group-hover:gap-3 transition-all">
                  <span>Browse now</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}