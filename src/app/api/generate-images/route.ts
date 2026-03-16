import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(request: Request) {
  try {
    const { productName, brand } = await request.json();
    
    // Generate a consistent color based on product name
    const hash = productName.split('').reduce((a: number, b: string) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    const hue = Math.abs(hash) % 360;
    const bgColor = `hsl(${hue}, 80%, 95%)`;
    const textColor = `hsl(${hue}, 80%, 45%)`;
    
    // Create SVG
    const svg = `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="${bgColor}"/>
      <text x="100" y="120" font-family="Arial" font-size="60" text-anchor="middle" fill="${textColor}">🧴</text>
      <text x="100" y="160" font-family="Arial" font-size="12" text-anchor="middle" fill="${textColor}">${brand}</text>
    </svg>`;
    
    // Upload to Vercel Blob
    const blob = await put(`products/${Date.now()}.svg`, svg, {
      access: 'public',
      contentType: 'image/svg+xml',
    });
    
    return NextResponse.json({ url: blob.url });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
  }
}
