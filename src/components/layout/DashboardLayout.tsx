'use client';

import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Camera, 
  ShoppingBag, 
  Heart, 
  User, 
  LogOut,
  Sparkles,
  Menu,
  X,
  AlertCircle,
  Package,
  Settings,
  BarChart,
  Users
} from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle hydration - only run on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Main navigation items for regular users
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { 
      name: 'Analysis', 
      href: '/dashboard/analysis', 
      icon: Camera,
      subItems: [
        { name: 'Skin Analysis', href: '/dashboard/analysis', icon: Camera },
        { name: 'Skin Conditions', href: '/dashboard/skin-conditions', icon: AlertCircle }
      ]
    },
    { name: 'Shop', href: '/dashboard/shop', icon: ShoppingBag },
    { name: 'Wishlist', href: '/dashboard/wishlist', icon: Heart },
    { name: 'Orders', href: '/dashboard/orders', icon: Package },
    { name: 'Profile', href: '/dashboard/profile', icon: User },
  ];

  // Admin-only navigation items - these will be conditionally shown
  const adminNavigation = [
    { name: 'Admin Dashboard', href: '/dashboard/admin', icon: BarChart },
    { name: 'Manage Orders', href: '/dashboard/admin/orders', icon: Package },
    { name: 'Manage Users', href: '/dashboard/admin/users', icon: Users },
    { name: 'Settings', href: '/dashboard/admin/settings', icon: Settings },
  ];

  // Check if current path is an admin page
  const isAdmin = pathname?.startsWith('/dashboard/admin');

  // Helper functions for active state detection
  const isActive = (href: string) => pathname === href;
  
  const isActiveParent = (item: any) => {
    if (item.subItems) {
      return item.subItems.some((sub: any) => pathname === sub.href);
    }
    return pathname === item.href;
  };

  // Loading skeleton during server render and initial hydration
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
        {/* Header skeleton */}
        <div className="h-16 bg-white shadow-sm animate-pulse" />
        
        {/* Main content skeleton */}
        <div className="container mx-auto px-6 py-8">
          <div className="h-8 bg-gray-200 rounded w-48 mb-8 animate-pulse" />
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* ========== MOBILE MENU BUTTON ========== */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center hover:bg-pink-50 transition-all"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* ========== DESKTOP SIDEBAR ========== */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-100 p-6 hidden lg:block overflow-y-auto shadow-xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 mb-8 group">
          <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
            Glow AI
          </span>
        </Link>

        {/* Main Navigation */}
        <nav className="space-y-1">
          {navigation.map((item) => {
            const active = isActiveParent(item);
            return (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    active 
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg' 
                      : 'text-gray-600 hover:bg-pink-50 hover:text-pink-600'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
                
                {/* Sub-items (only shown when parent is active) */}
                {item.subItems && active && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-pink-200 pl-2">
                    {item.subItems.map((sub: any) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                          pathname === sub.href
                            ? 'bg-pink-100 text-pink-700 font-medium'
                            : 'text-gray-600 hover:bg-pink-50 hover:text-pink-600'
                        }`}
                      >
                        {sub.icon && <sub.icon className="w-4 h-4" />}
                        <span>{sub.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* ========== ADMIN SECTION ========== */}
          {/* Only shown on admin pages */}
          {isAdmin && (
            <>
              <div className="my-4 border-t border-gray-200" />
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Admin
              </p>
              {adminNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive(item.href)
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-pink-50 hover:text-pink-600'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </>
          )}
        </nav>

        {/* Logout Button - Always at bottom */}
        <button className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-pink-50 hover:text-pink-600 rounded-xl transition-all w-full mt-8 group">
          <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="font-medium">Logout</span>
        </button>

        {/* Version Info */}
        <div className="absolute bottom-4 left-6 text-xs text-gray-400">
          v2.0.0
        </div>
      </aside>

      {/* ========== MOBILE SIDEBAR (Slide-out) ========== */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="fixed left-0 top-0 h-full w-64 bg-white p-6 overflow-y-auto shadow-2xl" 
            onClick={e => e.stopPropagation()}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 mb-8 group">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                Glow AI
              </span>
            </Link>

            {/* Navigation */}
            <nav className="space-y-1">
              {navigation.map((item) => {
                const active = isActiveParent(item);
                return (
                  <div key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => !item.subItems && setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        active 
                          ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg' 
                          : 'text-gray-600 hover:bg-pink-50'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                    
                    {/* Sub-items */}
                    {item.subItems && active && (
                      <div className="ml-4 mt-1 space-y-1 border-l-2 border-pink-200 pl-2">
                        {item.subItems.map((sub: any) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                              pathname === sub.href
                                ? 'bg-pink-100 text-pink-700 font-medium'
                                : 'text-gray-600 hover:bg-pink-50'
                            }`}
                          >
                            {sub.icon && <sub.icon className="w-4 h-4" />}
                            <span>{sub.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Admin section in mobile */}
              {isAdmin && (
                <>
                  <div className="my-4 border-t border-gray-200" />
                  <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Admin
                  </p>
                  {adminNavigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        isActive(item.href)
                          ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                          : 'text-gray-600 hover:bg-pink-50'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  ))}
                </>
              )}
            </nav>

            {/* Logout Button */}
            <button className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-pink-50 rounded-xl transition-all w-full mt-8">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* ========== MAIN CONTENT AREA ========== */}
      <main className="lg:ml-64 p-4 lg:p-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
