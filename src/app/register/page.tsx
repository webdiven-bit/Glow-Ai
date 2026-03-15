'use client';

import { motion } from 'framer-motion';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { SocialLogin } from '@/components/auth/SocialLogin';
import { Logo } from '@/components/ui/Logo';
import { Sparkles, Shield, Zap } from 'lucide-react';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Features */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:block space-y-8"
        >
          <Logo size="lg" />

          <div className="space-y-4">
            <h1 className="text-5xl font-bold leading-tight">
              Start Your{' '}
              <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                Glow Journey
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              Join thousands of users getting personalized skincare recommendations for Nigerian skin tones.
            </p>
          </div>

          <div className="space-y-6">
            {[
              { icon: Sparkles, text: 'AI-powered skin analysis', color: 'pink' },
              { icon: Zap, text: 'Personalized product matches', color: 'purple' },
              { icon: Shield, text: 'Safe and secure', color: 'green' }
            ].map((feature, i) => {
              const Icon = feature.icon;
              const colors = {
                pink: 'bg-pink-100 text-pink-500',
                purple: 'bg-purple-100 text-purple-500',
                green: 'bg-green-100 text-green-500'
              };
              return (
                <div key={i} className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${colors[feature.color as keyof typeof colors]} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-lg text-gray-700">{feature.text}</span>
                </div>
              );
            })}
          </div>

          {/* Testimonial */}
          <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl">
            <p className="text-gray-600 italic">
              "Glow AI helped me find the perfect foundation shade for my skin tone. No more guesswork!"
            </p>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-10 h-10 bg-pink-200 rounded-full" />
              <div>
                <p className="font-semibold">Zikora A.</p>
                <p className="text-sm text-gray-500">Verified User</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Registration Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            {/* Mobile Logo */}
            <div className="lg:hidden mb-6">
              <Logo />
            </div>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Create Account</h2>
              <p className="text-gray-600">
                Get started with your personalized skincare journey
              </p>
            </div>

            <RegisterForm />

            <div className="mt-6">
              <SocialLogin />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}