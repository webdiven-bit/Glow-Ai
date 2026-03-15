'use client';

import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user from localStorage or session
    const loadUser = () => {
      // For demo purposes, create a mock user
      const mockUser: User = {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah.j@example.com',
        avatar: '/images/avatars/sarah.jpg'
      };
      
      // Check if user exists in localStorage
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        // Set mock user for demo
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
      }
      
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    // Implement login logic
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user: User = {
      id: '1',
      name: 'Sarah Johnson',
      email: email
    };
    
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    setLoading(false);
    return user;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return {
    user,
    loading,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user
  };
}