import { useState } from 'react';

interface AnalysisResult {
  conditions: Array<{
    condition: string;
    severity: string;
    confidence: number;
  }>;
  skinTone: {
    primary_tone: string;
    undertone: string;
    melanin_level: number;
  };
  recommendations: any;
}

export function useSkinAnalysis() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [latestAnalysis, setLatestAnalysis] = useState<AnalysisResult | null>(null);

  const analyzeImage = async (imageBase64: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Mock analysis for now
      const mockResult = {
        conditions: [
          { condition: 'blackheads', severity: 'mild', confidence: 85.5 },
          { condition: 'oily_skin', severity: 'moderate', confidence: 92.0 }
        ],
        skinTone: {
          primary_tone: 'medium',
          undertone: 'warm',
          melanin_level: 45.5
        },
        recommendations: {
          products: ['Salicylic Acid Cleanser', 'Niacinamide Serum']
        }
      };
      
      setLatestAnalysis(mockResult);
      return mockResult;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const analyzeConditions = async (conditions: string[]) => {
    setLoading(true);
    setError(null);
    
    try {
      const mockResult = {
        conditions: conditions.map(c => ({
          condition: c,
          severity: 'mild',
          confidence: 75
        })),
        skinTone: {
          primary_tone: 'medium',
          undertone: 'warm',
          melanin_level: 45.5
        },
        recommendations: {
          products: ['Recommended product 1', 'Recommended product 2']
        }
      };
      
      setLatestAnalysis(mockResult);
      return mockResult;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    latestAnalysis,
    analyzeImage,
    analyzeConditions
  };
}