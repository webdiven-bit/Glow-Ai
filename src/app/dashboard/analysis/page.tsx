'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Camera, Upload, Sparkles, X, AlertCircle, ChevronRight, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useCart } from '@/components/cart/CartProvider';
import { getConditionById } from '@/data/skin-conditions';
import { getMakeupProductsByPreferences } from '@/data/makeup-products';

// Function to analyze image and return different results based on image properties (FALLBACK)
const analyzeImage = (imageData: string) => {
  // This simulates AI analysis by creating a unique hash from the image data
  // Different images will get completely different results
  
  // Create a more varied hash from the image data
  let hash = 0;
  const data = imageData.slice(0, 500); // Use first 500 chars for speed
  
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 7) - hash) + char; // Using 7 instead of 5 for more variation
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Add more variation by using different parts of the string
  let hash2 = 0;
  for (let i = data.length - 1; i >= Math.max(0, data.length - 300); i--) {
    hash2 = ((hash2 << 9) - hash2) + data.charCodeAt(i);
    hash2 = hash2 & hash2;
  }
  
  // Combine hashes for more uniqueness
  const combinedHash = Math.abs(hash ^ hash2);
  
  // Use different seeds for different properties
  const seed1 = combinedHash;
  const seed2 = (combinedHash * 9301 + 49297) % 233280;
  const seed3 = (combinedHash * 49297 + 9301) % 233280;
  const seed4 = (combinedHash * 233280 + 9301) % 49297;
  
  // Expanded lists for more variety
  const skinTones = [
    'fair', 'fair', 'fair', 
    'light', 'light', 'light',
    'medium', 'medium', 'medium', 
    'tan', 'tan', 'tan',
    'deep', 'deep', 'deep',
    'olive', 'porcelain', 'ivory', 
    'honey', 'caramel', 'cocoa', 'ebony'
  ];
  
  const undertones = [
    'warm', 'warm', 'warm',
    'cool', 'cool', 'cool',
    'neutral', 'neutral', 'neutral',
    'olive', 'peachy', 'rosy', 
    'golden', 'red', 'yellow', 'pink'
  ];
  
  const allConditions = [
    // Acne & Pimples
    { id: 'blackheads', name: 'Blackheads', baseConfidence: 75 },
    { id: 'whiteheads', name: 'Whiteheads', baseConfidence: 72 },
    { id: 'papules', name: 'Papules', baseConfidence: 70 },
    { id: 'pustules', name: 'Pustules', baseConfidence: 73 },
    { id: 'cystic-acne', name: 'Cystic Acne', baseConfidence: 68 },
    { id: 'hormonal-acne', name: 'Hormonal Acne', baseConfidence: 76 },
    { id: 'fungal-acne', name: 'Fungal Acne', baseConfidence: 71 },
    { id: 'nodular-acne', name: 'Nodular Acne', baseConfidence: 66 },
    { id: 'acne-mechanica', name: 'Acne Mechanica', baseConfidence: 69 },
    { id: 'back-acne', name: 'Back Acne', baseConfidence: 74 },
    { id: 'acne-rosacea', name: 'Acne Rosacea', baseConfidence: 70 },
    { id: 'closed-comedones', name: 'Closed Comedones', baseConfidence: 71 },
    { id: 'open-comedones', name: 'Open Comedones', baseConfidence: 73 },
    { id: 'acne-scars', name: 'Acne Scars', baseConfidence: 65 },
    
    // Pigmentation
    { id: 'hyperpigmentation', name: 'Hyperpigmentation', baseConfidence: 82 },
    { id: 'melasma', name: 'Melasma', baseConfidence: 78 },
    { id: 'pih', name: 'Post-Inflammatory Hyperpigmentation', baseConfidence: 80 },
    { id: 'sun-spots', name: 'Sun Spots', baseConfidence: 77 },
    { id: 'age-spots', name: 'Age Spots', baseConfidence: 76 },
    { id: 'freckles', name: 'Freckles', baseConfidence: 85 },
    { id: 'dark-underarms', name: 'Dark Underarms', baseConfidence: 79 },
    { id: 'dark-knees', name: 'Dark Knees', baseConfidence: 78 },
    { id: 'dark-elbows', name: 'Dark Elbows', baseConfidence: 78 },
    { id: 'dark-inner-thighs', name: 'Dark Inner Thighs', baseConfidence: 75 },
    { id: 'perioral-hyperpigmentation', name: 'Perioral Hyperpigmentation', baseConfidence: 74 },
    { id: 'acanthosis-nigricans', name: 'Acanthosis Nigricans', baseConfidence: 72 },
    
    // Texture & Bumps
    { id: 'keratosis-pilaris', name: 'Keratosis Pilaris', baseConfidence: 76 },
    { id: 'enlarged-pores', name: 'Enlarged Pores', baseConfidence: 79 },
    { id: 'sebaceous-filaments', name: 'Sebaceous Filaments', baseConfidence: 77 },
    { id: 'milia', name: 'Milia', baseConfidence: 74 },
    { id: 'skin-tags', name: 'Skin Tags', baseConfidence: 70 },
    { id: 'seborrheic-keratosis', name: 'Seborrheic Keratosis', baseConfidence: 68 },
    { id: 'xanthelasma', name: 'Xanthelasma', baseConfidence: 66 },
    { id: 'syringoma', name: 'Syringoma', baseConfidence: 65 },
    { id: 'dermatofibroma', name: 'Dermatofibroma', baseConfidence: 64 },
    
    // Dry & Sensitive
    { id: 'dry-skin', name: 'Dry Skin', baseConfidence: 80 },
    { id: 'dehydrated-skin', name: 'Dehydrated Skin', baseConfidence: 78 },
    { id: 'eczema', name: 'Eczema', baseConfidence: 75 },
    { id: 'contact-dermatitis', name: 'Contact Dermatitis', baseConfidence: 72 },
    { id: 'sensitive-skin', name: 'Sensitive Skin', baseConfidence: 77 },
    { id: 'perioral-dermatitis', name: 'Perioral Dermatitis', baseConfidence: 71 },
    { id: 'seborrheic-dermatitis', name: 'Seborrheic Dermatitis', baseConfidence: 76 },
    { id: 'psoriasis', name: 'Psoriasis', baseConfidence: 73 },
    { id: 'rosacea', name: 'Rosacea', baseConfidence: 74 },
    
    // Oily & Combination
    { id: 'oily-skin', name: 'Oily Skin', baseConfidence: 82 },
    { id: 'combination-skin', name: 'Combination Skin', baseConfidence: 80 },
    { id: 'seborrhea', name: 'Seborrhea', baseConfidence: 76 },
    { id: 'oily-t-zone', name: 'Oily T-Zone', baseConfidence: 79 },
    { id: 'oily-cheeks', name: 'Oily Cheeks', baseConfidence: 74 },
    { id: 'oily-chin', name: 'Oily Chin', baseConfidence: 75 },
    { id: 'oily-forehead', name: 'Oily Forehead', baseConfidence: 77 },
    { id: 'oily-nose', name: 'Oily Nose', baseConfidence: 78 },
    
    // Aging & Firmness
    { id: 'fine-lines', name: 'Fine Lines', baseConfidence: 78 },
    { id: 'wrinkles', name: 'Wrinkles', baseConfidence: 76 },
    { id: 'crow-feet', name: 'Crow\'s Feet', baseConfidence: 75 },
    { id: 'forehead-lines', name: 'Forehead Lines', baseConfidence: 74 },
    { id: 'smile-lines', name: 'Smile Lines', baseConfidence: 73 },
    { id: 'marionette-lines', name: 'Marionette Lines', baseConfidence: 72 },
    { id: 'loss-of-elasticity', name: 'Loss of Elasticity', baseConfidence: 71 },
    { id: 'sagging-skin', name: 'Sagging Skin', baseConfidence: 70 },
    { id: 'jowls', name: 'Jowls', baseConfidence: 69 },
    { id: 'dull-skin', name: 'Dull Skin', baseConfidence: 77 },
    
    // Marks & Scars
    { id: 'stretch-marks', name: 'Stretch Marks', baseConfidence: 75 },
    { id: 'keloid-scars', name: 'Keloid Scars', baseConfidence: 72 },
    { id: 'surgical-scars', name: 'Surgical Scars', baseConfidence: 70 },
    { id: 'acne-scars-icepick', name: 'Ice Pick Scars', baseConfidence: 68 },
    { id: 'acne-scars-boxcar', name: 'Boxcar Scars', baseConfidence: 67 },
    { id: 'acne-scars-rolling', name: 'Rolling Scars', baseConfidence: 66 },
    { id: 'burn-scars', name: 'Burn Scars', baseConfidence: 65 },
    { id: 'chickenpox-scars', name: 'Chickenpox Scars', baseConfidence: 64 },
    
    // Sun & Environmental
    { id: 'sunburn', name: 'Sunburn', baseConfidence: 79 },
    { id: 'sun-damage', name: 'Sun Damage', baseConfidence: 77 },
    { id: 'photoaging', name: 'Photoaging', baseConfidence: 75 },
    { id: 'solar-keratosis', name: 'Solar Keratosis', baseConfidence: 72 },
    { id: 'poikiloderma', name: 'Poikiloderma', baseConfidence: 70 },
    
    // Razor & Hair-Related
    { id: 'razor-bumps', name: 'Razor Bumps', baseConfidence: 78 },
    { id: 'ingrown-hairs', name: 'Ingrown Hairs', baseConfidence: 77 },
    { id: 'pseudofolliculitis', name: 'Pseudofolliculitis', baseConfidence: 76 },
    { id: 'folliculitis', name: 'Folliculitis', baseConfidence: 74 },
    { id: 'shaving-irritation', name: 'Shaving Irritation', baseConfidence: 75 },
    
    // Scalp & Body
    { id: 'dandruff', name: 'Dandruff', baseConfidence: 81 },
    { id: 'seborrheic-dermatitis-scalp', name: 'Scalp Seborrheic Dermatitis', baseConfidence: 78 },
    { id: 'psoriasis-scalp', name: 'Scalp Psoriasis', baseConfidence: 75 },
    { id: 'heat-rash', name: 'Heat Rash', baseConfidence: 79 },
    { id: 'tinea-versicolor', name: 'Tinea Versicolor', baseConfidence: 76 },
    { id: 'keratosis-pilaris-body', name: 'Body Keratosis Pilaris', baseConfidence: 74 }
  ];
  
  // Select skin tone based on seed1
  const skinToneIndex = Math.abs(seed1) % skinTones.length;
  const skinTone = skinTones[skinToneIndex];
  
  // Select undertone based on seed2
  const undertoneIndex = Math.abs(seed2) % undertones.length;
  const undertone = undertones[undertoneIndex];
  
  // Select 3-5 random conditions based on different seeds
  const numConditions = 3 + (Math.abs(seed3) % 3); // 3-5 conditions
  const selectedConditions = new Set();
  const conditions = [];
  
  // Use a different seed for each condition selection
  let conditionSeed = seed4;
  for (let i = 0; i < numConditions * 3 && conditions.length < numConditions; i++) {
    conditionSeed = (conditionSeed * 9301 + 49297) % 233280;
    const conditionIndex = conditionSeed % allConditions.length;
    const condition = { ...allConditions[conditionIndex] };
    
    // Only add if not already selected
    if (!selectedConditions.has(condition.id)) {
      selectedConditions.add(condition.id);
      
      // Add variation to confidence based on multiple seeds
      const confidenceSeed = (conditionSeed * 9301 + 49297) % 233280;
      const confidenceVariation = (confidenceSeed % 20) - 5; // -5 to +14
      condition.confidence = Math.min(98, Math.max(60, condition.baseConfidence + confidenceVariation));
      
      conditions.push({
        id: condition.id,
        name: condition.name,
        confidence: Math.round(condition.confidence)
      });
    }
  }
  
  // If we don't have enough conditions, add some defaults
  if (conditions.length < 3) {
    const defaults = [
      { id: 'hyperpigmentation', name: 'Hyperpigmentation', confidence: 85 },
      { id: 'fine-lines', name: 'Fine Lines', confidence: 78 },
      { id: 'enlarged-pores', name: 'Enlarged Pores', confidence: 82 }
    ];
    
    while (conditions.length < 3) {
      const defaultCondition = defaults[conditions.length % defaults.length];
      if (!selectedConditions.has(defaultCondition.id)) {
        selectedConditions.add(defaultCondition.id);
        conditions.push({ ...defaultCondition });
      }
    }
  }
  
  return {
    skinTone,
    undertone,
    conditions: conditions.slice(0, 4) // Max 4 conditions
  };
};

// Category display config
const CATEGORY_CONFIG: Record<string, { label: string; bg: string }> = {
  foundation: { label: 'Foundation',  bg: 'bg-pink-50' },
  lipstick:   { label: 'Lipstick',    bg: 'bg-rose-50' },
  lipgloss:   { label: 'Lip Gloss',   bg: 'bg-orange-50' },
  blush:      { label: 'Blush',       bg: 'bg-pink-50' },
  eyeshadow:  { label: 'Eyeshadow',   bg: 'bg-purple-50' },
  contour:    { label: 'Contour',     bg: 'bg-amber-50' }
};

const MAKEUP_STYLE_CONFIG = {
  soft:    { label: 'Soft Makeup',    active: 'bg-gradient-to-r from-pink-400 to-pink-500' },
  clean:   { label: 'Clean Makeup',   active: 'bg-gradient-to-r from-green-400 to-teal-500' },
  popping: { label: 'Popping Makeup', active: 'bg-gradient-to-r from-purple-500 to-pink-500' }
};

export default function AnalysisPage() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<'upload' | 'analyzing' | 'results'>('upload');
  const [results, setResults] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [selectedMakeupStyle, setSelectedMakeupStyle] = useState<'soft' | 'clean' | 'popping'>('soft');
  const [addedToCart, setAddedToCart] = useState<string | null>(null);

  const { addToCart } = useCart();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (step === 'analyzing' && mounted) {
      const interval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 95) { clearInterval(interval); return 95; }
          return prev + 5;
        });
      }, 200);
      return () => clearInterval(interval);
    } else {
      setAnalysisProgress(0);
    }
  }, [step, mounted]);

  const handleAddToCart = (product: any) => {
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

  // Image compression function
  const compressImage = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Max dimensions
          const MAX_WIDTH = 1024;
          const MAX_HEIGHT = 1024;
          
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          canvas.toBlob((blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now()
              });
              resolve(compressedFile);
            } else {
              reject(new Error('Compression failed'));
            }
          }, 'image/jpeg', 0.8); // 80% quality
        };
        img.onerror = () => reject(new Error('Failed to load image'));
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
    });
  };

  // Updated processFile with compression
  const processFile = async (file: File) => {
    // Check file size (10MB max)
    if (file.size > 10 * 1024 * 1024) { 
      setError('File too large. Maximum size is 10MB.'); 
      return; 
    }
    
    // Check file type
    if (!file.type.startsWith('image/')) { 
      setError('Please upload an image file.'); 
      return; 
    }
    
    try {
      let fileToProcess = file;
      
      // Compress image if too large (>5MB)
      if (file.size > 5 * 1024 * 1024) {
        fileToProcess = await compressImage(file);
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result as string;
        setSelectedImage(imageData);
        setError(null);
        startAnalysis(imageData);
      };
      reader.readAsDataURL(fileToProcess);
      
    } catch (error) {
      console.error('Error processing image:', error);
      setError('Failed to process image. Please try again.');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  // Real API integration with fallback
  const startAnalysis = async (imageData: string) => {
    setStep('analyzing');
    setError(null);
    
    try {
      // Convert base64 to file
      const base64Data = imageData.split(',')[1];
      const blob = await fetch(imageData).then(res => res.blob());
      const file = new File([blob], 'skin-image.jpg', { type: 'image/jpeg' });
      
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await fetch('/api/analyze-skin-real', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Analysis failed');
      }
      
      const realResults = await response.json();
      
      // Validate the results have the expected structure
      if (!realResults.skinTone || !realResults.undertone || !realResults.conditions) {
        throw new Error('Invalid response format from API');
      }
      
      setResults(realResults);
      setStep('results');
      
    } catch (error) {
      console.error('Analysis failed:', error);
      setError('AI analysis unavailable. Using demo results instead.');
      
      // Fallback to demo results after a short delay
      setTimeout(() => {
        try {
          const demoResults = analyzeImage(imageData);
          setResults(demoResults);
          setStep('results');
        } catch (demoError) {
          console.error('Demo analysis also failed:', demoError);
          setError('Unable to analyze image. Please try again.');
          setStep('upload');
        }
      }, 1500);
    }
  };

  const resetAnalysis = () => {
    setStep('upload');
    setSelectedImage(null);
    setResults(null);
    setError(null);
    setAnalysisProgress(0);
  };

  // Loading skeleton
  if (!mounted) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-32 h-32 bg-pink-100 rounded-full mx-auto mb-4 animate-pulse" />
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto animate-pulse" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-pink-100 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span className="text-pink-700 font-medium">AI-Powered Analysis</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-4">
            AI Skin Analysis
          </h1>
          <p className="text-xl text-gray-600">
            Upload a selfie and our AI will analyze your skin and recommend makeup
          </p>
        </div>

        {/* Error Banner */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl"
            >
              <p className="text-yellow-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {error}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── UPLOAD STEP ── */}
        {step === 'upload' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 shadow-xl"
          >
            {/* Drop Zone */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
                dragActive ? 'border-pink-500 bg-pink-50' : 'border-gray-200 hover:border-pink-500'
              }`}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer block">
                <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Camera className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Upload your photo</h3>
                <p className="text-gray-500 mb-4">Drag and drop or click to choose a photo</p>
                <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:shadow-lg transition-all inline-flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Choose Photo
                </button>
              </label>
              <p className="text-sm text-gray-400 mt-4">Supports: JPG, PNG (max 10MB, will compress if needed)</p>
            </div>

            {/* Tips */}
            <div className="mt-8 grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Camera className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-1">Photo Tips</h4>
                    <ul className="text-sm text-blue-600 space-y-1">
                      <li>• Use natural lighting</li>
                      <li>• Remove makeup if possible</li>
                      <li>• Look directly at the camera</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-700 mb-1">What We Analyze</h4>
                    <ul className="text-sm text-purple-600 space-y-1">
                      <li>• Skin type and texture</li>
                      <li>• Skin tone and undertone</li>
                      <li>• Makeup recommendations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── ANALYZING STEP ── */}
        {step === 'analyzing' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-3xl p-12 text-center shadow-xl"
          >
            {/* Spinner */}
            <div className="relative w-32 h-32 mx-auto mb-8">
              <div className="absolute inset-0 border-4 border-pink-200 rounded-full" />
              <div className="absolute inset-0 border-4 border-pink-500 rounded-full border-t-transparent animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Camera className="w-12 h-12 text-pink-500" />
              </div>
            </div>

            <h3 className="text-2xl font-semibold mb-2">Analyzing your skin...</h3>
            <p className="text-gray-500 mb-8">This will take just a moment</p>

            {/* Progress Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span>{analysisProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div
                  className="bg-gradient-to-r from-pink-500 to-rose-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${analysisProgress}%` }}
                />
              </div>
            </div>

            {/* Step Indicators */}
            <div className="max-w-md mx-auto space-y-4">
              {[
                'Analyzing skin type...',
                'Detecting skin tone...',
                'Identifying undertone...',
                'Generating makeup recommendations...'
              ].map((stepText, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${
                    analysisProgress > (i + 1) * 25
                      ? 'border-pink-500 bg-pink-500'
                      : 'border-pink-200'
                  }`}>
                    {analysisProgress > (i + 1) * 25 && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className={analysisProgress > (i + 1) * 25 ? 'text-gray-900' : 'text-gray-400'}>
                    {stepText}
                  </span>
                </div>
              ))}
            </div>

            {/* Preview + Cancel */}
            {selectedImage && (
              <div className="mt-8 max-w-xs mx-auto relative">
                <img src={selectedImage} alt="Uploaded" className="rounded-2xl shadow-lg" />
                <button
                  onClick={resetAnalysis}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* ── RESULTS STEP ── */}
        {step === 'results' && results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Results Hero */}
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-2">Your Analysis Results</h2>
              <p className="text-white/90">
                {results.skinTone.charAt(0).toUpperCase() + results.skinTone.slice(1)} skin tone
                with {results.undertone} undertone
              </p>
            </div>

            {/* Detected Conditions */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-4">Detected Skin Conditions</h3>
              <div className="space-y-3">
                {results.conditions.map((condition: any) => (
                  <Link
                    key={condition.id}
                    href={`/dashboard/skin-conditions/${condition.id}`}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-pink-50 transition-all group"
                  >
                    <div>
                      <p className="font-semibold">{condition.name}</p>
                      <p className="text-sm text-gray-500">{condition.confidence}% confidence</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-pink-500 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Makeup Recommendations */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-4">💄 Makeup Recommendations for You</h3>

              {/* Style Selector */}
              <div className="flex gap-2 mb-6">
                {(Object.entries(MAKEUP_STYLE_CONFIG) as [string, { label: string; active: string }][]).map(([style, config]) => (
                  <button
                    key={style}
                    onClick={() => setSelectedMakeupStyle(style as any)}
                    className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                      selectedMakeupStyle === style
                        ? `${config.active} text-white shadow-lg`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {config.label}
                  </button>
                ))}
              </div>

              {/* Products Grid */}
              {(() => {
                const recommended = getMakeupProductsByPreferences(
                  results.skinTone,
                  results.undertone,
                  selectedMakeupStyle
                );

                const grouped = Object.fromEntries(
                  Object.keys(CATEGORY_CONFIG).map(cat => [
                    cat,
                    recommended.filter(p => p.category === cat)
                  ])
                );

                const hasAny = Object.values(grouped).some(arr => arr.length > 0);

                if (!hasAny) {
                  return (
                    <div className="p-4 bg-gray-50 rounded-xl text-center">
                      <p className="text-gray-500">No specific products found for your selection. Try a different style!</p>
                    </div>
                  );
                }

                return (
                  <div className="space-y-4">
                    {Object.entries(grouped).map(([cat, products]) =>
                      products.length > 0 && (
                        <div key={cat} className={`p-4 rounded-xl ${CATEGORY_CONFIG[cat].bg}`}>
                          <h4 className="font-semibold mb-3">{CATEGORY_CONFIG[cat].label}</h4>
                          {products.slice(0, 2).map((product: any) => (
                            <div key={product.id} className="mb-3 last:mb-0">
                              <p className="text-gray-700 font-medium">{product.name}</p>
                              {product.description && (
                                <p className="text-sm text-gray-600">{product.description}</p>
                              )}
                              <div className="flex items-center justify-between mt-2 gap-2">
                                <span className="text-pink-500 font-bold">₦{product.price.toLocaleString()}</span>
                                <button
                                  onClick={() => handleAddToCart(product)}
                                  className="text-sm bg-pink-500 text-white px-3 py-1.5 rounded-lg hover:bg-pink-600 flex items-center gap-1 transition-colors"
                                >
                                  <ShoppingCart className="w-4 h-4" />
                                  Add to Cart
                                </button>
                              </div>
                              {addedToCart === product.id && (
                                <p className="text-xs text-green-500 mt-1 animate-pulse">✓ Added to cart!</p>
                              )}
                            </div>
                          ))}
                        </div>
                      )
                    )}

                    {/* Shop All CTA */}
                    <Link
                      href={`/dashboard/shop?skinTone=${results.skinTone}&undertone=${results.undertone}&style=${selectedMakeupStyle}`}
                      className="block text-center mt-4 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
                    >
                      Shop All {MAKEUP_STYLE_CONFIG[selectedMakeupStyle].label}
                    </Link>
                  </div>
                );
              })()}
            </div>

            {/* Learn More — Related Conditions */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-4">Learn More About Your Skin</h3>
              <div className="grid gap-3">
                {results.conditions.map((condition: any) => {
                  const full = getConditionById(condition.id);
                  return full ? (
                    <Link
                      key={condition.id}
                      href={`/dashboard/skin-conditions/${condition.id}`}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-pink-50 transition-all group"
                    >
                      <div>
                        <p className="font-semibold">{full.name}</p>
                        <p className="text-sm text-gray-500">{full.description.substring(0, 60)}...</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-pink-500 group-hover:translate-x-1 transition-all" />
                    </Link>
                  ) : null;
                })}
              </div>
            </div>

            {/* New Analysis */}
            <button
              onClick={resetAnalysis}
              className="w-full py-4 border-2 border-pink-200 text-pink-500 rounded-xl hover:bg-pink-50 transition-all font-semibold"
            >
              New Analysis
            </button>
          </motion.div>
        )}

      </div>
    </DashboardLayout>
  );
}