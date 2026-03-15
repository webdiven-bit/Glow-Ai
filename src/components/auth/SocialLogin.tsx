'use client';

import { Chrome, Mail } from 'lucide-react';

export function SocialLogin() {
  const handleGoogleLogin = () => {
    // Mock Google login
    localStorage.setItem('glow_user', JSON.stringify({
      name: 'Google User',
      email: 'user@gmail.com',
      skinType: null,
      skinTone: null
    }));
    window.location.href = '/dashboard';
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all group"
        >
          <Chrome className="w-5 h-5 text-gray-700 group-hover:text-pink-500 transition-all" />
          <span className="text-sm font-medium text-gray-700 group-hover:text-pink-500 transition-all">
            Google
          </span>
        </button>

        <button
          onClick={() => alert('Email sign in coming soon!')}
          className="flex items-center justify-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all group"
        >
          <Mail className="w-5 h-5 text-gray-700 group-hover:text-pink-500 transition-all" />
          <span className="text-sm font-medium text-gray-700 group-hover:text-pink-500 transition-all">
            Email
          </span>
        </button>
      </div>
    </div>
  );
}