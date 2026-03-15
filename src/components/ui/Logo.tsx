'use client';

import Link from 'next/link';
import { Sparkles } from 'lucide-react';

interface LogoProps {
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ showText = true, size = 'md' }: LogoProps) {
  const sizes = {
    sm: {
      container: 'w-8 h-8',
      icon: 'w-4 h-4',
      text: 'text-lg'
    },
    md: {
      container: 'w-10 h-10',
      icon: 'w-5 h-5',
      text: 'text-xl'
    },
    lg: {
      container: 'w-12 h-12',
      icon: 'w-6 h-6',
      text: 'text-2xl'
    }
  };

  return (
    <Link href="/" className="flex items-center gap-3 group">
      <div className={`${sizes[size].container} bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all`}>
        <Sparkles className={`${sizes[size].icon} text-white`} />
      </div>
      {showText && (
        <span className={`${sizes[size].text} font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent`}>
          Glow AI
        </span>
      )}
    </Link>
  );
}