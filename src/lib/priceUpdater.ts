import { PRODUCTS } from '@/data/products';

export interface PriceUpdateResult {
  id: string;
  name: string;
  oldPrice: number;
  newPrice: number;
  changed: boolean;
  inStock: boolean;
}

class PriceUpdater {
  private static instance: PriceUpdater;
  private updateInterval: NodeJS.Timeout | null = null;
  private products = PRODUCTS;
  private onUpdateCallbacks: ((results: PriceUpdateResult[]) => void)[] = [];
  
  static getInstance() {
    if (!PriceUpdater.instance) {
      PriceUpdater.instance = new PriceUpdater();
    }
    return PriceUpdater.instance;
  }
  
  async checkProductPrice(product: any): Promise<PriceUpdateResult> {
    if (!product.url) {
      return {
        id: product.id,
        name: product.name,
        oldPrice: product.price,
        newPrice: product.price,
        changed: false,
        inStock: true
      };
    }
    
    try {
      // Use a proxy API to avoid CORS issues
      const response = await fetch(`/api/scrape-price?url=${encodeURIComponent(product.url)}`);
      const data = await response.json();
      
      if (data.price && data.price !== product.price) {
        return {
          id: product.id,
          name: product.name,
          oldPrice: product.price,
          newPrice: data.price,
          changed: true,
          inStock: data.inStock !== false
        };
      }
      
      return {
        id: product.id,
        name: product.name,
        oldPrice: product.price,
        newPrice: product.price,
        changed: false,
        inStock: data.inStock !== false
      };
      
    } catch (error) {
      console.error(`Failed to check price for ${product.name}:`, error);
      return {
        id: product.id,
        name: product.name,
        oldPrice: product.price,
        newPrice: product.price,
        changed: false,
        inStock: true
      };
    }
  }
  
  async updateAllPrices(): Promise<PriceUpdateResult[]> {
    console.log('🔄 Starting price update for all products...');
    const results: PriceUpdateResult[] = [];
    
    for (const product of this.products) {
      const result = await this.checkProductPrice(product);
      results.push(result);
      
      if (result.changed) {
        console.log(`💰 Price changed: ${product.name} - ₦${result.oldPrice.toLocaleString()} → ₦${result.newPrice.toLocaleString()}`);
        // Update the product in the database
        await this.updateProductInDB(product.id, result);
      }
      
      // Be nice to servers - wait 1 second between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    const changedCount = results.filter(r => r.changed).length;
    console.log(`✅ Price update complete. ${changedCount} products updated.`);
    
    // Notify callbacks
    this.onUpdateCallbacks.forEach(cb => cb(results));
    
    return results;
  }
  
  async updateProductInDB(productId: string, update: PriceUpdateResult) {
    // In production, this would update your database
    // For now, we'll just store in localStorage for demo
    try {
      const priceHistory = JSON.parse(localStorage.getItem('priceHistory') || '{}');
      priceHistory[productId] = {
        ...update,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('priceHistory', JSON.stringify(priceHistory));
    } catch (error) {
      console.error('Failed to save price update:', error);
    }
  }
  
  startAutoUpdate(intervalHours: number = 6) {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
    
    console.log(`⏰ Auto-update scheduled every ${intervalHours} hours`);
    
    // Run immediately
    this.updateAllPrices();
    
    // Then run every X hours
    this.updateInterval = setInterval(() => {
      this.updateAllPrices();
    }, intervalHours * 60 * 60 * 1000);
  }
  
  stopAutoUpdate() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
      console.log('🛑 Auto-update stopped');
    }
  }
  
  onUpdate(callback: (results: PriceUpdateResult[]) => void) {
    this.onUpdateCallbacks.push(callback);
    return () => {
      this.onUpdateCallbacks = this.onUpdateCallbacks.filter(cb => cb !== callback);
    };
  }
  
  getPriceHistory(productId: string) {
    try {
      const priceHistory = JSON.parse(localStorage.getItem('priceHistory') || '{}');
      return priceHistory[productId] || null;
    } catch {
      return null;
    }
  }
}

export const priceUpdater = PriceUpdater.getInstance();