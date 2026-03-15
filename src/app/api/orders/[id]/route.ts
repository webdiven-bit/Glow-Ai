import { NextResponse } from 'next/server';

// This should match the orders array from the main route
// In production, use a database
let orders: any[] = [];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const order = orders.find(o => o.id === params.id);
    
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}