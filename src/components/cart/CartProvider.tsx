'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  image?: string;
  shade?: string;
  shadeHex?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, shade?: string) => void;
  updateQuantity: (id: string, quantity: number, shade?: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);

  // Handle hydration - only load from localStorage after mount
  useEffect(() => {
    setMounted(true);
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);

  // Save to localStorage whenever items change (but only after mount)
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('cart', JSON.stringify(items));
      // Dispatch event for cart updates (for other tabs/components)
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: items }));
    }
  }, [items, mounted]);

  const addToCart = (item: CartItem) => {
    setItems(currentItems => {
      // Check if item already exists (with same id and shade)
      const existingItemIndex = currentItems.findIndex(
        i => i.id === item.id && i.shade === item.shade
      );

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + (item.quantity || 1)
        };
        return updatedItems;
      }

      // Add new item
      return [...currentItems, { ...item, quantity: item.quantity || 1 }];
    });
  };

  const removeFromCart = (id: string, shade?: string) => {
    setItems(currentItems => 
      currentItems.filter(item => 
        shade ? !(item.id === id && item.shade === shade) : item.id !== id
      )
    );
  };

  const updateQuantity = (id: string, quantity: number, shade?: string) => {
    if (quantity < 1) return;
    
    setItems(currentItems =>
      currentItems.map(item =>
        (shade ? (item.id === id && item.shade === shade) : item.id === id)
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // During initial server render or before hydration, return empty context
  // This prevents hydration mismatches
  const value = {
    items: mounted ? items : [],
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems: mounted ? totalItems : 0,
    totalPrice: mounted ? totalPrice : 0
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}