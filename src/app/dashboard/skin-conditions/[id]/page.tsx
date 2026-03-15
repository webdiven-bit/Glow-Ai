'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getConditionById } from '@/data/skin-conditions';
import { ArrowLeft, Info, ShoppingCart, Heart, Check, AlertCircle, Star, Clock, Shield, Truck } from 'lucide-react';
import { useCart } from '@/components/cart/CartProvider';
import { motion } from 'framer-motion';

export default function SkinConditionPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [condition, setCondition] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeverity, setSelectedSeverity] = useState<'mild' | 'moderate' | 'severe'>('mild');
  const [addedToCart, setAddedToCart] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'treatments' | 'prevention'>('overview');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const found = getConditionById(params.id as string);
    setCondition(found);
    setLoading(false);
  }, [params.id]);

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id || `temp-${Date.now()}`,
      name: product.name,
      brand: product.brand || 'Recommended Product',
      price: product.price || 5000,
      quantity: 1,
      image: product.image || '/images/products/placeholder.jpg'
    });
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  const handleViewProduct = (productId: string) => {
    router.push(`/dashboard/shop/product/${productId}`);
  };

  // Loading skeleton (from Doc 2 — cleaner than a spinner)
  if (!mounted || loading) {
    return (
      <DashboardLayout>
        <div className="max-w-6xl mx-auto">
          <div className="h-8 bg-gray-200 rounded w-48 mb-8 animate-pulse" />
          <div className="h-72 bg-gray-100 rounded-3xl animate-pulse mb-8" />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-14 bg-gray-100 rounded-2xl animate-pulse" />
              <div className="h-64 bg-gray-100 rounded-2xl animate-pulse" />
            </div>
            <div className="space-y-4">
              <div className="h-48 bg-gray-100 rounded-2xl animate-pulse" />
              <div className="h-48 bg-gray-100 rounded-2xl animate-pulse" />
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!condition) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto text-center py-12">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Condition not found</h2>
          <p className="text-gray-600 mb-6">The skin condition you're looking for doesn't exist.</p>
          <Link
            href="/dashboard/skin-conditions"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            Browse All Conditions
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const treatments = condition.treatments?.[selectedSeverity] || [];

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">

        {/* Back Button (from Doc 2 — cleaner inline style) */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-pink-500 mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </button>

        {/* Hero Section (from Doc 1 — richer with category badge) */}
        <div className="relative h-72 md:h-80 rounded-3xl overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500">
            <div
              className="absolute inset-0 opacity-20"
              style={{ backgroundImage: 'url("/images/pattern.png")', backgroundSize: 'cover' }}
            />
          </div>
          <div className="absolute bottom-6 left-8 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{condition.name}</h1>
            <div className="flex flex-wrap items-center gap-3">
              {condition.scientificName && (
                <span className="text-white/80 italic text-sm">{condition.scientificName}</span>
              )}
              {condition.category && (
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  condition.category === 'acne'         ? 'bg-red-500' :
                  condition.category === 'pigmentation' ? 'bg-orange-500' :
                  condition.category === 'texture'      ? 'bg-yellow-500' :
                  condition.category === 'dryness'      ? 'bg-blue-500' :
                  condition.category === 'oiliness'     ? 'bg-green-500' :
                  condition.category === 'aging'        ? 'bg-purple-500' :
                  'bg-pink-500'
                }`}>
                  {condition.category.charAt(0).toUpperCase() + condition.category.slice(1)}
                </span>
              )}
            </div>
            <p className="text-white/90 mt-3 max-w-xl text-sm leading-relaxed line-clamp-2">
              {condition.description}
            </p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Left Column ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Tabs */}
            <div className="bg-white rounded-2xl p-2 shadow-lg flex gap-2">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'treatments', label: 'Treatments' },
                { id: 'prevention', label: 'Prevention' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">

              {/* OVERVIEW */}
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold mb-4">About {condition.name}</h2>
                  <p className="text-gray-700 text-lg leading-relaxed mb-8">{condition.description}</p>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Causes */}
                    <div className="bg-pink-50 rounded-xl p-6">
                      <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <Info className="w-5 h-5 text-pink-500" />
                        Common Causes
                      </h3>
                      <ul className="space-y-3">
                        {condition.causes?.map((cause: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-5 h-5 bg-pink-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="w-2 h-2 bg-pink-600 rounded-full" />
                            </span>
                            <span className="text-gray-700">{cause}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Symptoms */}
                    <div className="bg-blue-50 rounded-xl p-6">
                      <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-blue-500" />
                        Common Symptoms
                      </h3>
                      <ul className="space-y-3">
                        {condition.symptoms?.map((symptom: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-blue-500 flex-shrink-0" />
                            <span className="text-gray-700">{symptom}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TREATMENTS */}
              {activeTab === 'treatments' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold mb-6">Treatment Options</h2>

                  {/* Severity Selector */}
                  {condition.treatments && Object.keys(condition.treatments).length > 1 && (
                    <div className="flex gap-3 mb-8">
                      {Object.keys(condition.treatments).map((severity) => (
                        <button
                          key={severity}
                          onClick={() => setSelectedSeverity(severity as any)}
                          className={`flex-1 py-3 rounded-xl font-semibold capitalize transition-all ${
                            selectedSeverity === severity
                              ? severity === 'mild'     ? 'bg-green-500 text-white shadow-lg' :
                                severity === 'moderate' ? 'bg-orange-500 text-white shadow-lg' :
                                'bg-red-500 text-white shadow-lg'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {severity}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Products */}
                  {treatments.length > 0 ? (
                    <div className="space-y-4">
                      {treatments.map((treatment: any, index: number) => (
                        <motion.div
                          key={treatment.id || index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border border-gray-100 rounded-xl p-4 hover:shadow-lg transition-all"
                        >
                          <div className="flex flex-col sm:flex-row gap-4">
                            {/* Image */}
                            <div className="w-full sm:w-24 h-24 bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center">
                              {treatment.image ? (
                                <img src={treatment.image} alt={treatment.name} className="w-full h-full object-cover" />
                              ) : (
                                <span className="text-3xl">✨</span>
                              )}
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                                <div>
                                  <p className="text-sm text-pink-500 font-medium">{treatment.brand}</p>
                                  <h3 className="font-semibold text-lg">{treatment.name}</h3>
                                  {treatment.size && (
                                    <p className="text-sm text-gray-500">{treatment.size}</p>
                                  )}
                                </div>
                                <button className="text-gray-300 hover:text-pink-500 transition-colors self-start">
                                  <Heart className="w-5 h-5" />
                                </button>
                              </div>

                              {/* Rating */}
                              {treatment.rating && (
                                <div className="flex items-center gap-1 mt-1">
                                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm">{treatment.rating}</span>
                                  {treatment.reviews && (
                                    <span className="text-sm text-gray-500">
                                      ({treatment.reviews.toLocaleString()} reviews)
                                    </span>
                                  )}
                                </div>
                              )}

                              {/* Benefits */}
                              {treatment.benefits && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {treatment.benefits.slice(0, 3).map((benefit: string, i: number) => (
                                    <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                      {benefit}
                                    </span>
                                  ))}
                                </div>
                              )}

                              {/* Price & Actions */}
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3">
                                <div>
                                  <p className="text-pink-500 font-bold text-xl">
                                    ₦{treatment.price.toLocaleString()}
                                  </p>
                                  {treatment.originalPrice && treatment.originalPrice > treatment.price && (
                                    <p className="text-gray-400 text-sm line-through">
                                      ₦{treatment.originalPrice.toLocaleString()}
                                    </p>
                                  )}
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleAddToCart(treatment)}
                                    className="flex-1 sm:flex-none px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                                  >
                                    <ShoppingCart className="w-4 h-4" />
                                    Add to Cart
                                  </button>
                                  {treatment.url && treatment.url !== '#' && (
                                    <a
                                      href={treatment.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-4 py-2 border border-pink-200 text-pink-500 rounded-xl hover:bg-pink-50 transition-all"
                                    >
                                      Buy
                                    </a>
                                  )}
                                </div>
                              </div>

                              {addedToCart === treatment.id && (
                                <p className="text-xs text-green-500 mt-2 animate-pulse">✓ Added to cart!</p>
                              )}

                              {treatment.store && (
                                <p className="text-xs text-gray-400 mt-2">Available at: {treatment.store}</p>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">
                      No treatment products listed for this severity level.
                    </p>
                  )}

                  {/* Timeline tip */}
                  <div className="mt-8 p-4 bg-purple-50 rounded-xl">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-purple-500" />
                      Treatment Timeline
                    </h4>
                    <p className="text-sm text-gray-600">
                      Results may take {condition.treatmentTime || '4-8 weeks'} to show improvement.
                      Always start with mild treatments and consult a dermatologist before trying new products.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* PREVENTION */}
              {activeTab === 'prevention' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold mb-6">Prevention Tips</h2>

                  <div className="space-y-4">
                    {condition.prevention?.map((tip: string, i: number) => (
                      <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-green-600 font-bold">{i + 1}</span>
                        </div>
                        <p className="text-gray-700">{tip}</p>
                      </div>
                    )) || <p className="text-gray-500">No prevention tips available.</p>}
                  </div>

                  {/* Daily Routine */}
                  <div className="mt-8 p-6 bg-blue-50 rounded-xl">
                    <h3 className="font-semibold text-lg mb-3">Recommended Daily Routine</h3>
                    <div className="space-y-3">
                      {[
                        'Cleanse gently twice daily',
                        'Apply treatment products as directed',
                        'Moisturize to maintain skin barrier',
                        'Always use SPF 50+ during the day'
                      ].map((step, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">
                            {i + 1}
                          </span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* ── Right Column / Sidebar ── */}
          <div className="space-y-6">

            {/* Quick Facts */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-lg mb-4">Quick Facts</h3>
              <div className="space-y-3">
                {[
                  { label: 'Prevalence',      value: condition.prevalence    || 'Common' },
                  { label: 'Affects',         value: condition.affects       || 'All ages' },
                  { label: 'Treatment Time',  value: condition.treatmentTime || '4-8 weeks' },
                  { label: 'Doctor Visit',    value: 'Recommended', highlight: true }
                ].map(({ label, value, highlight }) => (
                  <div key={label} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                    <span className="text-gray-600">{label}</span>
                    <span className={`font-medium ${highlight ? 'text-green-600' : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Where to Buy */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-lg mb-4">Where to Buy</h3>
              <div className="space-y-3">
                {[
                  { icon: '🛒', name: 'Jumia Nigeria',    sub: 'Nationwide delivery',  bg: 'bg-orange-100' },
                  { icon: '📱', name: 'Jiji.ng',          sub: 'Verified sellers',      bg: 'bg-blue-100' },
                  { icon: '💊', name: 'Local Pharmacies', sub: 'MedPlus, HealthPlus',   bg: 'bg-green-100' }
                ].map(({ icon, name, sub, bg }) => (
                  <div key={name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className={`w-10 h-10 ${bg} rounded-full flex items-center justify-center`}>
                      <span className="text-lg">{icon}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{name}</p>
                      <p className="text-xs text-gray-500">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* When to See a Doctor */}
            <div className="bg-yellow-50 rounded-2xl p-6 shadow-lg border border-yellow-200">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                When to See a Doctor
              </h3>
              <ul className="space-y-2 text-sm text-yellow-700">
                {[
                  'If symptoms persist for more than 2 weeks',
                  'If condition spreads or worsens',
                  'If you experience severe pain or discomfort',
                  'If you have signs of infection (pus, fever)'
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-4 h-4 bg-yellow-200 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust Badges */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Prices include +₦1,000 as requested</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Truck className="w-4 h-4 text-pink-500" />
                  <span>Nationwide delivery available</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-blue-500" />
                  <span>Verified Nigerian sellers</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-xl">
          <p className="text-sm text-gray-600">
            <strong>⚠️ Medical Disclaimer:</strong> The information provided is for educational purposes only
            and is not intended as medical advice. Prices are approximate as of 2025 and may vary.
            Always consult with a qualified healthcare provider or dermatologist for proper diagnosis and treatment.
          </p>
        </div>

      </div>
    </DashboardLayout>
  );
}
