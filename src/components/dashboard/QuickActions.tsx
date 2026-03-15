'use client';

import Link from 'next/link';
import { Camera, Palette, Calendar, ShoppingBag } from 'lucide-react';

export function QuickActions() {
  const actions = [
    { href: '/dashboard/analysis', icon: Camera, label: 'Scan Skin', color: 'from-pink-500 to-rose-500' },
    { href: '/dashboard/cosmetics', icon: Palette, label: 'Find Shade', color: 'from-purple-500 to-pink-500' },
    { href: '/dashboard/routine', icon: Calendar, label: 'My Routine', color: 'from-blue-500 to-cyan-500' },
    { href: '/dashboard/shop', icon: ShoppingBag, label: 'Shop', color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <Link key={action.href} href={action.href} className="block bg-white rounded-xl p-4 hover:shadow-lg transition-all">
            <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mb-3`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold">{action.label}</h3>
            <p className="text-sm text-gray-500 mt-1">Get started →</p>
          </Link>
        );
      })}
    </div>
  );
}