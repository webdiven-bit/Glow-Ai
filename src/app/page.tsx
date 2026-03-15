'use client';

import Link from 'next/link';
import { Sparkles, Camera, ShoppingBag, Star, ChevronRight, Award, Users, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md fixed w-full z-50 border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                Glow AI
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/login" className="px-4 py-2 text-gray-600 hover:text-gray-900">
                Login
              </Link>
              <Link href="/register" className="px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:shadow-lg">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-pink-100 px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-pink-500" />
                <span className="text-pink-700 font-medium">AI-Powered Skin Analysis</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Your Personal{' '}
                <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                  AI Skincare
                </span>{' '}
                Assistant
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Get personalized skincare analysis, product recommendations, and shop curated products for your unique skin needs. 
                Our AI analyzes your skin in seconds!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/dashboard/analysis" 
                  className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:shadow-lg flex items-center justify-center gap-2 group"
                >
                  Get Started Now
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/dashboard/shop" 
                  className="px-8 py-4 border border-gray-200 rounded-xl hover:bg-gray-50 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Browse Products
                </Link>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 mt-8">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="font-bold">50K+</p>
                    <p className="text-sm text-gray-500">Happy Users</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-bold">98%</p>
                    <p className="text-sm text-gray-500">Accuracy</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="font-bold">100%</p>
                    <p className="text-sm text-gray-500">Secure</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-8 text-white">
                <Camera className="w-20 h-20 mb-6" />
                <h3 className="text-3xl font-bold mb-3">AI Skin Analysis</h3>
                <p className="text-lg mb-6 text-white/90">Upload a selfie and get instant analysis of:</p>
                <ul className="space-y-3">
                  {[
                    'Skin type (oily, dry, combination)',
                    'Skin concerns (acne, dark spots, wrinkles)',
                    'Personalized product recommendations',
                    'Skincare routine suggestions'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-2 mt-8 bg-white/20 rounded-full px-4 py-2 w-fit">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">4.9/5</span>
                  <span className="text-white/80">from 10k+ reviews</span>
                </div>
              </div>
              
              {/* Floating Cards */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl"
              >
                <p className="text-sm font-semibold">Today's Analysis</p>
                <p className="text-2xl font-bold text-pink-500">1,234</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 text-center mb-12">Get your personalized analysis in 3 simple steps</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                icon: Camera,
                title: 'Upload Photo',
                description: 'Take a clear selfie in natural light'
              },
              {
                step: '02',
                icon: Sparkles,
                title: 'AI Analysis',
                description: 'Our AI analyzes your skin concerns'
              },
              {
                step: '03',
                icon: ShoppingBag,
                title: 'Get Recommendations',
                description: 'Receive personalized product suggestions'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-center relative"
              >
                <div className="text-6xl font-bold text-pink-100 mb-4">{item.step}</div>
                <div className="w-20 h-20 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-10 h-10 text-pink-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/dashboard/analysis"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:shadow-lg"
            >
              Start Your Analysis
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Glow AI</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Camera,
                title: 'Advanced AI Technology',
                description: 'Powered by machine learning for accurate skin analysis'
              },
              {
                icon: ShoppingBag,
                title: 'Curated Products',
                description: 'Personalized recommendations from top brands'
              },
              {
                icon: Star,
                title: 'Expert Formulations',
                description: 'Products recommended by dermatologists'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-pink-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-rose-500">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Your Skincare?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have discovered their perfect skincare routine with Glow AI
          </p>
          <Link
            href="/dashboard/analysis"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-pink-500 rounded-xl hover:shadow-xl font-semibold"
          >
            Get Started Free
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}