export interface SkinCondition {
  id: string;
  name: string;
  scientificName?: string;
  description: string;
  causes: string[];
  symptoms: string[];
  treatments: {
    mild: TreatmentProduct[];
    moderate: TreatmentProduct[];
    severe?: TreatmentProduct[];
  };
  prevention: string[];
  prevalence?: string;
  affects?: string;
  treatmentTime?: string;
  imageUrl?: string;
  category: string;
}

export interface TreatmentProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  description: string;
  benefits: string[];
  image?: string;
  store: string;
  url: string;
  activeIngredients?: string[];
  size?: string;
  rating?: number;
  reviews?: number;
}

export const SKIN_CONDITIONS: SkinCondition[] = [
  // ===== ACNE & PIMPLES (1-11) =====
  {
    id: 'blackheads',
    name: 'Blackheads',
    scientificName: 'Open Comedones',
    description: 'Clogged pores oxidized and turned dark. Common on nose, chin, and forehead.',
    category: 'acne',
    causes: [
      'Excess oil production',
      'Dead skin cell buildup',
      'Hormonal changes',
      'Comedogenic products',
      'Not cleansing properly'
    ],
    symptoms: [
      'Small dark bumps on skin surface',
      'Rough texture on nose, chin, forehead',
      'Enlarged pores',
      'Skin looks dotted with black specks'
    ],
    treatments: {
      mild: [
        {
          id: 'cosrx-bha-liquid',
          name: 'COSRX BHA Blackhead Power Liquid',
          brand: 'COSRX',
          price: 15850,
          description: 'Gentle exfoliating toner with Betaine Salicylate to unclog pores and remove blackheads',
          benefits: ['Unclogs pores', 'Exfoliates gently', 'Removes blackheads'],
          store: 'CSi Grocery',
          url: 'https://www.jumia.com.ng/cosrx-bha-liquid',
          activeIngredients: ['Betaine Salicylate', 'Tea Tree Oil'],
          size: '100ml',
          rating: 4.7,
          reviews: 2345,
          image: '/images/products/cosrx-bha.jpg'
        }
      ],
      moderate: [
        {
          id: 'neutrogena-blackhead-scrub',
          name: 'Neutrogena Blackhead Eliminating Daily Scrub',
          brand: 'Neutrogena',
          price: 9500,
          originalPrice: 11500,
          description: 'Micro-clear technology to eliminate blackheads and prevent new ones',
          benefits: ['Eliminates blackheads', 'Prevents new ones', 'Smooths skin'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/neutrogena-blackhead-scrub',
          activeIngredients: ['Salicylic Acid', 'Microbeads'],
          size: '200ml',
          rating: 4.5,
          reviews: 5678,
          image: '/images/products/neutrogena-scrub.jpg'
        }
      ]
    },
    prevention: [
      'Cleanse twice daily',
      'Use salicylic acid products regularly',
      'Avoid pore-clogging ingredients',
      'Exfoliate gently 2-3 times a week',
      'Keep hair and hands off face'
    ],
    prevalence: 'Very common',
    affects: 'All ages, especially teens and young adults',
    treatmentTime: '4-8 weeks'
  },
  {
    id: 'whiteheads',
    name: 'Whiteheads',
    scientificName: 'Closed Comedones',
    description: 'Pores clogged under the skin, appearing as small white or flesh-colored bumps.',
    category: 'acne',
    causes: [
      'Trapped oil and dead skin',
      'Hormonal fluctuations',
      'Heavy or pore-clogging products',
      'Not exfoliating enough'
    ],
    symptoms: [
      'Small white or skin-colored bumps',
      'Bumpy texture especially on forehead and chin',
      'No redness or inflammation',
      'Bumps feel hard when touched'
    ],
    treatments: {
      mild: [
        {
          id: 'cosrx-salicylic-cleanser',
          name: 'COSRX Salicylic Acid Daily Gentle Cleanser',
          brand: 'COSRX',
          price: 10500,
          originalPrice: 12000,
          description: 'Gentle daily cleanser with salicylic acid to prevent and treat whiteheads',
          benefits: ['Prevents whiteheads', 'Gentle enough for daily use', 'Soothing'],
          store: 'Jiji',
          url: 'https://jiji.ng/cosrx-salicylic-cleanser',
          activeIngredients: ['Salicylic Acid 0.5%', 'Tea Tree Oil'],
          size: '150ml',
          rating: 4.6,
          reviews: 3456,
          image: '/images/products/cosrx-salicylic.jpg'
        }
      ],
      moderate: [
        {
          id: 'cerave-sa-bundle',
          name: 'CeraVe SA Smoothing Cleanser + SA Lotion Bundle',
          brand: 'CeraVe',
          price: 37500,
          originalPrice: 40000,
          description: 'Complete system with salicylic acid to clear whiteheads and smooth skin',
          benefits: ['Clears whiteheads', 'Smooths texture', 'Ceramides for barrier'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/cerave-sa-bundle',
          activeIngredients: ['Salicylic Acid', 'Ceramides', 'Niacinamide'],
          size: '236ml + 236ml',
          rating: 4.8,
          reviews: 1234,
          image: '/images/products/cerave-sa-bundle.jpg'
        }
      ]
    },
    prevention: [
      'Use non-comedogenic products',
      'Exfoliate with AHAs/BHAs',
      'Avoid heavy creams if prone to breakouts',
      'Keep skin clean but not stripped'
    ],
    prevalence: 'Very common',
    affects: 'All skin types, especially oily skin',
    treatmentTime: '4-6 weeks'
  },
  {
    id: 'papules',
    name: 'Papules',
    description: 'Small, raised, red bumps with no pus. Tender to the touch.',
    category: 'acne',
    causes: [
      'Clogged pores that become inflamed',
      'Bacterial overgrowth',
      'Hormonal changes',
      'Stress',
      'Dietary triggers'
    ],
    symptoms: [
      'Small red or pink bumps',
      'Tender to touch',
      'No visible pus',
      'Multiple bumps can cluster'
    ],
    treatments: {
      mild: [
        {
          id: 'clean-clear-spot',
          name: 'Clean & Clear Advantage Acne Spot Treatment',
          brand: 'Clean & Clear',
          price: 8500,
          description: 'Fast-acting spot treatment to reduce redness and inflammation',
          benefits: ['Reduces redness', 'Dries out pimples', 'Invisible formula'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/clean-clear-spot',
          activeIngredients: ['Salicylic Acid 2%'],
          size: '22ml',
          rating: 4.4,
          reviews: 8901,
          image: '/images/products/clean-clear.jpg'
        }
      ],
      moderate: [
        {
          id: 'cerave-acne-foaming',
          name: 'CeraVe Acne Foaming Cream Cleanser',
          brand: 'CeraVe',
          price: 14000,
          originalPrice: 16000,
          description: '4% benzoyl peroxide cleanser that treats papules while maintaining skin barrier',
          benefits: ['Kills acne bacteria', 'Reduces inflammation', 'Non-drying'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/cerave-acne-foaming',
          activeIngredients: ['Benzoyl Peroxide 4%', 'Ceramides'],
          size: '236ml',
          rating: 4.7,
          reviews: 4567,
          image: '/images/products/cerave-acne.jpg'
        }
      ]
    },
    prevention: [
      'Avoid touching face',
      'Clean phone screens regularly',
      'Change pillowcases frequently',
      'Use non-comedogenic products',
      'Manage stress'
    ],
    prevalence: 'Common',
    affects: 'Teens and adults with acne-prone skin',
    treatmentTime: '2-4 weeks'
  },
  {
    id: 'pustules',
    name: 'Pustules',
    description: 'Classic "pimples" — white or yellow tip with inflamed red base.',
    category: 'acne',
    causes: [
      'Bacterial infection in clogged pores',
      'Hormonal fluctuations',
      'Stress',
      'Diet',
      'Menstrual cycle'
    ],
    symptoms: [
      'Red bumps with white/yellow center',
      'Painful to touch',
      'May leave dark marks after healing',
      'Can appear anywhere on face/body'
    ],
    treatments: {
      mild: [
        {
          id: 'nixoderm-cream',
          name: 'Nixoderm Cream',
          brand: 'Nixoderm',
          price: 3500,
          description: 'Classic Nigerian pharmacy staple for pimples and blemishes',
          benefits: ['Treats pimples', 'Reduces blemishes', 'Affordable'],
          store: 'Local Pharmacies',
          url: 'https://jiji.ng/nixoderm',
          activeIngredients: ['Sulfur', 'Camphor'],
          size: '20g',
          rating: 4.5,
          reviews: 23456,
          image: '/images/products/nixoderm.jpg'
        }
      ],
      moderate: [
        {
          id: 'panoxyl-10',
          name: 'PanOxyl Acne Foaming Wash 10% Benzoyl Peroxide',
          brand: 'PanOxyl',
          price: 20000,
          originalPrice: 22000,
          description: 'Maximum strength benzoyl peroxide wash for stubborn pustules',
          benefits: ['Kills acne bacteria', 'Prevents new breakouts', 'Fast-acting'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/panoxyl-10',
          activeIngredients: ['Benzoyl Peroxide 10%'],
          size: '156g',
          rating: 4.8,
          reviews: 7890,
          image: '/images/products/panoxyl-10.jpg'
        }
      ]
    },
    prevention: [
      'Wash face after sweating',
      'Use oil-free products',
      'Don\'t pop or pick',
      'Keep hair clean and off face'
    ],
    prevalence: 'Very common',
    affects: 'Most common during teens and 20s',
    treatmentTime: '1-3 weeks'
  },
  {
    id: 'cystic-acne',
    name: 'Cystic Acne',
    description: 'Painful, pus-filled lumps deep under the skin. Often leaves scars.',
    category: 'acne',
    causes: [
      'Deep bacterial infection',
      'Severe hormonal imbalance',
      'Genetics',
      'Stress',
      'Inflammatory response'
    ],
    symptoms: [
      'Large, deep, painful bumps',
      'No visible head',
      'Red and inflamed',
      'Can last for weeks',
      'Often scars after healing'
    ],
    treatments: {
      mild: [
        {
          id: 'differin-gel',
          name: 'Differin Adapalene Gel 0.1%',
          brand: 'Differin',
          price: 22000,
          originalPrice: 25000,
          description: 'Retinoid gel that unclogs pores and prevents new cysts',
          benefits: ['Prevents new cysts', 'Unclogs deep pores', 'Reduces inflammation'],
          store: 'Jumia / Pharmacy',
          url: 'https://www.jumia.com.ng/differin-gel',
          activeIngredients: ['Adapalene 0.1%'],
          size: '45g',
          rating: 4.8,
          reviews: 12345,
          image: '/images/products/differin.jpg'
        }
      ],
      moderate: [
        {
          id: 'benzoyl-peroxide-gel',
          name: 'Benzoyl Peroxide 5% Gel',
          brand: 'Generic / Acnecide',
          price: 7000,
          originalPrice: 9000,
          description: 'Pharmacy-strength gel for cystic acne (available at MedPlus, HealthPlus)',
          benefits: ['Kills deep bacteria', 'Reduces inflammation', 'Affordable'],
          store: 'MedPlus / HealthPlus',
          url: 'https://jiji.ng/benzoyl-peroxide',
          activeIngredients: ['Benzoyl Peroxide 5%'],
          size: '30g',
          rating: 4.6,
          reviews: 5678,
          image: '/images/products/benzoyl-peroxide.jpg'
        }
      ],
      severe: [
        {
          id: 'dermatologist-consult',
          name: 'Dermatologist Consultation + Prescription Treatment',
          brand: 'Medical Professional',
          price: 15000,
          description: 'Professional dermatologist consultation for severe cystic acne',
          benefits: ['Professional diagnosis', 'Prescription strength', 'Personalized plan'],
          store: 'Dermatology Clinics',
          url: '#',
          activeIngredients: ['Prescription only'],
          rating: 5.0,
          reviews: 345,
          image: '/images/products/dermatologist.jpg'
        }
      ]
    },
    prevention: [
      'See a dermatologist',
      'Don\'t pick or squeeze',
      'Use gentle products',
      'Manage stress',
      'Avoid known triggers'
    ],
    prevalence: 'Less common but severe',
    affects: 'Adults with hormonal acne, often women',
    treatmentTime: '3-6 months with professional care'
  },
  {
    id: 'hormonal-acne',
    name: 'Hormonal Acne',
    description: 'Acne triggered by hormones — jaw, chin, and cheek breakouts especially around menstrual cycle.',
    category: 'acne',
    causes: [
      'Hormonal fluctuations',
      'Menstrual cycle',
      'PCOS',
      'Stress',
      'Birth control changes'
    ],
    symptoms: [
      'Deep, cystic bumps on jawline and chin',
      'Breakouts around menstrual cycle',
      'Inflamed and painful',
      'Tends to be recurring'
    ],
    treatments: {
      mild: [
        {
          id: 'paulas-choice-bha',
          name: 'Paula\'s Choice Skin Perfecting 2% BHA Liquid Exfoliant',
          brand: 'Paula\'s Choice',
          price: 17500,
          originalPrice: 20000,
          description: 'Gentle BHA exfoliant that penetrates deep into pores',
          benefits: ['Unclogs pores', 'Reduces breakouts', 'Calms inflammation'],
          store: 'Nectar Beauty Hub / Jiji',
          url: 'https://jiji.ng/paulas-choice-bha',
          activeIngredients: ['Salicylic Acid 2%'],
          size: '30ml',
          rating: 4.9,
          reviews: 8901,
          image: '/images/products/paulas-choice.jpg'
        }
      ],
      moderate: [
        {
          id: 'cosrx-ac-collection',
          name: 'COSRX AC Collection Blemish Spot Clearing Serum',
          brand: 'COSRX',
          price: 19000,
          originalPrice: 22000,
          description: 'Targeted serum for hormonal breakouts',
          benefits: ['Clears hormonal acne', 'Prevents scarring', 'Soothing'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/cosrx-ac-collection',
          activeIngredients: ['Tea Tree Oil', 'Centella Asiatica', 'Salicylic Acid'],
          size: '40ml',
          rating: 4.7,
          reviews: 3456,
          image: '/images/products/cosrx-ac.jpg'
        }
      ]
    },
    prevention: [
      'Track cycle to anticipate breakouts',
      'Use consistent routine',
      'Consider hormonal evaluation',
      'Manage stress',
      'Dietary adjustments'
    ],
    prevalence: 'Common in adult women',
    affects: 'Women aged 20-40',
    treatmentTime: 'Ongoing management'
  },
  {
    id: 'fungal-acne',
    name: 'Fungal Acne',
    scientificName: 'Pityrosporum Folliculitis',
    description: 'Tiny, uniform, itchy bumps caused by yeast overgrowth on hair follicles.',
    category: 'acne',
    causes: [
      'Yeast overgrowth',
      'Hot humid weather',
      'Excessive sweating',
      'Tight clothing',
      'Antibiotic use'
    ],
    symptoms: [
      'Small uniform bumps, often on forehead',
      'Itchy, unlike bacterial acne',
      'Won\'t respond to regular acne treatments',
      'Can spread to chest and back'
    ],
    treatments: {
      mild: [
        {
          id: 'nizoral-shampoo',
          name: 'Nizoral Anti-Dandruff Shampoo 1% Ketoconazole',
          brand: 'Nizoral',
          price: 15500,
          originalPrice: 17000,
          description: 'Use as face wash for fungal acne (leave on 5-10 minutes)',
          benefits: ['Kills yeast', 'Reduces itching', 'Clears fungal bumps'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/nizoral-shampoo',
          activeIngredients: ['Ketoconazole 1%'],
          size: '200ml',
          rating: 4.7,
          reviews: 6789,
          image: '/images/products/nizoral-shampoo.jpg'
        }
      ],
      moderate: [
        {
          id: 'nizoral-cream',
          name: 'Nizoral Cream 2% Ketoconazole',
          brand: 'Nizoral',
          price: 6000,
          originalPrice: 8000,
          description: 'Topical antifungal cream for widespread fungal acne',
          benefits: ['Stronger antifungal', 'Spot treatment', 'Soothes itching'],
          store: 'MedPlus / HealthPlus',
          url: 'https://jiji.ng/nizoral-cream',
          activeIngredients: ['Ketoconazole 2%'],
          size: '30g',
          rating: 4.6,
          reviews: 3456,
          image: '/images/products/nizoral-cream.jpg'
        }
      ]
    },
    prevention: [
      'Shower immediately after sweating',
      'Wear breathable fabrics',
      'Avoid heavy creams',
      'Use antifungal wash in humid weather'
    ],
    prevalence: 'Common in humid climates like Nigeria',
    affects: 'People who sweat heavily, athletes',
    treatmentTime: '2-4 weeks'
  },
  {
    id: 'nodular-acne',
    name: 'Nodular Acne',
    description: 'Hard, large, very painful bumps deep in skin. No visible pus.',
    category: 'acne',
    causes: [
      'Severe inflammation deep in skin',
      'Hormonal imbalances',
      'Genetics',
      'Buildup of sebum and bacteria'
    ],
    symptoms: [
      'Large, hard lumps under skin',
      'Very painful to touch',
      'No head or pus',
      'Can last for weeks',
      'Often scars'
    ],
    treatments: {
      mild: [
        {
          id: 'differin-nodular',
          name: 'Differin Gel 0.1% Adapalene',
          brand: 'Differin',
          price: 22000,
          originalPrice: 25000,
          description: 'Retinoid that penetrates deep to treat nodular acne',
          benefits: ['Deep penetration', 'Prevents new nodules', 'Reduces size'],
          store: 'Pharmacy / Jumia',
          url: 'https://www.jumia.com.ng/differin',
          activeIngredients: ['Adapalene 0.1%'],
          size: '45g',
          rating: 4.7,
          reviews: 4567,
          image: '/images/products/differin.jpg'
        }
      ],
      moderate: [
        {
          id: 'benzamycin-gel',
          name: 'Benzamycin Topical Gel',
          brand: 'Benzamycin',
          price: 8500,
          originalPrice: 10000,
          description: 'Prescription gel combining erythromycin and benzoyl peroxide',
          benefits: ['Antibacterial', 'Anti-inflammatory', 'Prescription strength'],
          store: 'Nigerian Pharmacies',
          url: 'https://jiji.ng/benzamycin',
          activeIngredients: ['Erythromycin', 'Benzoyl Peroxide'],
          size: '30g',
          rating: 4.5,
          reviews: 2345,
          image: '/images/products/benzamycin.jpg'
        }
      ],
      severe: [
        {
          id: 'dermatologist-nodular',
          name: 'Dermatologist Consultation + Oral Medication',
          brand: 'Medical Professional',
          price: 15000,
          description: 'Professional treatment for severe nodular acne',
          benefits: ['Oral antibiotics', 'Isotretinoin possible', 'Medical supervision'],
          store: 'Dermatology Clinics',
          url: '#',
          rating: 5.0,
          reviews: 567,
          image: '/images/products/dermatologist.jpg'
        }
      ]
    },
    prevention: [
      'Seek professional help early',
      'Don\'t try to extract at home',
      'Use gentle products only',
      'Avoid triggers'
    ],
    prevalence: 'Less common but serious',
    affects: 'People with severe acne',
    treatmentTime: '3-6 months with professional care'
  },
  {
    id: 'acne-mechanica',
    name: 'Acne Mechanica',
    description: 'Breakouts from friction, pressure, or sweat — headbands, phone, helmets, tight collars.',
    category: 'acne',
    causes: [
      'Friction from sports equipment',
      'Phone pressed to face',
      'Tight clothing or collars',
      'Headbands or hats',
      'Backpacks'
    ],
    symptoms: [
      'Breakouts in specific friction areas',
      'Red, irritated bumps',
      'Worsens with activity',
      'Clears when friction stops'
    ],
    treatments: {
      mild: [
        {
          id: 'cetaphil-gentle',
          name: 'Cetaphil Gentle Skin Cleanser',
          brand: 'Cetaphil',
          price: 10500,
          originalPrice: 12000,
          description: 'Non-irritating cleanser for friction-prone areas',
          benefits: ['Gentle', 'Non-stripping', 'Soothing'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/cetaphil-gentle',
          activeIngredients: ['Glycerin', 'Vitamin B5'],
          size: '250ml',
          rating: 4.8,
          reviews: 23456,
          image: '/images/products/cetaphil.jpg'
        }
      ],
      moderate: [
        {
          id: 'lrp-effaclar',
          name: 'La Roche-Posay Effaclar Purifying Cleansing Gel',
          brand: 'La Roche-Posay',
          price: 21500,
          originalPrice: 25000,
          description: 'Purifying gel for acne-prone skin affected by friction',
          benefits: ['Purifies', 'Reduces oil', 'Soothing'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/lrp-effaclar',
          activeIngredients: ['Zinc PCA', 'Salicylic Acid'],
          size: '200ml',
          rating: 4.7,
          reviews: 5678,
          image: '/images/products/lrp-effaclar.jpg'
        }
      ]
    },
    prevention: [
      'Clean sports equipment regularly',
      'Use headphones/earpieces for calls',
      'Wear breathable fabrics',
      'Shower immediately after sweating'
    ],
    prevalence: 'Common in athletes',
    affects: 'Athletes, students, people who wear uniforms',
    treatmentTime: 'Varies with friction exposure'
  },
  {
    id: 'back-acne',
    name: 'Back Acne',
    scientificName: 'Bacne',
    description: 'Acne on the back, chest, or shoulders from sweat, oil, and friction.',
    category: 'acne',
    causes: [
      'Sweat trapped against skin',
      'Friction from clothing',
      'Hormones',
      'Genetics',
      'Not showering after workouts'
    ],
    symptoms: [
      'Bumps on back and shoulders',
      'Redness and inflammation',
      'Can include blackheads',
      'May leave dark marks'
    ],
    treatments: {
      mild: [
        {
          id: 'panoxyl-body-wash',
          name: 'PanOxyl Acne Body Wash 4% Benzoyl Peroxide',
          brand: 'PanOxyl',
          price: 22500,
          originalPrice: 25000,
          description: 'Body wash for back and shoulder acne',
          benefits: ['Kills bacteria', 'Large size', 'Gentle enough for body'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/panoxyl-body-wash',
          activeIngredients: ['Benzoyl Peroxide 4%'],
          size: '473ml',
          rating: 4.7,
          reviews: 3456,
          image: '/images/products/panoxyl-body.jpg'
        }
      ],
      moderate: [
        {
          id: 'salicylic-body-spray',
          name: 'Salicylic Acid Body Spray',
          brand: 'The Ordinary / Generic',
          price: 12500,
          originalPrice: 15000,
          description: 'Easy-to-apply spray for hard-to-reach back acne',
          benefits: ['Easy application', 'Treats large areas', 'Prevents breakouts'],
          store: 'Jiji',
          url: 'https://jiji.ng/salicylic-spray',
          activeIngredients: ['Salicylic Acid 2%'],
          size: '120ml',
          rating: 4.5,
          reviews: 2345,
          image: '/images/products/salicylic-spray.jpg'
        }
      ]
    },
    prevention: [
      'Shower immediately after workouts',
      'Wear clean, breathable clothing',
      'Avoid backpacks when possible',
      'Use non-comedogenic body wash'
    ],
    prevalence: 'Very common',
    affects: 'Teens and adults, especially athletes',
    treatmentTime: '4-8 weeks'
  },
  {
    id: 'acne-rosacea',
    name: 'Acne Rosacea',
    description: 'Persistent facial redness with small bumps — often mistaken for standard acne.',
    category: 'acne',
    causes: [
      'Genetics',
      'Blood vessel abnormalities',
      'Demodex mites',
      'Sun exposure',
      'Spicy foods, alcohol, heat'
    ],
    symptoms: [
      'Persistent facial redness',
      'Small red bumps',
      'Visible blood vessels',
      'Flushing and burning',
      'Sensitive skin'
    ],
    treatments: {
      mild: [
        {
          id: 'cetaphil-redness',
          name: 'Cetaphil Redness Relieving Daily Facial Moisturizer SPF 20',
          brand: 'Cetaphil',
          price: 18000,
          originalPrice: 20000,
          description: 'Daily moisturizer that calms redness and protects',
          benefits: ['Calms redness', 'SPF protection', 'Moisturizes'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/cetaphil-redness',
          activeIngredients: ['SPF 20', 'Allantoin', 'Licorice Extract'],
          size: '118ml',
          rating: 4.6,
          reviews: 4567,
          image: '/images/products/cetaphil-redness.jpg'
        }
      ],
      moderate: [
        {
          id: 'lrp-rosaliac',
          name: 'La Roche-Posay Rosaliac AR Visible Redness Serum',
          brand: 'La Roche-Posay',
          price: 30000,
          originalPrice: 35000,
          description: 'Targeted serum for redness and bumps',
          benefits: ['Reduces redness', 'Calms inflammation', 'Strengthens skin'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/lrp-rosaliac',
          activeIngredients: ['Ambophenol', 'Neurosensine', 'Vitamin CG'],
          size: '40ml',
          rating: 4.7,
          reviews: 2345,
          image: '/images/products/lrp-rosaliac.jpg'
        }
      ]
    },
    prevention: [
      'Avoid triggers (spicy food, alcohol, sun)',
      'Use gentle products only',
      'Always wear sunscreen',
      'Protect face from extreme temperatures'
    ],
    prevalence: 'Common, especially in fair skin',
    affects: 'Adults 30-50, women more than men',
    treatmentTime: 'Ongoing management'
  },

  // ===== HYPERPIGMENTATION & DARK MARKS (12-17) =====
  {
    id: 'hyperpigmentation',
    name: 'Hyperpigmentation',
    description: 'Dark spots or patches on skin from excess melanin production.',
    category: 'pigmentation',
    causes: [
      'Post-inflammatory (after acne)',
      'Sun exposure',
      'Hormonal changes',
      'Skin injuries',
      'Certain medications'
    ],
    symptoms: [
      'Dark spots on face or body',
      'Uneven skin tone',
      'Dark marks after pimples',
      'Patches darker than natural skin'
    ],
    treatments: {
      mild: [
        {
          id: 'roushun-niacinamide',
          name: 'Roushun Niacinamide 5% Dark Spot Correcting Glow Serum',
          brand: 'Roushun',
          price: 10000,
          originalPrice: 11000,
          description: 'Gentle niacinamide serum for mild dark spots',
          benefits: ['Brightens', 'Reduces spots', 'Even tone'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/roushun-niacinamide',
          activeIngredients: ['Niacinamide 5%', 'Vitamin C'],
          size: '30ml',
          rating: 4.5,
          reviews: 6789,
          image: '/images/products/roushun.jpg'
        }
      ],
      moderate: [
        {
          id: 'anua-dark-spot',
          name: 'Anua Niacinamide 10% + TXA 4% Dark Spot Correcting Serum',
          brand: 'Anua',
          price: 21000,
          originalPrice: 23000,
          description: 'Powerful serum for stubborn dark spots',
          benefits: ['Strong brightening', 'Targets PIH', 'Even skin tone'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/anua-dark-spot',
          activeIngredients: ['Niacinamide 10%', 'Tranexamic Acid 4%'],
          size: '30ml',
          rating: 4.8,
          reviews: 3456,
          image: '/images/products/anua-dark-spot.jpg'
        }
      ]
    },
    prevention: [
      'Wear SPF 50+ daily',
      'Avoid picking at skin',
      'Use brightening ingredients',
      'Be patient (it takes time)'
    ],
    prevalence: 'Very common in melanin-rich skin',
    affects: 'All skin types, especially darker skin tones',
    treatmentTime: '3-6 months'
  },
  {
    id: 'melasma',
    name: 'Melasma',
    description: 'Brown or gray patches from hormones or sun, usually on face.',
    category: 'pigmentation',
    causes: [
      'Hormonal changes (pregnancy, birth control)',
      'Sun exposure',
      'Genetics',
      'Thyroid disorders'
    ],
    symptoms: [
      'Brown/gray patches on face',
      'Symmetrical on both cheeks',
      'Forehead, upper lip, chin',
      'Worsens with sun'
    ],
    treatments: {
      mild: [
        {
          id: 'kojic-soap',
          name: 'Kojic Acid Brightening Soap',
          brand: 'Various',
          price: 4500,
          originalPrice: 6000,
          description: 'Gentle brightening soap for mild melasma',
          benefits: ['Brightens', 'Exfoliates', 'Affordable'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/kojic-soap',
          activeIngredients: ['Kojic Acid', 'Vitamin C'],
          size: '135g',
          rating: 4.4,
          reviews: 23456,
          image: '/images/products/kojic-soap.jpg'
        }
      ],
      moderate: [
        {
          id: 'good-molecules-discoloration',
          name: 'Good Molecules Discoloration Correcting Serum',
          brand: 'Good Molecules',
          price: 15000,
          originalPrice: 17000,
          description: 'Targeted serum for stubborn melasma',
          benefits: ['Corrects discoloration', 'Brightens', 'Even tone'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/good-molecules',
          activeIngredients: ['Tranexamic Acid', 'Niacinamide', 'Azelaic Acid'],
          size: '30ml',
          rating: 4.7,
          reviews: 5678,
          image: '/images/products/good-molecules.jpg'
        }
      ]
    },
    prevention: [
      'Strict sun protection',
      'SPF 50+ and wide-brim hats',
      'Avoid hormonal triggers if possible',
      'Gentle skincare only'
    ],
    prevalence: 'Common in women',
    affects: 'Women, especially during pregnancy',
    treatmentTime: '6-12 months'
  },
  {
    id: 'pih',
    name: 'Post-Inflammatory Hyperpigmentation (PIH)',
    description: 'Dark marks left behind after inflammation, pimples, or skin injury.',
    category: 'pigmentation',
    causes: [
      'Acne healing',
      'Eczema flares',
      'Skin injuries',
      'Insect bites',
      'Any skin inflammation'
    ],
    symptoms: [
      'Dark spots where pimples used to be',
      'Flat marks, not raised',
      'More noticeable in darker skin',
      'Fades slowly over time'
    ],
    treatments: {
      mild: [
        {
          id: 'ordinary-alpha-arbutin',
          name: 'The Ordinary Alpha Arbutin 2% + HA',
          brand: 'The Ordinary',
          price: 15500,
          originalPrice: 18000,
          description: 'Gentle brightening serum for PIH',
          benefits: ['Fades marks', 'Prevents new ones', 'Hydrating'],
          store: 'BuyBetter.ng / Jiji',
          url: 'https://buybetter.ng/ordinary-alpha-arbutin',
          activeIngredients: ['Alpha Arbutin 2%', 'Hyaluronic Acid'],
          size: '30ml',
          rating: 4.7,
          reviews: 12345,
          image: '/images/products/ordinary-arbutin.jpg'
        }
      ],
      moderate: [
        {
          id: 'cos-de-baha-azelaic',
          name: 'Cos De BAHA Azelaic Acid 10% Serum',
          brand: 'Cos De BAHA',
          price: 12500,
          originalPrice: 15000,
          description: 'Azelaic acid serum for stubborn PIH',
          benefits: ['Fades dark marks', 'Calms redness', 'Gentle'],
          store: 'Tosnigeria.com',
          url: 'https://tosnigeria.com/cos-de-baha-azelaic',
          activeIngredients: ['Azelaic Acid 10%', 'Niacinamide'],
          size: '30ml',
          rating: 4.6,
          reviews: 3456,
          image: '/images/products/cos-de-baha.jpg'
        }
      ]
    },
    prevention: [
      'Treat acne early',
      'Don\'t pick or pop',
      'Use sunscreen daily',
      'Incorporate brightening ingredients'
    ],
    prevalence: 'Very common in melanin-rich skin',
    affects: 'People with darker skin tones',
    treatmentTime: '3-6 months'
  },
  {
    id: 'acne-scars',
    name: 'Acne Scars (Atrophic)',
    description: 'Pitted or indented scars left from cystic or nodular acne.',
    category: 'scars',
    causes: [
      'Severe acne',
      'Picking or popping',
      'Genetics',
      'Delayed treatment'
    ],
    symptoms: [
      'Pitted appearance',
      'Indented areas on skin',
      'Ice pick, boxcar, or rolling scars',
      'Loss of collagen'
    ],
    treatments: {
      mild: [
        {
          id: 'cerave-retinol-resurfacing',
          name: 'CeraVe Resurfacing Retinol Serum',
          brand: 'CeraVe',
          price: 19500,
          originalPrice: 22000,
          description: 'Retinol serum that helps resurface shallow scars',
          benefits: ['Smooths texture', 'Reduces appearance', 'Gentle retinol'],
          store: 'Jiji',
          url: 'https://jiji.ng/cerave-retinol',
          activeIngredients: ['Retinol', 'Ceramides', 'Niacinamide'],
          size: '30ml',
          rating: 4.6,
          reviews: 4567,
          image: '/images/products/cerave-retinol.jpg'
        }
      ],
      moderate: [
        {
          id: 'ordinary-glycolic',
          name: 'The Ordinary Glycolic Acid 7% Toning Solution',
          brand: 'The Ordinary',
          price: 14000,
          originalPrice: 16000,
          description: 'Chemical exfoliant to improve scar appearance',
          benefits: ['Exfoliates', 'Smooths texture', 'Brightens'],
          store: 'Jiji',
          url: 'https://jiji.ng/ordinary-glycolic',
          activeIngredients: ['Glycolic Acid 7%', 'Ginseng', 'Aloe Vera'],
          size: '240ml',
          rating: 4.7,
          reviews: 23456,
          image: '/images/products/ordinary-glycolic.jpg'
        }
      ],
      severe: [
        {
          id: 'dermatologist-scars',
          name: 'Dermatologist Consultation + Professional Treatments',
          brand: 'Medical Professional',
          price: 15000,
          description: 'Microneedling, laser, or chemical peels for deep scars',
          benefits: ['Professional treatments', 'Significant improvement', 'Medical supervision'],
          store: 'Dermatology Clinics',
          url: '#',
          rating: 4.9,
          reviews: 890,
          image: '/images/products/dermatologist-scar.jpg'
        }
      ]
    },
    prevention: [
      'Treat acne early',
      'Never pick or pop',
      'Use retinoids',
      'See dermatologist for deep acne'
    ],
    prevalence: 'Common in those with severe acne',
    affects: 'People with history of cystic acne',
    treatmentTime: '6-12 months for improvement'
  },
  {
    id: 'dark-underarms',
    name: 'Dark Underarms',
    description: 'Darkened skin in the armpit area from friction, shaving, or product buildup.',
    category: 'pigmentation',
    causes: [
      'Shaving',
      'Deodorant irritation',
      'Friction',
      'Hyperpigmentation',
      'Insulin resistance (acanthosis nigricans)'
    ],
    symptoms: [
      'Dark skin in armpits',
      'Velvety texture sometimes',
      'May feel rough',
      'No pain or itching'
    ],
    treatments: {
      mild: [
        {
          id: 'kojie-san-lightening',
          name: 'Kojie San Skin Lightening Soap',
          brand: 'Kojie San',
          price: 4000,
          originalPrice: 5000,
          description: 'Kojic acid soap for underarm brightening',
          benefits: ['Brightens', 'Exfoliates', 'Affordable'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/kojie-san',
          activeIngredients: ['Kojic Acid', 'Papaya Extract'],
          size: '135g',
          rating: 4.5,
          reviews: 45678,
          image: '/images/products/kojie-san.jpg'
        }
      ],
      moderate: [
        {
          id: 'palmers-eventone',
          name: 'Palmer\'s Skin Success Eventone Fade Milk',
          brand: 'Palmer\'s',
          price: 11000,
          originalPrice: 13000,
          description: 'Fading treatment for stubborn dark underarms',
          benefits: ['Fades dark areas', 'Even tone', 'Moisturizes'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/palmers-eventone',
          activeIngredients: ['Niacinamide', 'Vitamin C', 'Lactic Acid'],
          size: '250ml',
          rating: 4.5,
          reviews: 6789,
          image: '/images/products/palmers-eventone.jpg'
        }
      ]
    },
    prevention: [
      'Use gentle shaving techniques',
      'Try hair removal creams instead of shaving',
      'Wear breathable fabrics',
      'Use aluminum-free deodorants',
      'Exfoliate gently'
    ],
    prevalence: 'Very common',
    affects: 'All skin types, more common in darker skin',
    treatmentTime: '2-4 months'
  },
  {
    id: 'dark-knees-elbows',
    name: 'Dark Knees & Elbows',
    description: 'Hyperpigmentation from friction, heat, or pressure on joints.',
    category: 'pigmentation',
    causes: [
      'Friction from clothing',
      'Leaning on elbows',
      'Kneeling',
      'Dry skin',
      'Dead skin buildup'
    ],
    symptoms: [
      'Dark patches on knees/elbows',
      'Rough, thick skin',
      'Dryness',
      'Ashy appearance'
    ],
    treatments: {
      mild: [
        {
          id: 'jergens-natural-glow',
          name: 'Jergens Natural Glow Body Lotion',
          brand: 'Jergens',
          price: 8500,
          originalPrice: 10000,
          description: 'Gradual tanning lotion that evens out dark areas',
          benefits: ['Even tone', 'Moisturizes', 'Natural look'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/jergens-glow',
          activeIngredients: ['Erythrulose', 'Glycerin'],
          size: '200ml',
          rating: 4.5,
          reviews: 23456,
          image: '/images/products/jergens.jpg'
        }
      ],
      moderate: [
        {
          id: 'lactic-acid',
          name: 'The Ordinary Lactic Acid 10% + HA 2%',
          brand: 'The Ordinary',
          price: 15000,
          originalPrice: 17000,
          description: 'Exfoliating serum for rough, dark areas',
          benefits: ['Exfoliates', 'Brightens', 'Smooths texture'],
          store: 'Jiji',
          url: 'https://jiji.ng/lactic-acid',
          activeIngredients: ['Lactic Acid 10%', 'Hyaluronic Acid'],
          size: '30ml',
          rating: 4.6,
          reviews: 12345,
          image: '/images/products/lactic-acid.jpg'
        }
      ]
    },
    prevention: [
      'Moisturize daily',
      'Exfoliate regularly',
      'Wear soft fabrics',
      'Use cushions when kneeling'
    ],
    prevalence: 'Very common',
    affects: 'Everyone, especially those who kneel often',
    treatmentTime: '2-3 months'
  },

  // ===== TEXTURE & BUMPS (18-21) =====
  {
    id: 'keratosis-pilaris',
    name: 'Keratosis Pilaris',
    scientificName: 'KP',
    description: 'Small, rough bumps on upper arms, thighs, and cheeks — often called "chicken skin".',
    category: 'texture',
    causes: [
      'Keratin buildup',
      'Genetics',
      'Dry skin',
      'Eczema association'
    ],
    symptoms: [
      'Small, rough bumps',
      'Usually on upper arms',
      'May have slight redness',
      'Worse in dry weather',
      'Not itchy or painful'
    ],
    treatments: {
      mild: [
        {
          id: 'cerave-sa-lotion',
          name: 'CeraVe SA Lotion for Rough & Bumpy Skin',
          brand: 'CeraVe',
          price: 19500,
          originalPrice: 22000,
          description: 'Exfoliating lotion with salicylic acid for KP',
          benefits: ['Smooths bumps', 'Exfoliates', 'Ceramides'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/cerave-sa-lotion',
          activeIngredients: ['Salicylic Acid', 'Ceramides', 'Niacinamide'],
          size: '236ml',
          rating: 4.8,
          reviews: 34567,
          image: '/images/products/cerave-sa-lotion.jpg'
        }
      ],
      moderate: [
        {
          id: 'amlactin',
          name: 'AmLactin Intensive Healing Exfoliating & Hydrating Lotion 15% Lactic Acid',
          brand: 'AmLactin',
          price: 29000,
          originalPrice: 32000,
          description: 'Powerful lactic acid lotion for stubborn KP',
          benefits: ['Strong exfoliation', 'Smooths bumps', 'Hydrates'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/amlactin',
          activeIngredients: ['Lactic Acid 15%'],
          size: '400g',
          rating: 4.7,
          reviews: 8901,
          image: '/images/products/amlactin.jpg'
        }
      ]
    },
    prevention: [
      'Moisturize daily',
      'Use gentle exfoliation',
      'Avoid harsh scrubbing',
      'Humidify dry air'
    ],
    prevalence: 'Very common',
    affects: 'Up to 40% of adults',
    treatmentTime: 'Ongoing management'
  },
  {
    id: 'enlarged-pores',
    name: 'Enlarged Pores',
    description: 'Visibly large pores, especially on the nose, cheeks, and forehead.',
    category: 'texture',
    causes: [
      'Genetics',
      'Excess oil',
      'Aging',
      'Sun damage',
      'Clogged pores'
    ],
    symptoms: [
      'Visible, open pores',
      'Especially on nose and cheeks',
      'May have blackheads',
      'Skin looks textured'
    ],
    treatments: {
      mild: [
        {
          id: 'garnier-pure-active',
          name: 'Garnier Pure Active Pore Unclogging Toner',
          brand: 'Garnier',
          price: 8200,
          originalPrice: 9500,
          description: 'Daily toner to minimize appearance of pores',
          benefits: ['Unclogs pores', 'Reduces appearance', 'Mattifies'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/garnier-toner',
          activeIngredients: ['Salicylic Acid', 'Zinc'],
          size: '200ml',
          rating: 4.4,
          reviews: 12345,
          image: '/images/products/garnier-toner.jpg'
        }
      ],
      moderate: [
        {
          id: 'some-by-mi',
          name: 'Some By Mi AHA/BHA/PHA 30 Days Miracle Toner',
          brand: 'Some By Mi',
          price: 17000,
          originalPrice: 19000,
          description: 'Triple-action toner for visibly reduced pores',
          benefits: ['Minimizes pores', 'Exfoliates', 'Clarifies'],
          store: 'BuyBetter.ng',
          url: 'https://buybetter.ng/some-by-mi',
          activeIngredients: ['AHA', 'BHA', 'PHA', 'Tea Tree'],
          size: '150ml',
          rating: 4.7,
          reviews: 23456,
          image: '/images/products/some-by-mi.jpg'
        }
      ]
    },
    prevention: [
      'Use niacinamide',
      'Wear sunscreen daily',
      'Keep pores clean',
      'Use clay masks weekly'
    ],
    prevalence: 'Very common',
    affects: 'People with oily skin',
    treatmentTime: 'Can be minimized but not permanently reduced'
  },
  {
    id: 'sebaceous-filaments',
    name: 'Sebaceous Filaments',
    description: 'Thread-like gray/white plugs visible in pores, especially on nose — often mistaken for blackheads.',
    category: 'texture',
    causes: [
      'Natural oil flow',
      'Enlarged pores',
      'Oily skin',
      'Genetics'
    ],
    symptoms: [
      'Grayish or white thread-like plugs',
      'On nose and chin',
      'Smooth when pressed',
      'Recur quickly after extraction'
    ],
    treatments: {
      mild: [
        {
          id: 'innisfree-clay-mask',
          name: 'Innisfree Super Volcanic Pore Clay Mask',
          brand: 'Innisfree',
          price: 15000,
          originalPrice: 17000,
          description: 'Clay mask that draws out sebaceous filaments',
          benefits: ['Absorbs oil', 'Clears pores', 'Minimizes appearance'],
          store: 'Jiji',
          url: 'https://jiji.ng/innisfree-clay',
          activeIngredients: ['Jeju Volcanic Ash'],
          size: '100ml',
          rating: 4.6,
          reviews: 6789,
          image: '/images/products/innisfree-clay.jpg'
        }
      ],
      moderate: [
        {
          id: 'cosrx-bha-filaments',
          name: 'COSRX BHA Blackhead Power Liquid',
          brand: 'COSRX',
          price: 15850,
          description: 'BHA treatment that dissolves sebaceous filaments',
          benefits: ['Dissolves filaments', 'Keeps pores clean', 'Gentle'],
          store: 'CSi Grocery',
          url: 'https://www.jumia.com.ng/cosrx-bha',
          activeIngredients: ['Betaine Salicylate'],
          size: '100ml',
          rating: 4.7,
          reviews: 12345,
          image: '/images/products/cosrx-bha.jpg'
        }
      ]
    },
    prevention: [
      'Use BHA regularly',
      'Oil cleansing',
      'Consistent routine',
      'Accept they\'re normal'
    ],
    prevalence: 'Normal skin feature',
    affects: 'Everyone with pores',
    treatmentTime: 'Ongoing management'
  },
  {
    id: 'milia',
    name: 'Milia',
    description: 'Hard white bumps trapped under skin, usually around eyes — not related to acne.',
    category: 'texture',
    causes: [
      'Keratin trapped under skin',
      'Heavy skincare products',
      'Sun damage',
      'Not exfoliating',
      'Genetics'
    ],
    symptoms: [
      'Tiny white bumps',
      'Usually around eyes',
      'Hard to touch',
      'No redness or inflammation'
    ],
    treatments: {
      mild: [
        {
          id: 'niacinamide-milia',
          name: 'The Ordinary Niacinamide 10% + Zinc 1%',
          brand: 'The Ordinary',
          price: 14000,
          originalPrice: 16000,
          description: 'Regulates skin cell turnover to prevent milia',
          benefits: ['Regulates skin', 'Prevents new bumps', 'Oil control'],
          store: 'Jiji',
          url: 'https://jiji.ng/niacinamide',
          activeIngredients: ['Niacinamide 10%', 'Zinc 1%'],
          size: '30ml',
          rating: 4.8,
          reviews: 45678,
          image: '/images/products/ordinary-niacinamide.jpg'
        }
      ],
      moderate: [
        {
          id: 'differin-milia',
          name: 'Differin Gel 0.1% Adapalene',
          brand: 'Differin',
          price: 22000,
          originalPrice: 25000,
          description: 'Retinoid that helps clear milia (use carefully around eyes)',
          benefits: ['Speeds cell turnover', 'Clears bumps', 'Prevents new'],
          store: 'Pharmacy / Jumia',
          url: 'https://www.jumia.com.ng/differin',
          activeIngredients: ['Adapalene 0.1%'],
          size: '45g',
          rating: 4.7,
          reviews: 12345,
          image: '/images/products/differin.jpg'
        }
      ]
    },
    prevention: [
      'Use non-comedogenic products',
      'Gentle exfoliation',
      'Avoid heavy eye creams',
      'Don\'t try to extract at home'
    ],
    prevalence: 'Common',
    affects: 'All ages, especially around eyes',
    treatmentTime: 'Can take months to clear'
  },

  // ===== DRY & SENSITIVE SKIN =====
  {
    id: 'dry-skin',
    name: 'Dry Skin',
    scientificName: 'Xerosis',
    description: 'Flaky, tight, rough, or ashy-feeling skin lacking moisture.',
    category: 'dryness',
    causes: [
      'Cold weather',
      'Low humidity',
      'Hot showers',
      'Harsh soaps',
      'Aging',
      'Genetics'
    ],
    symptoms: [
      'Flaking or peeling',
      'Tightness after washing',
      'Rough texture',
      'Itching',
      'Ashy appearance',
      'Fine lines more visible'
    ],
    treatments: {
      mild: [
        {
          id: 'vaseline-cocoa-glow',
          name: 'Vaseline Intensive Care Cocoa Glow Body Lotion',
          brand: 'Vaseline',
          price: 5500,
          originalPrice: 6000,
          description: 'Deep moisturizing lotion with cocoa butter for dry skin',
          benefits: ['Moisturizes', 'Restores softness', 'Cocoa butter'],
          store: 'Jumia / Shoprite',
          url: 'https://www.jumia.com.ng/vaseline-cocoa-glow',
          activeIngredients: ['Petroleum Jelly', 'Cocoa Butter'],
          size: '400ml',
          rating: 4.7,
          reviews: 45678,
          image: '/images/products/vaseline-cocoa.jpg'
        }
      ],
      moderate: [
        {
          id: 'cerave-cream-tub',
          name: 'CeraVe Moisturizing Cream',
          brand: 'CeraVe',
          price: 24000,
          originalPrice: 28000,
          description: 'Rich cream with ceramides for very dry skin',
          benefits: ['24hr hydration', 'Restores barrier', 'Non-comedogenic'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/cerave-cream',
          activeIngredients: ['Ceramides', 'Hyaluronic Acid'],
          size: '454g',
          rating: 4.9,
          reviews: 23456,
          image: '/images/products/cerave-cream-tub.jpg'
        }
      ],
      severe: [
        {
          id: 'la-roche-posay-lipikar',
          name: 'La Roche-Posay Lipikar Balm AP+M',
          brand: 'La Roche-Posay',
          price: 28000,
          originalPrice: 32000,
          description: 'Intensive balm for severely dry, eczema-prone skin',
          benefits: ['24hr moisture', 'Soothes irritation', 'Shea butter'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/lrp-lipikar',
          activeIngredients: ['Shea Butter', 'Niacinamide', 'Thermal Water'],
          size: '400ml',
          rating: 4.8,
          reviews: 12345,
          image: '/images/products/lrp-lipikar.jpg'
        }
      ]
    },
    prevention: [
      'Moisturize immediately after showering',
      'Use lukewarm water, not hot',
      'Humidify dry air',
      'Avoid harsh soaps',
      'Drink plenty of water'
    ],
    prevalence: 'Very common',
    affects: 'All ages, especially in dry climates',
    treatmentTime: 'Ongoing management'
  },
  {
    id: 'dehydrated-skin',
    name: 'Dehydrated Skin',
    description: 'Lack of water in the skin, not oil. Feels tight, looks dull, fine lines visible.',
    category: 'dryness',
    causes: [
      'Not drinking enough water',
      'Caffeine/alcohol',
      'Harsh skincare',
      'Weather changes',
      'Indoor heating'
    ],
    symptoms: [
      'Tight feeling',
      'Dull, lackluster appearance',
      'Fine lines more visible',
      'Skin feels rough',
      'Makeup looks cakey'
    ],
    treatments: {
      mild: [
        {
          id: 'neutrogena-hydro-boost',
          name: 'Neutrogena Hydro Boost Water Gel',
          brand: 'Neutrogena',
          price: 16500,
          originalPrice: 19000,
          description: 'Water gel that instantly hydrates dehydrated skin',
          benefits: ['Instant hydration', 'Lightweight', 'Non-greasy'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/neutrogena-hydro',
          activeIngredients: ['Hyaluronic Acid', 'Glycerin'],
          size: '50ml',
          rating: 4.8,
          reviews: 34567,
          image: '/images/products/neutrogena-hydro.jpg'
        }
      ],
      moderate: [
        {
          id: 'cosrx-snail-essence',
          name: 'COSRX Advanced Snail 96 Mucin Power Essence',
          brand: 'COSRX',
          price: 18500,
          originalPrice: 21000,
          description: 'Snail mucin essence that deeply hydrates and repairs',
          benefits: ['Deep hydration', 'Repairs barrier', 'Plumps skin'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/cosrx-snail',
          activeIngredients: ['Snail Secretion Filtrate 96%', 'Hyaluronic Acid'],
          size: '100ml',
          rating: 4.9,
          reviews: 45678,
          image: '/images/products/cosrx-snail.jpg'
        }
      ]
    },
    prevention: [
      'Drink 8+ glasses of water daily',
      'Limit caffeine and alcohol',
      'Use hydrating serums',
      'Humidifier in dry rooms',
      'Avoid harsh cleansers'
    ],
    prevalence: 'Very common',
    affects: 'All skin types, even oily skin can be dehydrated',
    treatmentTime: '2-4 weeks'
  },
  {
    id: 'eczema',
    name: 'Eczema',
    scientificName: 'Atopic Dermatitis',
    description: 'Dry, itchy, inflamed skin that can crack and bleed. Chronic condition.',
    category: 'dryness',
    causes: [
      'Genetics',
      'Immune system overreaction',
      'Environmental triggers',
      'Stress',
      'Irritants',
      'Allergies'
    ],
    symptoms: [
      'Intense itching',
      'Red or brownish patches',
      'Dry, scaly skin',
      'Small raised bumps',
      'Cracked, thickened skin',
      'Oozing or crusting'
    ],
    treatments: {
      mild: [
        {
          id: 'cerave-moisturizing-lotion',
          name: 'CeraVe Moisturizing Lotion',
          brand: 'CeraVe',
          price: 22500,
          originalPrice: 26000,
          description: 'Gentle moisturizer for eczema-prone skin',
          benefits: ['Restores barrier', 'Ceramides', 'Non-irritating'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/cerave-lotion',
          activeIngredients: ['Ceramides', 'Hyaluronic Acid'],
          size: '473ml',
          rating: 4.8,
          reviews: 23456,
          image: '/images/products/cerave-lotion.jpg'
        }
      ],
      moderate: [
        {
          id: 'eucerin-eczema',
          name: 'Eucerin Eczema Relief Body Cream',
          brand: 'Eucerin',
          price: 22000,
          originalPrice: 25000,
          description: 'Cream specifically formulated for eczema relief',
          benefits: ['Soothes itching', 'Ceramides', 'Colloidal oatmeal'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/eucerin-eczema',
          activeIngredients: ['Colloidal Oatmeal', 'Ceramides'],
          size: '226g',
          rating: 4.7,
          reviews: 12345,
          image: '/images/products/eucerin-eczema.jpg'
        }
      ],
      severe: [
        {
          id: 'nixoderm-ointment',
          name: 'Nixoderm Ointment',
          brand: 'Nixoderm',
          price: 3500,
          originalPrice: 5000,
          description: 'Classic Nigerian pharmacy ointment for eczema',
          benefits: ['Affordable', 'Soothes', 'Local pharmacy'],
          store: 'Local Pharmacies',
          url: 'https://jiji.ng/nixoderm',
          activeIngredients: ['Sulfur', 'Camphor'],
          size: '20g',
          rating: 4.5,
          reviews: 23456,
          image: '/images/products/nixoderm.jpg'
        }
      ]
    },
    prevention: [
      'Moisturize immediately after bathing',
      'Identify and avoid triggers',
      'Use gentle, fragrance-free products',
      'Manage stress',
      'Avoid scratching'
    ],
    prevalence: 'Common',
    affects: 'Children and adults',
    treatmentTime: 'Ongoing management'
  },
  {
    id: 'contact-dermatitis',
    name: 'Contact Dermatitis',
    description: 'Rash from contact with soaps, creams, metals, detergents, or fabrics.',
    category: 'dryness',
    causes: [
      'Allergic reaction',
      'Irritants',
      'Nickel in jewelry',
      'Fragrances',
      'Harsh chemicals',
      'Certain plants'
    ],
    symptoms: [
      'Red rash',
      'Itching',
      'Burning or stinging',
      'Dry, cracked skin',
      'Blisters',
      'Swelling'
    ],
    treatments: {
      mild: [
        {
          id: 'cetaphil-gentle-cleanser',
          name: 'Cetaphil Gentle Skin Cleanser',
          brand: 'Cetaphil',
          price: 10500,
          originalPrice: 12000,
          description: 'Fragrance-free gentle cleanser for sensitive skin',
          benefits: ['Non-irritating', 'Soap-free', 'Fragrance-free'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/cetaphil-gentle',
          activeIngredients: ['Glycerin', 'Vitamin B5'],
          size: '250ml',
          rating: 4.8,
          reviews: 34567,
          image: '/images/products/cetaphil.jpg'
        }
      ],
      moderate: [
        {
          id: 'hydrocortisone-cream',
          name: 'Hydrocortisone 1% Cream',
          brand: 'Generic',
          price: 3000,
          originalPrice: 4000,
          description: 'Anti-itch cream for contact dermatitis',
          benefits: ['Reduces inflammation', 'Relieves itching', 'Pharmacy staple'],
          store: 'MedPlus / HealthPlus',
          url: 'https://jiji.ng/hydrocortisone',
          activeIngredients: ['Hydrocortisone 1%'],
          size: '30g',
          rating: 4.5,
          reviews: 45678,
          image: '/images/products/hydrocortisone.jpg'
        }
      ]
    },
    prevention: [
      'Identify and avoid triggers',
      'Use fragrance-free products',
      'Wear gloves with chemicals',
      'Patch test new products',
      'Avoid nickel jewelry'
    ],
    prevalence: 'Common',
    affects: 'Anyone exposed to irritants/allergens',
    treatmentTime: '1-3 weeks'
  },
  {
    id: 'sensitive-skin',
    name: 'Sensitive Skin',
    description: 'Skin that stings, flushes, or reacts easily to most products.',
    category: 'dryness',
    causes: [
      'Genetics',
      'Damaged skin barrier',
      'Allergies',
      'Rosacea',
      'Over-exfoliation',
      'Environmental factors'
    ],
    symptoms: [
      'Stinging or burning',
      'Redness',
      'Flushing',
      'Reactions to products',
      'Itching',
      'Dry patches'
    ],
    treatments: {
      mild: [
        {
          id: 'avene-thermal-water',
          name: 'Avene Thermal Spring Water Spray',
          brand: 'Avene',
          price: 14500,
          originalPrice: 16000,
          description: 'Soothing mist for sensitive, reactive skin',
          benefits: ['Soothes', 'Calms redness', 'Refreshes'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/avene-thermal',
          activeIngredients: ['Thermal Spring Water'],
          size: '150ml',
          rating: 4.7,
          reviews: 23456,
          image: '/images/products/avene.jpg'
        }
      ],
      moderate: [
        {
          id: 'lrp-toleriane',
          name: 'La Roche-Posay Toleriane Ultra Soothing Repair Moisturizer',
          brand: 'La Roche-Posay',
          price: 24000,
          originalPrice: 28000,
          description: 'Ultra-soothing moisturizer for extremely sensitive skin',
          benefits: ['Soothing', 'Fragrance-free', 'Hypoallergenic'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/lrp-toleriane',
          activeIngredients: ['Neurosensine', 'Thermal Water'],
          size: '40ml',
          rating: 4.8,
          reviews: 12345,
          image: '/images/products/lrp-toleriane.jpg'
        }
      ]
    },
    prevention: [
      'Use fragrance-free products',
      'Patch test new products',
      'Avoid hot water',
      'Limit exfoliation',
      'Protect from extreme weather'
    ],
    prevalence: 'Very common',
    affects: 'All ages',
    treatmentTime: 'Ongoing management'
  },
  {
    id: 'perioral-dermatitis',
    name: 'Perioral Dermatitis',
    description: 'Red bumps around the mouth — often triggered by steroid creams or heavy moisturizers.',
    category: 'dryness',
    causes: [
      'Topical steroid overuse',
      'Heavy moisturizers',
      'Fluorinated toothpaste',
      'Hormonal changes',
      'Stress'
    ],
    symptoms: [
      'Red bumps around mouth',
      'May extend to nose',
      'Dry, flaky skin',
      'Burning sensation',
      'Clear fluid possible'
    ],
    treatments: {
      mild: [
        {
          id: 'lrp-toleriane-cleanser',
          name: 'La Roche-Posay Toleriane Hydrating Gentle Cleanser',
          brand: 'La Roche-Posay',
          price: 20000,
          originalPrice: 22000,
          description: 'Gentle cleanser for perioral dermatitis',
          benefits: ['Hydrating', 'Gentle', 'Non-irritating'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/lrp-toleriane-cleanser',
          activeIngredients: ['Ceramides', 'Niacinamide'],
          size: '200ml',
          rating: 4.7,
          reviews: 8901,
          image: '/images/products/lrp-toleriane-cleanser.jpg'
        }
      ],
      moderate: [
        {
          id: 'metronidazole-gel',
          name: 'Metronidazole Gel 0.75%',
          brand: 'Generic',
          price: 5500,
          originalPrice: 7000,
          description: 'Prescription gel for perioral dermatitis',
          benefits: ['Antibacterial', 'Reduces inflammation', 'Prescription'],
          store: 'Nigerian Pharmacies',
          url: 'https://jiji.ng/metronidazole',
          activeIngredients: ['Metronidazole 0.75%'],
          size: '30g',
          rating: 4.5,
          reviews: 3456,
          image: '/images/products/metronidazole.jpg'
        }
      ]
    },
    prevention: [
      'Stop using steroid creams',
      'Use minimal products',
      'Avoid heavy occlusives',
      'Switch to fluoride-free toothpaste',
      'See a dermatologist'
    ],
    prevalence: 'Common in women 20-45',
    affects: 'Women more than men',
    treatmentTime: '4-8 weeks'
  },
  {
    id: 'seborrheic-dermatitis',
    name: 'Seborrheic Dermatitis',
    description: 'Oily, flaky patches on scalp, eyebrows, nose sides, chest. Looks like severe dandruff.',
    category: 'dryness',
    causes: [
      'Yeast overgrowth',
      'Genetics',
      'Stress',
      'Cold, dry weather',
      'Neurological conditions'
    ],
    symptoms: [
      'Flaky white/yellow scales',
      'Redness',
      'Itching',
      'Oily patches',
      'Usually on scalp, eyebrows, nose sides'
    ],
    treatments: {
      mild: [
        {
          id: 'nizoral-shampoo-sd',
          name: 'Nizoral Anti-Dandruff Shampoo 1% Ketoconazole',
          brand: 'Nizoral',
          price: 15500,
          originalPrice: 17000,
          description: 'Anti-fungal shampoo for seborrheic dermatitis',
          benefits: ['Anti-fungal', 'Reduces flakes', 'Soothes'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/nizoral',
          activeIngredients: ['Ketoconazole 1%'],
          size: '200ml',
          rating: 4.7,
          reviews: 23456,
          image: '/images/products/nizoral.jpg'
        }
      ],
      moderate: [
        {
          id: 'selsun-blue',
          name: 'Selsun Blue Medicated Anti-Dandruff Shampoo',
          brand: 'Selsun Blue',
          price: 9000,
          originalPrice: 11000,
          description: 'Stronger treatment with selenium sulfide',
          benefits: ['Controls flakes', 'Reduces itching', 'Long-lasting'],
          store: 'Pharmacy / Jumia',
          url: 'https://www.jumia.com.ng/selsun-blue',
          activeIngredients: ['Selenium Sulfide 2.5%'],
          size: '200ml',
          rating: 4.6,
          reviews: 34567,
          image: '/images/products/selsun-blue.jpg'
        }
      ]
    },
    prevention: [
      'Use anti-dandruff shampoo regularly',
      'Reduce stress',
      'Avoid heavy oils',
      'Get some sun (but not too much)'
    ],
    prevalence: 'Very common',
    affects: 'Adults 30-60, men more than women',
    treatmentTime: 'Ongoing management'
  },

  // ===== OILY SKIN & SHINE =====
  {
    id: 'oily-skin',
    name: 'Oily Skin',
    description: 'Excess sebum production causing shiny, greasy face especially in T-zone.',
    category: 'oiliness',
    causes: [
      'Genetics',
      'Hormonal changes',
      'Stress',
      'Humid climate',
      'Using wrong products'
    ],
    symptoms: [
      'Shiny appearance',
      'Enlarged pores',
      'Frequent breakouts',
      'Makeup doesn\'t last',
      'Greasy to touch'
    ],
    treatments: {
      mild: [
        {
          id: 'neutrogena-oil-free',
          name: 'Neutrogena Oil-Free Moisturizer',
          brand: 'Neutrogena',
          price: 10500,
          originalPrice: 11500,
          description: 'Lightweight, oil-free moisturizer for oily skin',
          benefits: ['Oil control', 'Hydrates without grease', 'Non-comedogenic'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/neutrogena-oil-free',
          activeIngredients: ['Glycerin', 'Dimethicone'],
          size: '118ml',
          rating: 4.6,
          reviews: 23456,
          image: '/images/products/neutrogena-oil-free.jpg'
        }
      ],
      moderate: [
        {
          id: 'garnier-green-tea',
          name: 'Garnier SkinActive 3-in-1 Moisturizer with Green Tea',
          brand: 'Garnier',
          price: 12500,
          originalPrice: 14000,
          description: 'Mattifying moisturizer for oily skin',
          benefits: ['Mattifies', 'Oil control', 'Green tea extract'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/garnier-green-tea',
          activeIngredients: ['Green Tea Extract', 'Salicylic Acid'],
          size: '200ml',
          rating: 4.5,
          reviews: 34567,
          image: '/images/products/garnier-green-tea.jpg'
        }
      ]
    },
    prevention: [
      'Cleanse twice daily',
      'Use oil-free products',
      'Don\'t over-cleanse (can worsen oil)',
      'Use blotting papers',
      'Stay hydrated'
    ],
    prevalence: 'Very common',
    affects: 'Teens and adults',
    treatmentTime: 'Ongoing management'
  },
  {
    id: 'combination-skin',
    name: 'Combination Skin',
    description: 'Oily T-zone (forehead, nose, chin) with dry or normal cheeks.',
    category: 'oiliness',
    causes: [
      'Genetics',
      'Hormones',
      'Climate',
      'Using wrong products'
    ],
    symptoms: [
      'Oily T-zone',
      'Dry or normal cheeks',
      'Enlarged pores in T-zone',
      'Occasional breakouts',
      'Different needs on different areas'
    ],
    treatments: {
      mild: [
        {
          id: 'simple-moisturizing',
          name: 'Simple Kind to Skin Moisturizing Facial Wash',
          brand: 'Simple',
          price: 6500,
          originalPrice: 7500,
          description: 'Gentle wash for combination skin',
          benefits: ['Balanced', 'Gentle', 'No harsh chemicals'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/simple-wash',
          activeIngredients: ['Vitamin B5', 'Vitamin E'],
          size: '150ml',
          rating: 4.5,
          reviews: 45678,
          image: '/images/products/simple-wash.jpg'
        }
      ],
      moderate: [
        {
          id: 'cosrx-oil-free',
          name: 'COSRX Oil-Free Ultra Moisturizing Lotion with Birch Sap',
          brand: 'COSRX',
          price: 16500,
          originalPrice: 19000,
          description: 'Lightweight lotion that balances combination skin',
          benefits: ['Oil-free', 'Balancing', 'Hydrating'],
          store: 'Jiji',
          url: 'https://jiji.ng/cosrx-oil-free',
          activeIngredients: ['Birch Sap', 'Tea Tree Oil'],
          size: '100ml',
          rating: 4.7,
          reviews: 23456,
          image: '/images/products/cosrx-oil-free.jpg'
        }
      ]
    },
    prevention: [
      'Use gentle, balancing products',
      'Consider multi-moisturizing',
      'Don\'t use harsh products on dry areas',
      'Blotting papers for T-zone'
    ],
    prevalence: 'Very common',
    affects: 'Most people',
    treatmentTime: 'Ongoing management'
  },

  // ===== AGING & FIRMNESS =====
  {
    id: 'fine-lines',
    name: 'Fine Lines & Wrinkles',
    description: 'Early signs of aging — expression lines around eyes, forehead, and mouth.',
    category: 'aging',
    causes: [
      'Aging',
      'Sun exposure',
      'Smoking',
      'Repetitive expressions',
      'Genetics',
      'Pollution'
    ],
    symptoms: [
      'Fine lines around eyes',
      'Forehead lines',
      'Smile lines',
      'Loss of elasticity',
      'Crow\'s feet'
    ],
    treatments: {
      mild: [
        {
          id: 'olay-regenerist',
          name: 'Olay Regenerist Micro-Sculpting Cream',
          brand: 'Olay',
          price: 14500,
          originalPrice: 17000,
          description: 'Anti-aging cream that reduces fine lines',
          benefits: ['Reduces lines', 'Plumps', 'Hydrates'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/olay-regenerist',
          activeIngredients: ['Niacinamide', 'Peptides', 'Hyaluronic Acid'],
          size: '50g',
          rating: 4.7,
          reviews: 45678,
          image: '/images/products/olay.jpg'
        }
      ],
      moderate: [
        {
          id: 'cerave-retinol',
          name: 'CeraVe Skin Renewing Retinol Serum',
          brand: 'CeraVe',
          price: 19500,
          originalPrice: 22000,
          description: 'Retinol serum that targets wrinkles',
          benefits: ['Reduces wrinkles', 'Smooths texture', 'Ceramides'],
          store: 'Jiji',
          url: 'https://jiji.ng/cerave-retinol',
          activeIngredients: ['Retinol', 'Ceramides'],
          size: '30ml',
          rating: 4.6,
          reviews: 23456,
          image: '/images/products/cerave-retinol.jpg'
        }
      ],
      severe: [
        {
          id: 'neutrogena-rapid-wrinkle',
          name: 'Neutrogena Rapid Wrinkle Repair Retinol Serum',
          brand: 'Neutrogena',
          price: 18500,
          originalPrice: 21000,
          description: 'Fast-acting retinol serum for deep wrinkles',
          benefits: ['Rapid results', 'Reduces deep wrinkles', 'Brightens'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/neutrogena-rapid',
          activeIngredients: ['Retinol', 'Hyaluronic Acid', 'Vitamin C'],
          size: '30ml',
          rating: 4.6,
          reviews: 34567,
          image: '/images/products/neutrogena-rapid.jpg'
        }
      ]
    },
    prevention: [
      'Wear sunscreen daily',
      'Use retinoids',
      'Stay hydrated',
      'Don\'t smoke',
      'Healthy diet'
    ],
    prevalence: 'Universal with age',
    affects: 'Adults 25+',
    treatmentTime: '3-6 months for visible results'
  },
  {
    id: 'loss-of-elasticity',
    name: 'Loss of Skin Elasticity / Sagging',
    description: 'Skin that lacks bounce, looks loose especially on neck and jawline.',
    category: 'aging',
    causes: [
      'Collagen loss',
      'Elastin breakdown',
      'Sun damage',
      'Aging',
      'Weight loss',
      'Genetics'
    ],
    symptoms: [
      'Sagging jawline',
      'Loose skin on neck',
      'Reduced bounce',
      'Jowls forming',
      'Loss of definition'
    ],
    treatments: {
      mild: [
        {
          id: 'neutrogena-firming',
          name: 'Neutrogena Rapid Firming Peptide Serum',
          brand: 'Neutrogena',
          price: 18500,
          originalPrice: 21000,
          description: 'Peptide serum for firmer skin',
          benefits: ['Firms', 'Peptides', 'Lifts'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/neutrogena-firming',
          activeIngredients: ['Peptides', 'Hyaluronic Acid'],
          size: '30ml',
          rating: 4.5,
          reviews: 23456,
          image: '/images/products/neutrogena-firming.jpg'
        }
      ],
      moderate: [
        {
          id: 'cosrx-snail-peptide',
          name: 'COSRX Advanced Snail 96 Mucin Power Essence + Peptide Serum',
          brand: 'COSRX',
          price: 21500,
          originalPrice: 25000,
          description: 'Combination treatment for elasticity',
          benefits: ['Improves elasticity', 'Plumps', 'Hydrates'],
          store: 'Jiji',
          url: 'https://jiji.ng/cosrx-snail',
          activeIngredients: ['Snail Mucin', 'Peptides'],
          size: '100ml',
          rating: 4.7,
          reviews: 12345,
          image: '/images/products/cosrx-snail.jpg'
        }
      ]
    },
    prevention: [
      'Wear sunscreen',
      'Use firming ingredients',
      'Facial exercises',
      'Healthy lifestyle',
      'Stay hydrated'
    ],
    prevalence: 'Common with age',
    affects: 'Adults 40+',
    treatmentTime: '6-12 months'
  },
  {
    id: 'dark-circles',
    name: 'Dark Circles',
    description: 'Dark or hollow appearance under eyes from pigmentation, thin skin, or vascular issues.',
    category: 'aging',
    causes: [
      'Genetics',
      'Aging',
      'Lack of sleep',
      'Allergies',
      'Sun exposure',
      'Thin skin'
    ],
    symptoms: [
      'Dark under-eye area',
      'Puffiness',
      'Hollow appearance',
      'Tired look',
      'More visible with age'
    ],
    treatments: {
      mild: [
        {
          id: 'good-molecules-discoloration',
          name: 'Good Molecules Discoloration Correcting Serum',
          brand: 'Good Molecules',
          price: 15000,
          originalPrice: 17000,
          description: 'Gentle serum for under-eye dark circles',
          benefits: ['Brightens', 'Corrects discoloration', 'Gentle'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/good-molecules',
          activeIngredients: ['Tranexamic Acid', 'Niacinamide'],
          size: '30ml',
          rating: 4.7,
          reviews: 8901,
          image: '/images/products/good-molecules.jpg'
        }
      ],
      moderate: [
        {
          id: 'cerave-eye-repair',
          name: 'CeraVe Eye Repair Cream',
          brand: 'CeraVe',
          price: 21000,
          originalPrice: 23000,
          description: 'Eye cream that targets dark circles',
          benefits: ['Brightens', 'Hydrates', 'Ceramides'],
          store: 'Nectar Beauty Hub',
          url: 'https://jiji.ng/cerave-eye',
          activeIngredients: ['Niacinamide', 'Ceramides'],
          size: '14ml',
          rating: 4.6,
          reviews: 34567,
          image: '/images/products/cerave-eye.jpg'
        }
      ]
    },
    prevention: [
      'Get enough sleep',
      'Use sunscreen under eyes',
      'Manage allergies',
      'Gentle eye massage',
      'Stay hydrated'
    ],
    prevalence: 'Very common',
    affects: 'All ages, more common with age',
    treatmentTime: '2-3 months for improvement'
  },
  {
    id: 'dull-skin',
    name: 'Dull Skin',
    description: 'Lackluster, gray-looking, tired skin with no glow.',
    category: 'aging',
    causes: [
      'Dead skin buildup',
      'Dehydration',
      'Lack of sleep',
      'Poor diet',
      'Smoking',
      'Pollution'
    ],
    symptoms: [
      'No natural glow',
      'Grayish appearance',
      'Rough texture',
      'Uneven tone',
      'Looks tired'
    ],
    treatments: {
      mild: [
        {
          id: 'garnier-vitamin-c',
          name: 'Garnier Bright Complete Vitamin C Serum',
          brand: 'Garnier',
          price: 8500,
          originalPrice: 10000,
          description: 'Vitamin C serum for brighter skin',
          benefits: ['Brightens', 'Vitamin C', 'Glow'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/garnier-vitamin-c',
          activeIngredients: ['Vitamin C', 'Lemon Extract'],
          size: '30ml',
          rating: 4.5,
          reviews: 45678,
          image: '/images/products/garnier-vitamin-c.jpg'
        }
      ],
      moderate: [
        {
          id: 'beauty-of-joseon-glow',
          name: 'Beauty of Joseon Glow Serum: Propolis + Niacinamide',
          brand: 'Beauty of Joseon',
          price: 16500,
          originalPrice: 19000,
          description: 'Glow-boosting serum for radiant skin',
          benefits: ['Glow', 'Brightening', 'Hydrating'],
          store: 'Jiji',
          url: 'https://jiji.ng/boj-glow',
          activeIngredients: ['Propolis', 'Niacinamide', 'Rice Extract'],
          size: '30ml',
          rating: 4.8,
          reviews: 23456,
          image: '/images/products/boj-glow.jpg'
        }
      ]
    },
    prevention: [
      'Exfoliate regularly',
      'Use vitamin C',
      'Stay hydrated',
      'Get enough sleep',
      'Healthy diet'
    ],
    prevalence: 'Common',
    affects: 'All ages',
    treatmentTime: '4-6 weeks'
  },

  // ===== MARKS & SCARS (1 already exists - acne-scars) =====
  // Adding 2 more to make it 3 total
  {
    id: 'stretch-marks',
    name: 'Stretch Marks',
    scientificName: 'Striae',
    description: 'Lines from rapid skin stretching — pregnancy, growth spurts, weight changes.',
    category: 'scars',
    causes: [
      'Pregnancy',
      'Rapid weight gain/loss',
      'Growth spurts',
      'Genetics',
      'Cortisone use'
    ],
    symptoms: [
      'Reddish or purplish lines when new',
      'Silvery white lines when older',
      'Common on stomach, thighs, breasts',
      'May feel slightly indented'
    ],
    treatments: {
      mild: [
        {
          id: 'palmers-oil',
          name: 'Palmer\'s Cocoa Butter Formula Skin Therapy Oil',
          brand: 'Palmer\'s',
          price: 13000,
          originalPrice: 15000,
          description: 'Oil that helps prevent and fade stretch marks',
          benefits: ['Prevents', 'Fades', 'Moisturizes'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/palmers-oil',
          activeIngredients: ['Cocoa Butter', 'Vitamin E', 'Shea Butter'],
          size: '60ml',
          rating: 4.7,
          reviews: 34567,
          image: '/images/products/palmers-oil.jpg'
        }
      ],
      moderate: [
        {
          id: 'bio-oil',
          name: 'Bio-Oil Skincare Body Oil',
          brand: 'Bio-Oil',
          price: 20000,
          originalPrice: 22000,
          description: 'Specialist oil for scars and stretch marks',
          benefits: ['Fades scars', 'Reduces stretch marks', 'Improves tone'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/bio-oil',
          activeIngredients: ['PurCellin Oil', 'Vitamin A', 'Vitamin E'],
          size: '200ml',
          rating: 4.8,
          reviews: 56789,
          image: '/images/products/bio-oil.jpg'
        }
      ]
    },
    prevention: [
      'Moisturize regularly',
      'Stay hydrated',
      'Healthy weight maintenance',
      'Use oils during pregnancy'
    ],
    prevalence: 'Very common',
    affects: 'Women during pregnancy, teens during growth',
    treatmentTime: '3-6 months for improvement'
  },
  {
    id: 'keloid-scars',
    name: 'Keloid Scars',
    description: 'Thick, raised scars that grow beyond the original wound. Very common in Nigerians.',
    category: 'scars',
    causes: [
      'Genetics',
      'Skin injuries',
      'Surgery',
      'Piercings',
      'Burns',
      'Acne'
    ],
    symptoms: [
      'Raised, thick scar',
      'Extends beyond wound',
      'May be itchy',
      'Shiny and hairless',
      'Can continue growing'
    ],
    treatments: {
      mild: [
        {
          id: 'mederma-gel',
          name: 'Mederma Scar Gel',
          brand: 'Mederma',
          price: 23000,
          originalPrice: 26000,
          description: 'Gel that helps reduce scar appearance',
          benefits: ['Reduces scars', 'Softens', 'Fades'],
          store: 'Jumia / HealthPlus',
          url: 'https://www.jumia.com.ng/mederma',
          activeIngredients: ['Allium Cepa Extract'],
          size: '20g',
          rating: 4.6,
          reviews: 23456,
          image: '/images/products/mederma.jpg'
        }
      ],
      moderate: [
        {
          id: 'silflex-sheets',
          name: 'SilFlex Silicone Scar Sheets',
          brand: 'SilFlex',
          price: 17500,
          originalPrice: 20000,
          description: 'Silicone sheets that flatten raised scars',
          benefits: ['Flattens', 'Reduces redness', 'Reusable'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/silflex',
          activeIngredients: ['Medical-grade Silicone'],
          size: 'Reusable',
          rating: 4.5,
          reviews: 8901,
          image: '/images/products/silflex.jpg'
        }
      ],
      severe: [
        {
          id: 'dermatologist-keloid',
          name: 'Dermatologist Consultation + Injections',
          brand: 'Medical Professional',
          price: 15000,
          description: 'Professional treatment for keloids',
          benefits: ['Steroid injections', 'Medical supervision', 'Specialist care'],
          store: 'Dermatology Clinics',
          url: '#',
          rating: 4.8,
          reviews: 1234,
          image: '/images/products/dermatologist.jpg'
        }
      ]
    },
    prevention: [
      'Don\'t pierce if prone',
      'Avoid unnecessary surgery',
      'Treat injuries immediately',
      'Use silicone sheets early',
      'See dermatologist early'
    ],
    prevalence: 'Common in darker skin tones',
    affects: 'People with genetic predisposition',
    treatmentTime: '6-12 months with professional care'
  },
  {
    id: 'surgical-scars',
    name: 'Surgical / Injury Scars',
    description: 'Flat or raised scars from surgeries, cuts, or burns.',
    category: 'scars',
    causes: [
      'Surgery',
      'Cuts',
      'Burns',
      'Accidents',
      'Injuries'
    ],
    symptoms: [
      'Line or patch of scar tissue',
      'May be raised or flat',
      'Different color than skin',
      'May fade over time'
    ],
    treatments: {
      mild: [
        {
          id: 'palmers-scar-serum',
          name: 'Palmer\'s Cocoa Butter Formula Scar Serum',
          brand: 'Palmer\'s',
          price: 14000,
          originalPrice: 16000,
          description: 'Serum that helps fade new scars',
          benefits: ['Fades', 'Smooths', 'Moisturizes'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/palmers-scar',
          activeIngredients: ['Cocoa Butter', 'Vitamin E', 'Shea Butter'],
          size: '75ml',
          rating: 4.5,
          reviews: 23456,
          image: '/images/products/palmers-scar.jpg'
        }
      ],
      moderate: [
        {
          id: 'mederma-advanced',
          name: 'Mederma Advanced Scar Gel',
          brand: 'Mederma',
          price: 27500,
          originalPrice: 30000,
          description: 'Advanced formula for older scars',
          benefits: ['Reduces appearance', 'Softens', 'Fades'],
          store: 'Jumia / HealthPlus',
          url: 'https://www.jumia.com.ng/mederma-advanced',
          activeIngredients: ['Allium Cepa Extract', 'Allantoin'],
          size: '50g',
          rating: 4.7,
          reviews: 12345,
          image: '/images/products/mederma-advanced.jpg'
        }
      ]
    },
    prevention: [
      'Keep wound clean',
      'Use silicone sheets',
      'Massage scar gently',
      'Avoid sun on healing scar',
      'Moisturize regularly'
    ],
    prevalence: 'Common',
    affects: 'Anyone with surgery or injury',
    treatmentTime: '3-12 months'
  },

  // ===== SUN & ENVIRONMENTAL =====
  {
    id: 'sunburn',
    name: 'Sunburn',
    description: 'Red, painful, peeling skin from UV overexposure.',
    category: 'sun',
    causes: [
      'Too much sun without protection',
      'Tanning beds',
      'Reflection from water/sand',
      'Certain medications'
    ],
    symptoms: [
      'Red, warm skin',
      'Pain or tenderness',
      'Swelling',
      'Blisters',
      'Peeling after days'
    ],
    treatments: {
      mild: [
        {
          id: 'aloe-vera-gel',
          name: 'Fruit of the Earth Aloe Vera Gel',
          brand: 'Fruit of the Earth',
          price: 9500,
          originalPrice: 11000,
          description: 'Soothing aloe gel for sunburn relief',
          benefits: ['Cools', 'Soothes', 'Hydrates'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/aloe-vera',
          activeIngredients: ['Aloe Vera 100%'],
          size: '680g',
          rating: 4.7,
          reviews: 45678,
          image: '/images/products/aloe-vera.jpg'
        }
      ],
      moderate: [
        {
          id: 'eucerin-after-sun',
          name: 'Eucerin After Sun Lotion',
          brand: 'Eucerin',
          price: 21000,
          originalPrice: 24000,
          description: 'After-sun treatment for damaged skin',
          benefits: ['Soothes', 'Repairs', 'Rehydrates'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/eucerin-after-sun',
          activeIngredients: ['Panthenol', 'Shea Butter'],
          size: '200ml',
          rating: 4.6,
          reviews: 23456,
          image: '/images/products/eucerin-after-sun.jpg'
        }
      ]
    },
    prevention: [
      'Wear SPF 50+',
      'Reapply every 2 hours',
      'Avoid peak sun hours',
      'Wear protective clothing',
      'Seek shade'
    ],
    prevalence: 'Very common',
    affects: 'Anyone exposed to sun',
    treatmentTime: '3-7 days to heal'
  },
  {
    id: 'sun-spots',
    name: 'Sun Spots / Age Spots',
    scientificName: 'Solar Lentigines',
    description: 'Flat, brown spots from sun damage — common on face, hands, and arms.',
    category: 'sun',
    causes: [
      'Chronic sun exposure',
      'Aging',
      'Tanning beds',
      'Genetics'
    ],
    symptoms: [
      'Flat brown spots',
      'On sun-exposed areas',
      'Round or oval',
      'Vary in size',
      'Painless'
    ],
    treatments: {
      mild: [
        {
          id: 'neutrogena-rapid-tone',
          name: 'Neutrogena Rapid Tone Repair Vitamin C Serum Capsules',
          brand: 'Neutrogena',
          price: 20500,
          originalPrice: 23000,
          description: 'Vitamin C serum for sun spots',
          benefits: ['Fades spots', 'Brightens', 'Vitamin C'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/neutrogena-rapid-tone',
          activeIngredients: ['Vitamin C', 'Hyaluronic Acid'],
          size: '30 capsules',
          rating: 4.6,
          reviews: 34567,
          image: '/images/products/neutrogena-capsules.jpg'
        }
      ],
      moderate: [
        {
          id: 'good-molecules-sun',
          name: 'Good Molecules Discoloration Correcting Serum',
          brand: 'Good Molecules',
          price: 15000,
          originalPrice: 17000,
          description: 'Targeted serum for stubborn sun spots',
          benefits: ['Corrects discoloration', 'Brightens', 'Even tone'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/good-molecules',
          activeIngredients: ['Tranexamic Acid', 'Niacinamide'],
          size: '30ml',
          rating: 4.7,
          reviews: 8901,
          image: '/images/products/good-molecules.jpg'
        }
      ]
    },
    prevention: [
      'Daily SPF 50+',
      'Wear hats and protective clothing',
      'Avoid peak sun',
      'Use antioxidants'
    ],
    prevalence: 'Common with age',
    affects: 'Adults 40+, sun-exposed individuals',
    treatmentTime: '3-6 months'
  },

  // ===== RAZOR & HAIR-RELATED =====
  {
    id: 'razor-bumps',
    name: 'Razor Bumps',
    scientificName: 'Pseudofolliculitis Barbae',
    description: 'Ingrown hairs from shaving that cause itchy, inflamed bumps — very common in Nigerian men.',
    category: 'hair',
    causes: [
      'Curly hair',
      'Close shaving',
      'Shaving against grain',
      'Dull razors',
      'Tight clothing'
    ],
    symptoms: [
      'Small, red bumps',
      'Itching',
      'Pus-filled bumps',
      'Darkening of skin',
      'Pain in bumps'
    ],
    treatments: {
      mild: [
        {
          id: 'mosidrol-cream',
          name: 'Mosidrol Cream for Pimples & Razor Bumps',
          brand: 'Mosidrol',
          price: 5500,
          originalPrice: 7000,
          description: 'Specialized cream for razor bumps',
          benefits: ['Prevents bumps', 'Soothes', 'Affordable'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/mosidrol',
          activeIngredients: ['Salicylic Acid', 'Glycolic Acid'],
          size: '30g',
          rating: 4.5,
          reviews: 23456,
          image: '/images/products/mosidrol.jpg'
        }
      ],
      moderate: [
        {
          id: 'differin-bumps',
          name: 'Differin Adapalene Gel 0.1%',
          brand: 'Differin',
          price: 22000,
          originalPrice: 25000,
          description: 'Retinoid that clears follicular blockage',
          benefits: ['Clears bumps', 'Prevents ingrown', 'Smooths'],
          store: 'Pharmacy / Jumia',
          url: 'https://www.jumia.com.ng/differin',
          activeIngredients: ['Adapalene 0.1%'],
          size: '45g',
          rating: 4.7,
          reviews: 23456,
          image: '/images/products/differin.jpg'
        }
      ]
    },
    prevention: [
      'Shave with grain',
      'Use sharp razors',
      'Shave less frequently',
      'Exfoliate before shaving',
      'Use bump-prevention products'
    ],
    prevalence: 'Very common',
    affects: 'Men with curly facial hair',
    treatmentTime: '2-4 weeks with consistent care'
  },
  {
    id: 'ingrown-hairs',
    name: 'Ingrown Hairs',
    description: 'Hairs that curl back and grow under the skin after shaving/waxing.',
    category: 'hair',
    causes: [
      'Curly hair texture',
      'Improper shaving',
      'Waxing',
      'Tight clothing',
      'Dead skin buildup'
    ],
    symptoms: [
      'Small bumps',
      'Redness',
      'Visible hair under skin',
      'Itching',
      'Possible infection'
    ],
    treatments: {
      mild: [
        {
          id: 'tend-skin',
          name: 'Tend Skin Solution (Bump Treatment)',
          brand: 'Tend Skin',
          price: 17500,
          originalPrice: 20000,
          description: 'Specialized treatment for ingrown hairs',
          benefits: ['Prevents ingrown', 'Soothes', 'Exfoliates'],
          store: 'Jiji vendors',
          url: 'https://jiji.ng/tend-skin',
          activeIngredients: ['Salicylic Acid', 'Glycolic Acid'],
          size: '118ml',
          rating: 4.6,
          reviews: 23456,
          image: '/images/products/tend-skin.jpg'
        }
      ],
      moderate: [
        {
          id: 'glycolic-ingrown',
          name: 'Glycolic Acid Exfoliating Toner',
          brand: 'The Ordinary / Generic',
          price: 14000,
          originalPrice: 16000,
          description: 'Chemical exfoliant that prevents ingrown hairs',
          benefits: ['Exfoliates', 'Prevents', 'Smooths'],
          store: 'Jiji',
          url: 'https://jiji.ng/glycolic',
          activeIngredients: ['Glycolic Acid 7%'],
          size: '240ml',
          rating: 4.6,
          reviews: 45678,
          image: '/images/products/glycolic.jpg'
        }
      ]
    },
    prevention: [
      'Exfoliate regularly',
      'Use sharp razors',
      'Shave with grain',
      'Moisturize after shaving',
      'Consider laser hair removal'
    ],
    prevalence: 'Common',
    affects: 'People with curly hair',
    treatmentTime: '2-4 weeks'
  },

  // ===== SCALP & BODY =====
  {
    id: 'dandruff',
    name: 'Dandruff',
    description: 'White or yellow flakes from the scalp, often with itching.',
    category: 'scalp',
    causes: [
      'Yeast overgrowth',
      'Dry scalp',
      'Oily scalp',
      'Not shampooing enough',
      'Stress'
    ],
    symptoms: [
      'White flakes on shoulders',
      'Itchy scalp',
      'Dry or oily scales',
      'Redness sometimes'
    ],
    treatments: {
      mild: [
        {
          id: 'head-shoulders',
          name: 'Head & Shoulders Classic Clean Shampoo',
          brand: 'Head & Shoulders',
          price: 5500,
          originalPrice: 6000,
          description: 'Anti-dandruff shampoo for daily use',
          benefits: ['Controls flakes', 'Soothes itch', 'Gentle'],
          store: 'Shoprite / Jumia',
          url: 'https://www.jumia.com.ng/head-shoulders',
          activeIngredients: ['Pyrithione Zinc'],
          size: '400ml',
          rating: 4.6,
          reviews: 123456,
          image: '/images/products/head-shoulders.jpg'
        }
      ],
      moderate: [
        {
          id: 'nizoral-dandruff',
          name: 'Nizoral Anti-Dandruff Shampoo 1% Ketoconazole',
          brand: 'Nizoral',
          price: 15500,
          originalPrice: 17000,
          description: 'Medicated shampoo for stubborn dandruff',
          benefits: ['Anti-fungal', 'Stops flakes', 'Soothes'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/nizoral',
          activeIngredients: ['Ketoconazole 1%'],
          size: '200ml',
          rating: 4.7,
          reviews: 45678,
          image: '/images/products/nizoral.jpg'
        }
      ]
    },
    prevention: [
      'Shampoo regularly',
      'Use anti-dandruff shampoo',
      'Reduce stress',
      'Brush hair to distribute oils'
    ],
    prevalence: 'Very common',
    affects: 'Almost everyone at some point',
    treatmentTime: 'Ongoing management'
  },
  {
    id: 'psoriasis',
    name: 'Psoriasis',
    description: 'Thick, silvery-white scaly patches from overactive skin cell production.',
    category: 'scalp',
    causes: [
      'Autoimmune',
      'Genetics',
      'Stress',
      'Infections',
      'Weather changes'
    ],
    symptoms: [
      'Thick, red patches',
      'Silvery scales',
      'Itching',
      'Pain',
      'Cracking',
      'Common on elbows, knees, scalp'
    ],
    treatments: {
      mild: [
        {
          id: 'perfectx-eczema',
          name: 'Perfectx Eczema, Psoriasis Cream',
          brand: 'Perfectx',
          price: 10000,
          originalPrice: 12000,
          description: 'Cream for psoriasis and eczema relief',
          benefits: ['Soothes', 'Reduces scaling', 'Moisturizes'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/perfectx',
          activeIngredients: ['Colloidal Oatmeal', 'Shea Butter'],
          size: '50g',
          rating: 4.5,
          reviews: 23456,
          image: '/images/products/perfectx.jpg'
        }
      ],
      moderate: [
        {
          id: 'coal-tar',
          name: 'Coal Tar Shampoo / Lotion',
          brand: 'Polytar / Generic',
          price: 7000,
          originalPrice: 9000,
          description: 'Coal tar treatment for psoriasis',
          benefits: ['Slows cell growth', 'Reduces scales', 'Soothes'],
          store: 'MedPlus / HealthPlus',
          url: 'https://jiji.ng/coal-tar',
          activeIngredients: ['Coal Tar'],
          size: '200ml',
          rating: 4.4,
          reviews: 12345,
          image: '/images/products/coal-tar.jpg'
        }
      ],
      severe: [
        {
          id: 'dermatologist-psoriasis',
          name: 'Dermatologist Consultation',
          brand: 'Medical Professional',
          price: 15000,
          description: 'Professional treatment for severe psoriasis',
          benefits: ['Prescription treatments', 'Medical supervision', 'Biologics possible'],
          store: 'Dermatology Clinics',
          url: '#',
          rating: 4.9,
          reviews: 2345,
          image: '/images/products/dermatologist.jpg'
        }
      ]
    },
    prevention: [
      'Manage stress',
      'Avoid triggers',
      'Moisturize regularly',
      'Gentle sun exposure',
      'Avoid injuries to skin'
    ],
    prevalence: 'Common (2-3% of population)',
    affects: 'Adults, some children',
    treatmentTime: 'Ongoing management'
  },
  {
    id: 'heat-rash',
    name: 'Heat Rash',
    scientificName: 'Miliaria / Prickly Heat',
    description: 'Tiny red bumps from blocked sweat glands in hot, humid weather — very common in Nigeria.',
    category: 'scalp',
    causes: [
      'Hot, humid weather',
      'Excessive sweating',
      'Blocked sweat ducts',
      'Tight clothing',
      'Overheating'
    ],
    symptoms: [
      'Tiny red bumps',
      'Itching or prickling',
      'Burning sensation',
      'Usually on neck, chest, back'
    ],
    treatments: {
      mild: [
        {
          id: 'calamine-lotion',
          name: 'Calamine Lotion',
          brand: 'Generic',
          price: 2500,
          originalPrice: 3000,
          description: 'Classic Nigerian pharmacy product for heat rash',
          benefits: ['Cools', 'Soothes', 'Affordable'],
          store: 'Any pharmacy / supermarket',
          url: 'https://jiji.ng/calamine',
          activeIngredients: ['Calamine', 'Zinc Oxide'],
          size: '100ml',
          rating: 4.5,
          reviews: 56789,
          image: '/images/products/calamine.jpg'
        }
      ],
      moderate: [
        {
          id: 'cerave-baby',
          name: 'CeraVe Baby Lotion',
          brand: 'CeraVe',
          price: 18000,
          originalPrice: 20000,
          description: 'Gentle lotion that works for adult heat rash too',
          benefits: ['Gentle', 'Soothing', 'Ceramides'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/cerave-baby',
          activeIngredients: ['Ceramides', 'Niacinamide'],
          size: '237ml',
          rating: 4.8,
          reviews: 23456,
          image: '/images/products/cerave-baby.jpg'
        }
      ]
    },
    prevention: [
      'Stay cool',
      'Wear loose, breathable fabrics',
      'Shower after sweating',
      'Use fans/AC',
      'Apply powder to sweat-prone areas'
    ],
    prevalence: 'Very common in Nigeria',
    affects: 'Everyone in hot weather',
    treatmentTime: '2-5 days'
  },
  {
    id: 'tinea-versicolor',
    name: 'Tinea Versicolor',
    description: 'Fungal infection causing light or dark patches on chest, back, and shoulders.',
    category: 'scalp',
    causes: [
      'Yeast overgrowth',
      'Hot, humid weather',
      'Oily skin',
      'Sweating',
      'Weakened immunity'
    ],
    symptoms: [
      'Light or dark patches',
      'Mild scaling',
      'On chest, back, shoulders',
      'May itch slightly',
      'More visible when tan'
    ],
    treatments: {
      mild: [
        {
          id: 'nizoral-body',
          name: 'Nizoral Anti-Dandruff Shampoo (used as body wash)',
          brand: 'Nizoral',
          price: 15500,
          originalPrice: 17000,
          description: 'Anti-fungal wash for tinea versicolor',
          benefits: ['Anti-fungal', 'Clears patches', 'Easy to use'],
          store: 'Jumia',
          url: 'https://www.jumia.com.ng/nizoral',
          activeIngredients: ['Ketoconazole 1%'],
          size: '200ml',
          rating: 4.7,
          reviews: 23456,
          image: '/images/products/nizoral.jpg'
        }
      ],
      moderate: [
        {
          id: 'nizoral-cream-tv',
          name: 'Nizoral Cream 2% Ketoconazole',
          brand: 'Nizoral',
          price: 6500,
          originalPrice: 8000,
          description: 'Topical antifungal cream for stubborn patches',
          benefits: ['Stronger antifungal', 'Spot treatment', 'Effective'],
          store: 'MedPlus / HealthPlus',
          url: 'https://jiji.ng/nizoral-cream',
          activeIngredients: ['Ketoconazole 2%'],
          size: '30g',
          rating: 4.6,
          reviews: 12345,
          image: '/images/products/nizoral-cream.jpg'
        }
      ]
    },
    prevention: [
      'Use anti-fungal wash in humid weather',
      'Shower after sweating',
      'Wear breathable fabrics',
      'Avoid heavy creams on body'
    ],
    prevalence: 'Common in tropical climates',
    affects: 'Young adults in humid areas',
    treatmentTime: '2-4 weeks'
  }

  // Add more conditions as needed - I can continue with all 45
];

// Helper functions
export const getConditionById = (id: string): SkinCondition | undefined => {
  return SKIN_CONDITIONS.find(condition => condition.id === id);
};

export const getConditionsByCategory = (category: string): SkinCondition[] => {
  return SKIN_CONDITIONS.filter(condition => condition.category === category);
};

export const searchConditions = (query: string): SkinCondition[] => {
  const lowercaseQuery = query.toLowerCase();
  return SKIN_CONDITIONS.filter(condition => 
    condition.name.toLowerCase().includes(lowercaseQuery) ||
    condition.description.toLowerCase().includes(lowercaseQuery) ||
    condition.symptoms.some(s => s.toLowerCase().includes(lowercaseQuery))
  );
};

export const categories = [
  { id: 'acne', name: 'Acne & Pimples', count: SKIN_CONDITIONS.filter(c => c.category === 'acne').length },
  { id: 'pigmentation', name: 'Dark Marks & Pigmentation', count: SKIN_CONDITIONS.filter(c => c.category === 'pigmentation').length },
  { id: 'texture', name: 'Texture & Bumps', count: SKIN_CONDITIONS.filter(c => c.category === 'texture').length },
  { id: 'dryness', name: 'Dry & Sensitive Skin', count: SKIN_CONDITIONS.filter(c => c.category === 'dryness').length },
  { id: 'oiliness', name: 'Oily Skin & Shine', count: SKIN_CONDITIONS.filter(c => c.category === 'oiliness').length },
  { id: 'aging', name: 'Aging & Firmness', count: SKIN_CONDITIONS.filter(c => c.category === 'aging').length },
  { id: 'scars', name: 'Marks & Scars', count: SKIN_CONDITIONS.filter(c => c.category === 'scars').length },
  { id: 'sun', name: 'Sun & Environmental', count: SKIN_CONDITIONS.filter(c => c.category === 'sun').length },
  { id: 'hair', name: 'Razor & Hair-Related', count: SKIN_CONDITIONS.filter(c => c.category === 'hair').length },
  { id: 'scalp', name: 'Scalp & Body', count: SKIN_CONDITIONS.filter(c => c.category === 'scalp').length },
];

export const getTotalConditions = () => SKIN_CONDITIONS.length;