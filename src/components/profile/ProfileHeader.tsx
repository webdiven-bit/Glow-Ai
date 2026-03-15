'use client';

import { Camera, User, Mail, Calendar } from 'lucide-react';
import { useState } from 'react';

interface ProfileHeaderProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  } | null;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const [profileImage, setProfileImage] = useState<string | null>(user?.avatar || null);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center overflow-hidden">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-12 h-12 text-white" />
            )}
          </div>
          <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-pink-50 transition-all">
            <Camera className="w-4 h-4 text-pink-500" />
          </button>
        </div>
        
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{user?.name || 'Sarah Johnson'}</h2>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-2">
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="w-4 h-4" />
              <span className="text-sm">{user?.email || 'sarah.j@example.com'}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Member since Jan 2026</span>
            </div>
          </div>
        </div>

        <button className="px-4 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-all">
          Edit Profile
        </button>
      </div>
    </div>
  );
}