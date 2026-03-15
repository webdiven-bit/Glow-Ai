import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for demo (in production, use a database)
// This should match the orders array from the main orders route
let orders: any[] = [];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // In Next.js 15+, params is a Promise that needs to be awaited
    const { id } = await params;
    
    // Find the order by ID
    const order = orders.find(o => o.id === id);
    
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}
