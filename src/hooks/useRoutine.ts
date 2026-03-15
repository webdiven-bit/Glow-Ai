import { useState, useEffect } from 'react';

export function useRoutine() {
  const [loading, setLoading] = useState(false);
  const [currentRoutine, setCurrentRoutine] = useState<any>(null);
  const [routines, setRoutines] = useState<any[]>([]);

  // Load saved routine from localStorage
  useEffect(() => {
    const savedRoutine = localStorage.getItem('user_routine');
    if (savedRoutine) {
      setCurrentRoutine(JSON.parse(savedRoutine));
    }

    const savedRoutines = localStorage.getItem('all_routines');
    if (savedRoutines) {
      setRoutines(JSON.parse(savedRoutines));
    }
  }, []);

  const createRoutine = async (data: any) => {
    setLoading(true);
    try {
      // Generate routine based on user inputs
      const newRoutine = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        morning: generateMorningRoutine(data),
        night: generateNightRoutine(data),
        weekly: generateWeeklyRoutine(data),
        products: generateProductRecommendations(data),
        tips: generateTips(data),
        data: data
      };

      // Save to localStorage
      localStorage.setItem('user_routine', JSON.stringify(newRoutine));
      
      // Add to routines list
      const updatedRoutines = [newRoutine, ...routines];
      localStorage.setItem('all_routines', JSON.stringify(updatedRoutines));
      
      setCurrentRoutine(newRoutine);
      setRoutines(updatedRoutines);
      
      return newRoutine;
    } catch (error) {
      console.error('Error creating routine:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateRoutine = async (routineId: string, updates: any) => {
    setLoading(true);
    try {
      const updatedRoutines = routines.map(r => 
        r.id === routineId ? { ...r, ...updates } : r
      );
      
      localStorage.setItem('all_routines', JSON.stringify(updatedRoutines));
      
      if (currentRoutine?.id === routineId) {
        const updated = updatedRoutines.find(r => r.id === routineId);
        setCurrentRoutine(updated);
        localStorage.setItem('user_routine', JSON.stringify(updated));
      }
      
      setRoutines(updatedRoutines);
    } finally {
      setLoading(false);
    }
  };

  const deleteRoutine = async (routineId: string) => {
    setLoading(true);
    try {
      const updatedRoutines = routines.filter(r => r.id !== routineId);
      localStorage.setItem('all_routines', JSON.stringify(updatedRoutines));
      
      if (currentRoutine?.id === routineId) {
        setCurrentRoutine(null);
        localStorage.removeItem('user_routine');
      }
      
      setRoutines(updatedRoutines);
    } finally {
      setLoading(false);
    }
  };

  const getRoutineById = (routineId: string) => {
    return routines.find(r => r.id === routineId);
  };

  return {
    loading,
    currentRoutine,
    routines,
    createRoutine,
    updateRoutine,
    deleteRoutine,
    getRoutineById
  };
}

// Helper functions to generate routines
function generateMorningRoutine(data: any): string[] {
  const routine = ['Cleanse with gentle foaming cleanser'];
  
  if (data.concerns?.includes('pigmentation')) {
    routine.push('Apply vitamin C serum');
  }
  
  if (data.concerns?.includes('aging')) {
    routine.push('Apply peptide serum');
  }
  
  routine.push('Moisturize with SPF 30+ sunscreen');
  routine.push('Apply eye cream');
  
  if (data.concerns?.includes('dryness')) {
    routine.splice(2, 0, 'Apply hyaluronic acid serum');
  }
  
  return routine;
}

function generateNightRoutine(data: any): string[] {
  const routine = ['Double cleanse with oil-based cleanser', 'Apply toner'];
  
  if (data.concerns?.includes('acne') || data.concerns?.includes('pores')) {
    routine.push('Apply salicylic acid treatment');
  } else if (data.concerns?.includes('aging')) {
    routine.push('Apply retinol serum');
  } else if (data.concerns?.includes('pigmentation')) {
    routine.push('Apply niacinamide serum');
  }
  
  routine.push('Use night cream');
  routine.push('Apply eye cream');
  
  if (data.skinType === 'dry' || data.concerns?.includes('dryness')) {
    routine.splice(routine.length - 1, 0, 'Apply facial oil');
  }
  
  return routine;
}

function generateWeeklyRoutine(data: any): string[] {
  const weekly = [];
  
  if (data.concerns?.includes('acne') || data.concerns?.includes('pores')) {
    weekly.push('Exfoliate with BHA (Tuesday, Friday)');
  } else {
    weekly.push('Exfoliate with AHA (Tuesday, Friday)');
  }
  
  weekly.push('Use clay mask (Saturday)');
  
  if (data.skinType === 'dry' || data.concerns?.includes('dryness')) {
    weekly.push('Apply hydrating mask (Sunday)');
  } else {
    weekly.push('Use brightening mask (Sunday)');
  }
  
  return weekly;
}

function generateProductRecommendations(data: any): any[] {
  const products = [
    { name: 'Gentle Foaming Cleanser', brand: 'Cerave', time: 'Morning & Night' }
  ];
  
  if (data.concerns?.includes('pigmentation')) {
    products.push({ name: 'Vitamin C Serum', brand: 'The Ordinary', time: 'Morning' });
  }
  
  products.push({ name: 'SPF 50 Sunscreen', brand: 'Neutrogena', time: 'Morning' });
  
  if (data.concerns?.includes('acne')) {
    products.push({ name: 'Salicylic Acid Serum', brand: 'The Ordinary', time: 'Night' });
  } else if (data.concerns?.includes('aging')) {
    products.push({ name: 'Retinol Serum', brand: 'The Ordinary', time: 'Night' });
  }
  
  products.push({ name: 'Night Cream', brand: 'Cerave', time: 'Night' });
  
  return products;
}

function generateTips(data: any): string[] {
  const tips = [
    'Always patch test new products',
    'Be consistent with your routine for best results',
    'Drink plenty of water throughout the day'
  ];
  
  if (data.skinType === 'sensitive') {
    tips.push('Avoid products with fragrance and alcohol');
  }
  
  if (data.concerns?.includes('pigmentation')) {
    tips.push('Never skip sunscreen, even on cloudy days');
  }
  
  return tips;
}