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
  Package
} from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { 
      name: 'Analysis', 
      href: '/dashboard/analysis', 
      icon: Camera,
      subItems: [
        { name: 'Skin Analysis', href: '/dashboard/analysis' },
        { name: 'Skin Conditions', href: '/dashboard/skin-conditions', icon: AlertCircle }
      ]
    },
    { name: 'Shop', href: '/dashboard/shop', icon: ShoppingBag },
    { name: 'Wishlist', href: '/dashboard/wishlist', icon: Heart },
    { name: 'Orders', href: '/dashboard/orders', icon: Package },
    { name: 'Profile', href: '/dashboard/profile', icon: User },
  ];

  // Admin-only navigation items (shown only on admin pages)
  const isAdmin = pathname?.startsWith('/dashboard/admin');
  
  const adminNavigation = [
    { name: 'Admin Dashboard', href: '/dashboard/admin', icon: Home },
    { name: 'Manage Orders', href: '/dashboard/admin/orders', icon: Package },
  ];

  // Loading skeleton during server render and initial hydration
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
        <div className="h-16 bg-white shadow-sm animate-pulse" />
        <div className="container mx-auto px-6 py-8">
          <div className="h-96 bg-gray-100 rounded-2xl animate-pulse" />
        </div>
      </div>
    );
  }

  const isActive = (href: string) => pathname === href;
  const isActiveParent = (item: any) => {
    if (item.subItems) {
      return item.subItems.some((sub: any) => pathname === sub.href);
    }
    return pathname === item.href;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar - Desktop */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-100 p-6 hidden lg:block overflow-y-auto">
        <Link href="/" className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
            Glow AI
          </span>
        </Link>

        <nav className="space-y-1">
          {/* Regular navigation */}
          {navigation.map((item) => {
            const active = isActiveParent(item);
            return (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    active 
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white' 
                      : 'text-gray-600 hover:bg-pink-50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
                
                {/* Sub-items for Analysis */}
                {item.subItems && active && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-pink-200 pl-2">
                    {item.subItems.map((sub: any) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
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

          {/* Admin section separator - only show on admin pages */}
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
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                      : 'text-gray-600 hover:bg-pink-50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </>
          )}
        </nav>

        {/* Logout Button */}
        <button className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-pink-50 rounded-xl transition-all w-full mt-8">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </aside>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setMobileMenuOpen(false)}>
          <div className="fixed left-0 top-0 h-full w-64 bg-white p-6 overflow-y-auto" onClick={e => e.stopPropagation()}>
            <Link href="/" className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                Glow AI
              </span>
            </Link>

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
                          ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white' 
                          : 'text-gray-600 hover:bg-pink-50'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                    
                    {/* Sub-items for Analysis */}
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
                          ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                          : 'text-gray-600 hover:bg-pink-50'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </>
              )}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="lg:ml-64 p-4 lg:p-8">
        {children}
      </main>
    </div>
  );
}