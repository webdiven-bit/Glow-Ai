'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bell, ShoppingCart, Menu } from 'lucide-react';

export function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="h-16 bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-40">
      <div className="h-full flex items-center justify-between px-6">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Notifications */}
          <button className="p-2 hover:bg-gray-100 rounded-lg relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Cart */}
          <Link href="/dashboard/cart" className="p-2 hover:bg-gray-100 rounded-lg relative">
            <ShoppingCart className="w-5 h-5" />
          </Link>

          {/* User Avatar */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-pink-500">U</span>
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium">Test User</p>
              <p className="text-xs text-gray-500">test@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}