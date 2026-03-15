import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  
  if (!url) {
    return NextResponse.json({ error: 'URL required' }, { status: 400 });
  }
  
  try {
    // In production, you would use a real scraping service
    // For demo purposes, we'll simulate price changes
    
    // Generate a realistic price fluctuation (±10%)
    const basePrice = getBasePriceFromUrl(url);
    const fluctuation = (Math.random() * 20) - 10; // -10% to +10%
    const newPrice = Math.round(basePrice * (1 + fluctuation / 100));
    
    // Simulate random stock status (95% in stock)
    const inStock = Math.random() < 0.95;
    
    return NextResponse.json({
      price: newPrice,
      inStock,
      currency: 'NGN',
      lastChecked: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Scraping error:', error);
    return NextResponse.json(
      { error: 'Failed to scrape price' },
      { status: 500 }
    );
  }
}

// Helper to get a base price from URL (in production, you'd scrape the actual price)
function getBasePriceFromUrl(url: string): number {
  // Extract product ID or use consistent hashing
  const hash = url.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  // Generate a price between 5000 and 50000 based on the hash
  return 5000 + (Math.abs(hash) % 45000);
}