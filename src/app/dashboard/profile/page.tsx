'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileStats } from '@/components/profile/ProfileStats';
import { ProfileSettings } from '@/components/profile/ProfileSettings';
import { SkinProfile } from '@/components/profile/SkinProfile';
import { OrderHistory } from '@/components/profile/OrderHistory';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import { Settings, ShoppingBag, Droplets, History } from 'lucide-react';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'settings'>('profile');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: Droplets },
    { id: 'orders', label: 'Order History', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Show loading state
  if (!mounted || loading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="h-32 bg-gray-100 rounded-2xl animate-pulse" />
          <div className="h-24 bg-gray-100 rounded-2xl animate-pulse" />
          <div className="h-64 bg-gray-100 rounded-2xl animate-pulse" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ProfileHeader user={user} />
          <ProfileStats />

          {/* Tabs */}
          <div className="flex gap-2 border-b border-gray-200 mt-8 overflow-x-auto pb-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-pink-500 border-b-2 border-pink-500'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="mt-8">
            {activeTab === 'profile' && <SkinProfile />}
            {activeTab === 'orders' && <OrderHistory />}
            {activeTab === 'settings' && <ProfileSettings />}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}