'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  Search, ShoppingCart, Star, Filter, X, 
  Heart, SlidersHorizontal, 
  Grid3X3, List, ArrowUpDown,
  Eye, Tag, Truck, Shield, Sparkles,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { useCart } from '@/components/cart/CartProvider';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { PRODUCTS, categories, brands, priceRanges } from '@/data/products';

// ============================================
// TYPE DEFINITIONS
// ============================================
interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  subcategory?: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  description?: string;
  benefits?: string[];
  image?: string;
  inStock?: boolean;
  store?: string;
  url?: string;
  tags?: string[];
  skinTones?: string[];
  undertones?: string[];
  makeupStyle?: string[];
}

// ===== FILTER FUNCTION FOR MAKEUP RECOMMENDATIONS =====
const getRecommendedProducts = (skinTone: string, undertone: string, makeupStyle: string): Product[] => {
  return PRODUCTS.filter((product: Product) => {
    // Check if product matches skin tone (if specified)
    const matchesSkinTone = !product.skinTones || product.skinTones.includes(skinTone);
    
    // Check if product matches undertone (if specified)
    const matchesUndertone = !product.undertones || product.undertones.includes(undertone);
    
    // Check if product matches makeup style
    const matchesStyle = !product.makeupStyle || product.makeupStyle.includes(makeupStyle);
    
    return matchesSkinTone && matchesUndertone && matchesStyle;
  });
};

export default function ShopPage() {
  const searchParams = useSearchParams();
  
  // Get URL parameters for makeup recommendations
  const skinToneParam = searchParams.get('skinTone');
  const undertoneParam = searchParams.get('undertone');
  const styleParam = searchParams.get('style');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [addedToCart, setAddedToCart] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;
  
  const { addToCart, totalItems } = useCart();

  // Get recommended products from URL params
  const recommendedProducts = skinToneParam && undertoneParam && styleParam
    ? getRecommendedProducts(skinToneParam, undertoneParam, styleParam)
    : [];

  // Handle hydration
  useEffect(() => {
    setMounted(true);
    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (e) {
        console.error('Failed to parse wishlist');
      }
    }
  }, []);

  // Save wishlist to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist, mounted]);

  // Filter and sort products
  const filteredProducts = PRODUCTS
    .filter((product: Product) => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Category filter
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      
      // Brand filter
      const matchesBrand = selectedBrands.length === 0 || 
        selectedBrands.includes(product.brand.toLowerCase().replace(/\s+/g, ''));
      
      // Price range filter
      let matchesPrice = true;
      if (selectedPriceRange) {
        const range = priceRanges.find(r => r.id === selectedPriceRange);
        if (range) {
          matchesPrice = product.price >= range.min && product.price < range.max;
        }
      }
      
      // In stock filter
      const inStock = product.inStock !== false;
      
      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && inStock;
    })
    .sort((a: Product, b: Product) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'newest':
          return (b.reviews || 0) - (a.reviews || 0);
        default: // popular
          return (b.reviews || 0) - (a.reviews || 0);
      }
    });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedBrands, selectedPriceRange, sortBy]);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      quantity: 1,
      image: product.image
    });
    
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleBrand = (brandId: string) => {
    setSelectedBrands(prev =>
      prev.includes(brandId)
        ? prev.filter(b => b !== brandId)
        : [...prev, brandId]
    );
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedBrands([]);
    setSelectedPriceRange(null);
    setSearchQuery('');
    setSortBy('popular');
  };

  // Don't render until after mount to prevent hydration errors
  if (!mounted) {
    return (
      <DashboardLayout>
        <div className="max-w-7xl mx-auto">
          <div className="h-8 bg-gray-200 rounded w-48 mb-8 animate-pulse" />
          <div className="grid md:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="h-64 bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header with Recommendation Banner */}
        {recommendedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 text-white"
          >
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Personalized for You</h2>
            </div>
            <p className="text-white/90 mb-4">
              Based on your {skinToneParam} skin with {undertoneParam} undertone, here are {styleParam} makeup picks:
            </p>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                {recommendedProducts.length} products found
              </span>
            </div>
          </motion.div>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Shop Products</h1>
            <p className="text-gray-600 mt-1">{filteredProducts.length} products found</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* View Toggle */}
            <div className="bg-white rounded-xl p-1 shadow-sm flex">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid' ? 'bg-pink-500 text-white' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'list' ? 'bg-pink-500 text-white' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Button */}
            <Link
              href="/dashboard/cart"
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <ShoppingCart className="w-5 h-5 text-pink-500" />
              <span className="font-semibold">{totalItems}</span>
              <span className="text-gray-600 hidden sm:inline">items</span>
            </Link>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="md:hidden px-4 py-2 bg-white rounded-xl shadow-sm flex items-center gap-2"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </button>
          </div>
        </div>

        {/* Search and Sort Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products, brands, or ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-4 pr-10 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="newest">Newest</option>
              </select>
              <ArrowUpDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>

            {/* Desktop Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`hidden md:flex items-center gap-2 px-4 py-3 rounded-xl transition-all ${
                showFilters ? 'bg-pink-500 text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Filter className="w-5 h-5" />
              Filters
              {(selectedBrands.length > 0 || selectedPriceRange) && (
                <span className="ml-1 w-5 h-5 bg-white text-pink-500 rounded-full text-xs flex items-center justify-center">
                  {selectedBrands.length + (selectedPriceRange ? 1 : 0)}
                </span>
              )}
            </button>
          </div>

          {/* Active Filters */}
          {(selectedCategory !== 'all' || selectedBrands.length > 0 || selectedPriceRange) && (
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-2">
              {selectedCategory !== 'all' && (
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm flex items-center gap-1"
                >
                  {categories.find(c => c.id === selectedCategory)?.name || selectedCategory}
                  <X className="w-3 h-3" />
                </button>
              )}
              {selectedBrands.map(brand => (
                <button
                  key={brand}
                  onClick={() => toggleBrand(brand)}
                  className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm flex items-center gap-1"
                >
                  {brands.find(b => b.id === brand)?.name || brand}
                  <X className="w-3 h-3" />
                </button>
              ))}
              {selectedPriceRange && (
                <button
                  onClick={() => setSelectedPriceRange(null)}
                  className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm flex items-center gap-1"
                >
                  {priceRanges.find(r => r.id === selectedPriceRange)?.label}
                  <X className="w-3 h-3" />
                </button>
              )}
              <button
                onClick={clearFilters}
                className="px-3 py-1 text-gray-500 hover:text-gray-700 text-sm"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 280, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="hidden md:block flex-shrink-0"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg">Filters</h3>
                    <button onClick={() => setShowFilters(false)}>
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>

                  {/* Categories */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Categories</h4>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      <button
                        onClick={() => setSelectedCategory('all')}
                        className={`w-full flex items-center justify-between p-2 rounded-lg transition-all ${
                          selectedCategory === 'all' ? 'bg-pink-50 text-pink-600' : 'hover:bg-gray-50'
                        }`}
                      >
                        <span>All Products</span>
                        <span className="text-sm text-gray-500">{PRODUCTS.length}</span>
                      </button>
                      {categories.map(category => (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`w-full flex items-center justify-between p-2 rounded-lg transition-all ${
                            selectedCategory === category.id ? 'bg-pink-50 text-pink-600' : 'hover:bg-gray-50'
                          }`}
                        >
                          <span>{category.name}</span>
                          <span className="text-sm text-gray-500">{category.count}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Brands */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Brands</h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {brands.map(brand => (
                        <label key={brand.id} className="flex items-center justify-between cursor-pointer">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={selectedBrands.includes(brand.id)}
                              onChange={() => toggleBrand(brand.id)}
                              className="rounded border-gray-300 text-pink-500 focus:ring-pink-500"
                            />
                            <span className="text-sm">{brand.name}</span>
                          </div>
                          <span className="text-sm text-gray-500">{brand.count}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Price Range</h4>
                    <div className="space-y-2">
                      {priceRanges.map(range => (
                        <label key={range.id} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="priceRange"
                            checked={selectedPriceRange === range.id}
                            onChange={() => setSelectedPriceRange(range.id)}
                            className="border-gray-300 text-pink-500 focus:ring-pink-500"
                          />
                          <span className="text-sm">{range.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Recommended Products Section */}
            {recommendedProducts.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">✨ Recommended for Your {styleParam} Look</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendedProducts.slice(0, 3).map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-4 shadow-lg border-2 border-pink-200"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-pink-500" />
                        <span className="text-xs font-medium text-pink-600">Perfect Match</span>
                      </div>
                      <div className="aspect-square bg-white rounded-xl mb-4 flex items-center justify-center">
                        <span className="text-3xl">✨</span>
                      </div>
                      <p className="text-sm text-pink-500 font-medium">{product.brand}</p>
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-pink-500 font-bold mt-2">₦{product.price?.toLocaleString()}</p>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full mt-3 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
                      >
                        Add to Cart
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* All Products */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl">
                <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-12 h-12 text-pink-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters or search query</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600"
                >
                  Clear Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              // Grid View
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts
                  .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                  .map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all group relative"
                    >
                      {/* Wishlist Button */}
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="absolute top-2 right-2 z-10 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:scale-110 transition-all"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            wishlist.includes(product.id)
                              ? 'fill-red-500 text-red-500'
                              : 'text-gray-400'
                          }`}
                        />
                      </button>

                      {/* Product Image */}
                      <div className="aspect-square bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                        <div className="w-24 h-24 bg-gradient-to-br from-pink-200 to-rose-200 rounded-full flex items-center justify-center">
                          <span className="text-4xl">
                            {product.category === 'foundation' ? '💄' :
                             product.category === 'lipstick' ? '💋' :
                             product.category === 'lipgloss' ? '✨' :
                             product.category === 'skincare' ? '🧴' : '🛍️'}
                          </span>
                        </div>
                        
                        {/* Sale Badge */}
                        {product.originalPrice && product.originalPrice > product.price && (
                          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                          </div>
                        )}

                        {/* Quick View Button */}
                        <button
                          onClick={() => setQuickViewProduct(product)}
                          className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1.5 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1"
                        >
                          <Eye className="w-4 h-4" />
                          Quick View
                        </button>
                      </div>

                      {/* Product Info */}
                      <div>
                        <div className="flex items-start justify-between mb-1">
                          <p className="text-sm text-pink-500 font-medium">{product.brand}</p>
                          {product.reviews && product.reviews > 10000 && (
                            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                              Bestseller
                            </span>
                          )}
                        </div>
                        
                        <h3 className="font-semibold mb-1 line-clamp-2">{product.name}</h3>
                        
                        {/* Rating */}
                        {product.rating && (
                          <div className="flex items-center gap-1 mb-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(product.rating)
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : i < product.rating
                                      ? 'fill-yellow-400 text-yellow-400 opacity-50'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">({product.reviews?.toLocaleString() || 0})</span>
                          </div>
                        )}

                        {/* Price */}
                        <div className="flex items-center gap-2 mb-3">
                          <p className="text-pink-500 font-bold text-lg">
                            ₦{product.price.toLocaleString()}
                          </p>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <p className="text-gray-400 text-sm line-through">
                              ₦{product.originalPrice.toLocaleString()}
                            </p>
                          )}
                        </div>

                        {/* Benefits Tags */}
                        {product.benefits && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {product.benefits.slice(0, 2).map((benefit: string, i: number) => (
                              <span
                                key={i}
                                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                              >
                                {benefit}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Add to Cart Button */}
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="w-full py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                        >
                          <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          Add to Cart
                        </button>
                        {addedToCart === product.id && (
                          <p className="text-xs text-green-500 mt-1 text-center">✓ Added to cart!</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
              </div>
            ) : (
              // List View
              <div className="space-y-4">
                {filteredProducts
                  .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                  .map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all flex gap-6"
                    >
                      <div className="w-24 h-24 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl flex-shrink-0 flex items-center justify-center">
                        <span className="text-3xl">✨</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-pink-500 font-medium">{product.brand}</p>
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-pink-500 font-bold mt-1">₦{product.price.toLocaleString()}</p>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="mt-2 px-4 py-2 bg-pink-500 text-white rounded-lg text-sm"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </motion.div>
                  ))}
              </div>
            )}

            {/* Pagination */}
            {filteredProducts.length > itemsPerPage && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-pink-50 disabled:opacity-50"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  let pageNum = i + 1;
                  if (totalPages > 5 && currentPage > 3) {
                    pageNum = currentPage - 3 + i;
                  }
                  if (pageNum <= totalPages) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-xl font-medium transition-all ${
                          currentPage === pageNum
                            ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                            : 'border border-gray-200 hover:bg-pink-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  }
                  return null;
                })}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-pink-50 disabled:opacity-50"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                
                <span className="ml-2 text-sm text-gray-500">
                  Showing {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Quick View Modal */}
        <AnimatePresence>
          {quickViewProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setQuickViewProduct(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl max-w-md w-full p-6"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex justify-end">
                  <button
                    onClick={() => setQuickViewProduct(null)}
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl">✨</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{quickViewProduct.name}</h3>
                  <p className="text-pink-500 font-medium mb-2">{quickViewProduct.brand}</p>
                  <p className="text-gray-600 text-sm mb-4">{quickViewProduct.description}</p>
                  <p className="text-pink-500 font-bold text-2xl mb-4">₦{quickViewProduct.price.toLocaleString()}</p>
                  <button
                    onClick={() => {
                      handleAddToCart(quickViewProduct);
                      setQuickViewProduct(null);
                    }}
                    className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
