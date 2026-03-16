'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Search, Filter, X, ChevronRight, Star, Heart, ShoppingCart, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useCart } from '@/components/cart/CartProvider';

// ============================================
// TYPE DEFINITIONS
// ============================================
interface CosmeticProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  description: string;
  benefits: string[];
  skinTypes: string[];
  shades?: Array<{
    id: string;
    name: string;
    hex: string;
  }>;
  image: string;
  inStock: boolean;
  tags?: string[];
}

// ============================================
// MOCK DATA
// ============================================
const COSMETICS: CosmeticProduct[] = [
  {
    id: 'fnd001',
    name: 'Pro Filt\'r Soft Matte Foundation',
    brand: 'Fenty Beauty',
    category: 'foundation',
    subcategory: 'matte',
    price: 13500,
    originalPrice: 12500,
    rating: 4.8,
    reviews: 3452,
    description: 'Soft matte, long-wear foundation with 50 shades for all skin tones',
    benefits: ['Transfer-resistant', 'Buildable coverage', 'Natural matte'],
    skinTypes: ['oily', 'combination'],
    shades: [
      { id: 'shade100', name: '100 - Warm Porcelain', hex: '#F5E6D3' },
      { id: 'shade200', name: '200 - Neutral Ivory', hex: '#E8D9C2' },
      { id: 'shade300', name: '300 - Warm Beige', hex: '#D4B99B' },
      { id: 'shade400', name: '400 - Cool Tan', hex: '#B58C6F' },
      { id: 'shade500', name: '500 - Neutral Deep', hex: '#8B5A3C' },
    ],
    image: '/images/fenty-foundation.jpg',
    inStock: true,
    tags: ['bestseller', 'vegan']
  },
  {
    id: 'fnd002',
    name: 'Double Wear Foundation',
    brand: 'Estée Lauder',
    category: 'foundation',
    subcategory: 'longwear',
    price: 18500,
    originalPrice: 17500,
    rating: 4.9,
    reviews: 5678,
    description: '24-hour wear foundation with oil-free formula',
    benefits: ['24hr wear', 'Transfer-resistant', 'Natural finish'],
    skinTypes: ['all'],
    shades: [
      { id: 'shade1n1', name: '1N1 - Ivory Nude', hex: '#F5E0D0' },
      { id: 'shade2w1', name: '2W1 - Warm Vanilla', hex: '#E8C9A8' },
      { id: 'shade3c2', name: '3C2 - Cool Sand', hex: '#D4A88C' },
    ],
    image: '/images/estee-foundation.jpg',
    inStock: true,
    tags: ['luxury', 'longwear']
  },
  {
    id: 'lip001',
    name: 'Stunna Lip Paint',
    brand: 'Fenty Beauty',
    category: 'lipstick',
    subcategory: 'liquid',
    price: 9500,
    originalPrice: 8500,
    rating: 4.9,
    reviews: 2876,
    description: 'Long-wear liquid lipstick in universal shades',
    benefits: ['10-hour wear', 'Non-drying', 'Intense color'],
    skinTypes: ['all'],
    shades: [
      { id: 'unveil', name: 'Unveil', hex: '#9D2B4A' },
      { id: 'uncensored', name: 'Uncensored', hex: '#C92B3F' },
    ],
    image: '/images/stunna-lip.jpg',
    inStock: true,
    tags: ['bestseller', 'vegan']
  },
  {
    id: 'lip002',
    name: 'Rouge Dior Lipstick',
    brand: 'Dior',
    category: 'lipstick',
    subcategory: 'bullet',
    price: 16500,
    originalPrice: 15500,
    rating: 4.8,
    reviews: 1987,
    description: 'Hydrating lipstick with floral extracts',
    benefits: ['Hydrating', 'Long-wear', 'Floral scent'],
    skinTypes: ['all'],
    shades: [
      { id: '999', name: '999 - Rouge', hex: '#C92B3F' },
      { id: '080', name: '080 - Red Smile', hex: '#D45A4A' },
    ],
    image: '/images/dior-lipstick.jpg',
    inStock: true,
    tags: ['luxury']
  },
  {
    id: 'powder001',
    name: 'Loose Setting Powder',
    brand: 'Laura Mercier',
    category: 'powder',
    subcategory: 'loose',
    price: 14500,
    originalPrice: 13500,
    rating: 4.8,
    reviews: 3456,
    description: 'Translucent loose setting powder',
    benefits: ['Sets makeup', 'Blurs imperfections', 'Long-wear'],
    skinTypes: ['all'],
    image: '/images/laura-powder.jpg',
    inStock: true,
    tags: ['bestseller']
  },
  {
    id: 'blush001',
    name: 'Orgasm Blush',
    brand: 'NARS',
    category: 'blush',
    subcategory: 'powder',
    price: 14500,
    originalPrice: 13500,
    rating: 4.9,
    reviews: 9876,
    description: 'Iconic peachy-pink blush with golden shimmer',
    benefits: ['Buildable', 'Natural flush', 'Shimmer'],
    skinTypes: ['all'],
    image: '/images/nars-blush.jpg',
    inStock: true,
    tags: ['cult-favorite']
  }
];

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'foundation', name: 'Foundation' },
  { id: 'lipstick', name: 'Lipstick' },
  { id: 'lipgloss', name: 'Lip Gloss' },
  { id: 'lipstain', name: 'Lip Stain' },
  { id: 'blush', name: 'Blush' },
  { id: 'contour', name: 'Contour' },
  { id: 'eyeshadow', name: 'Eyeshadow' },
  { id: 'mascara', name: 'Mascara' },
  { id: 'eyeliner', name: 'Eyeliner' },
  { id: 'powder', name: 'Powder' },
  { id: 'concealer', name: 'Concealer' }
];

const brands = [
  { id: 'fenty', name: 'Fenty Beauty' },
  { id: 'dior', name: 'Dior' },
  { id: 'estee', name: 'Estée Lauder' },
  { id: 'laura', name: 'Laura Mercier' },
  { id: 'nars', name: 'NARS' },
  { id: 'mac', name: 'MAC' },
  { id: 'maybelline', name: 'Maybelline' },
  { id: 'nyx', name: 'NYX' },
  { id: 'rare', name: 'Rare Beauty' },
  { id: 'houseoftara', name: 'House of Tara' }
];

// ============================================
// MAIN COMPONENT
// ============================================

export default function CosmeticsPage() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [addedToCart, setAddedToCart] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { addToCart } = useCart();

  useEffect(() => {
    setMounted(true);
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist, mounted]);

  const filteredProducts = COSMETICS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    const matchesBrand = !selectedBrand || product.brand.toLowerCase().includes(selectedBrand.toLowerCase());
    
    return matchesSearch && matchesCategory && matchesBrand;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddToCart = (product: CosmeticProduct) => {
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

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedBrand(null);
    setCurrentPage(1);
  };

  if (!mounted) {
    return (
      <DashboardLayout>
        <div className="max-w-7xl mx-auto">
          <div className="h-8 bg-gray-200 rounded w-48 mb-8 animate-pulse" />
          <div className="grid md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
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
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Cosmetics</h1>
            <p className="text-gray-600 mt-1">Discover your perfect makeup match</p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden px-4 py-2 bg-white rounded-xl shadow-sm flex items-center gap-2"
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-4 shadow-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search cosmetics by name, brand, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="hidden md:flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all"
            >
              <Filter className="w-5 h-5" />
              Filters
              {(selectedCategory !== 'all' || selectedBrand) && (
                <span className="ml-1 w-5 h-5 bg-pink-500 text-white rounded-full text-xs flex items-center justify-center">
                  {(selectedCategory !== 'all' ? 1 : 0) + (selectedBrand ? 1 : 0)}
                </span>
              )}
            </button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-4 pt-4 border-t border-gray-100 overflow-hidden"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Categories */}
                  <div>
                    <h4 className="font-semibold mb-3">Categories</h4>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`px-4 py-2 rounded-xl text-sm transition-all ${
                            selectedCategory === cat.id
                              ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Brands */}
                  <div>
                    <h4 className="font-semibold mb-3">Brands</h4>
                    <div className="flex flex-wrap gap-2">
                      {brands.map(brand => (
                        <button
                          key={brand.id}
                          onClick={() => setSelectedBrand(selectedBrand === brand.id ? null : brand.id)}
                          className={`px-4 py-2 rounded-xl text-sm transition-all ${
                            selectedBrand === brand.id
                              ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {brand.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {(selectedCategory !== 'all' || selectedBrand) && (
                  <button
                    onClick={clearFilters}
                    className="mt-4 text-sm text-pink-500 hover:text-pink-600"
                  >
                    Clear all filters
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-600">
          {filteredProducts.length} products found
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl">
            <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-12 h-12 text-pink-500" />
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
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
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
                         product.category === 'blush' ? '🌸' : '✨'}
                      </span>
                    </div>
                    
                    {/* Sale Badge */}
                    {product.originalPrice && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div>
                    <div className="flex items-start justify-between mb-1">
                      <p className="text-sm text-pink-500 font-medium">{product.brand}</p>
                      {product.tags?.includes('bestseller') && (
                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                          Bestseller
                        </span>
                      )}
                    </div>
                    
                    <h3 className="font-semibold mb-1 line-clamp-2">{product.name}</h3>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{product.rating}</span>
                      <span className="text-sm text-gray-500">({product.reviews})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-3">
                      <p className="text-pink-500 font-bold text-lg">
                        ₦{product.price.toLocaleString()}
                      </p>
                      {product.originalPrice && (
                        <p className="text-gray-400 text-sm line-through">
                          ₦{product.originalPrice.toLocaleString()}
                        </p>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                    >
                      <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      Add to Cart
                    </button>
                    {addedToCart === product.id && (
                      <p className="text-xs text-green-500 mt-1 text-center animate-pulse">
                        ✓ Added to cart!
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-pink-50 disabled:opacity-50"
                >
                  <ChevronRight className="w-5 h-5 rotate-180" />
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-xl font-medium transition-all ${
                      currentPage === i + 1
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                        : 'border border-gray-200 hover:bg-pink-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-pink-50 disabled:opacity-50"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
