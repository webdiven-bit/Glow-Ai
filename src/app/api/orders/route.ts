import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// In-memory storage for demo (replace with database in production)
let orders: any[] = [];

export async function POST(request: Request) {
  try {
    const orderData = await request.json();
    
    const order = {
      id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    orders.push(order);
    
    // Send emails in background (don't await - let them run async)
    sendAdminNotification(order).catch(console.error);
    sendCustomerConfirmation(order).catch(console.error);
    
    return NextResponse.json({ 
      success: true, 
      orderId: order.id,
      order 
    });
    
  } catch (error) {
    console.error('Order processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process order' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  
  let filteredOrders = orders;
  if (status && status !== 'all') {
    filteredOrders = orders.filter(o => o.status === status);
  }
  
  return NextResponse.json({ 
    orders: filteredOrders,
    total: filteredOrders.length 
  });
}

export async function PATCH(request: Request) {
  try {
    const { orderId, status } = await request.json();
    
    const orderIndex = orders.findIndex(o => o.id === orderId);
    if (orderIndex === -1) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    
    orders[orderIndex].status = status;
    orders[orderIndex].updatedAt = new Date().toISOString();
    
    return NextResponse.json({ 
      success: true, 
      order: orders[orderIndex] 
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
}

async function sendAdminNotification(order: any) {
  // Skip if email not configured
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.log('📧 Email not configured - admin notification skipped');
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@glowai.com';
    
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: adminEmail,
      subject: `🛍️ New Order: ${order.id}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(to right, #ec4899, #f43f5e); padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">New Order Received!</h1>
          </div>
          <div style="background: #f9fafb; padding: 20px; border-radius: 0 0 10px 10px;">
            <p><strong>Order ID:</strong> ${order.id}</p>
            <p><strong>Customer:</strong> ${order.customer.name}</p>
            <p><strong>Email:</strong> ${order.customer.email}</p>
            <p><strong>Phone:</strong> ${order.customer.phone}</p>
            <p><strong>Address:</strong> ${order.customer.address}</p>
            
            <h3 style="margin-top: 20px;">Items:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #e5e7eb;">
                  <th style="padding: 10px; text-align: left;">Product</th>
                  <th style="padding: 10px; text-align: center;">Qty</th>
                  <th style="padding: 10px; text-align: right;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${order.items.map((item: any) => `
                  <tr style="border-bottom: 1px solid #e5e7eb;">
                    <td style="padding: 10px;">${item.name}</td>
                    <td style="padding: 10px; text-align: center;">${item.quantity}</td>
                    <td style="padding: 10px; text-align: right;">₦${(item.price * item.quantity).toLocaleString()}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            
            <div style="margin-top: 20px; text-align: right;">
              <p><strong>Subtotal:</strong> ₦${order.subtotal.toLocaleString()}</p>
              <p><strong>Delivery Fee:</strong> ₦${order.deliveryFee.toLocaleString()}</p>
              <p style="font-size: 1.2em;"><strong>Total:</strong> ₦${order.total.toLocaleString()}</p>
            </div>
            
            <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
            <p><strong>Status:</strong> <span style="background: #fbbf24; padding: 5px 10px; border-radius: 5px;">${order.status}</span></p>
            
            <div style="margin-top: 30px; text-align: center;">
              <a href="${process.env.APP_URL}/dashboard/admin/orders/${order.id}" 
                 style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">
                View Order Details
              </a>
            </div>
          </div>
        </div>
      `
    });
    
    console.log('✅ Admin email sent successfully');
  } catch (error) {
    console.error('❌ Failed to send admin email:', error);
  }
}

async function sendCustomerConfirmation(order: any) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.log('📧 Email not configured - customer confirmation skipped');
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: order.customer.email,
      subject: `✅ Order Confirmation: ${order.id}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(to right, #10b981, #059669); padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">Thank You for Your Order!</h1>
          </div>
          <div style="background: #f9fafb; padding: 20px; border-radius: 0 0 10px 10px;">
            <p>Hi ${order.customer.name},</p>
            <p>We've received your order and will process it soon.</p>
            
            <h3>Order Details:</h3>
            <p><strong>Order ID:</strong> ${order.id}</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <thead>
                <tr style="background: #e5e7eb;">
                  <th style="padding: 10px; text-align: left;">Product</th>
                  <th style="padding: 10px; text-align: center;">Qty</th>
                  <th style="padding: 10px; text-align: right;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${order.items.map((item: any) => `
                  <tr style="border-bottom: 1px solid #e5e7eb;">
                    <td style="padding: 10px;">${item.name}</td>
                    <td style="padding: 10px; text-align: center;">${item.quantity}</td>
                    <td style="padding: 10px; text-align: right;">₦${(item.price * item.quantity).toLocaleString()}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            
            <div style="margin-top: 20px; text-align: right;">
              <p style="font-size: 1.2em;"><strong>Total:</strong> ₦${order.total.toLocaleString()}</p>
            </div>
            
            <p>We'll notify you when your order ships!</p>
            
            <div style="margin-top: 30px; text-align: center;">
              <a href="${process.env.APP_URL}/dashboard/orders/${order.id}" 
                 style="background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">
                Track Your Order
              </a>
            </div>
          </div>
        </div>
      `
    });
    
    console.log('✅ Customer confirmation sent successfully');
  } catch (error) {
    console.error('❌ Failed to send customer email:', error);
  }
}