'use client';

import { useState } from 'react';
import { Package, ChevronRight, Clock, MapPin, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Order {
  id: string;
  date: string;
  status: 'delivered' | 'processing' | 'shipped' | 'cancelled';
  total: number;
  items: number;
  products: {
    name: string;
    quantity: number;
    price: number;
    image?: string;
  }[];
}

const sampleOrders: Order[] = [
  {
    id: 'ORD-001',
    date: '2026-02-20',
    status: 'delivered',
    total: 13500,
    items: 2,
    products: [
      { name: 'Vitamin C Serum', quantity: 1, price: 6500 },
      { name: 'Niacinamide Serum', quantity: 1, price: 7000 }
    ]
  },
  {
    id: 'ORD-002',
    date: '2026-02-15',
    status: 'shipped',
    total: 18500,
    items: 1,
    products: [
      { name: 'Pro Filt\'r Foundation', quantity: 1, price: 18500 }
    ]
  },
  {
    id: 'ORD-003',
    date: '2026-02-10',
    status: 'delivered',
    total: 24500,
    items: 3,
    products: [
      { name: 'Stunna Lip Paint', quantity: 2, price: 19000 },
      { name: 'Setting Powder', quantity: 1, price: 5500 }
    ]
  }
];

const statusColors = {
  delivered: 'bg-green-100 text-green-700',
  processing: 'bg-yellow-100 text-yellow-700',
  shipped: 'bg-blue-100 text-blue-700',
  cancelled: 'bg-red-100 text-red-700'
};

export function OrderHistory() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filter, setFilter] = useState<'all' | 'delivered' | 'processing' | 'shipped'>('all');

  const filteredOrders = filter === 'all' 
    ? sampleOrders 
    : sampleOrders.filter(order => order.status === filter);

  return (
    <div className="space-y-4">
      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {['all', 'delivered', 'processing', 'shipped'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status as any)}
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
              filter === status
                ? 'bg-pink-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer"
            onClick={() => setSelectedOrder(order)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-pink-500" />
                </div>
                <div>
                  <p className="font-semibold">{order.id}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    {new Date(order.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${statusColors[order.status]}`}>
                  {order.status}
                </span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">{order.items} items</span>
              <span className="font-bold text-pink-500">₦{order.total.toLocaleString()}</span>
            </div>

            {/* Products Preview */}
            <div className="mt-4 flex gap-2">
              {order.products.map((product, i) => (
                <div key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                  {product.name} x{product.quantity}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-4">Order Details</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Order ID</span>
                  <span className="font-semibold">{selectedOrder.id}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Date</span>
                  <span>{new Date(selectedOrder.date).toLocaleDateString()}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${statusColors[selectedOrder.status]}`}>
                    {selectedOrder.status}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-semibold mb-3">Items</h4>
                  <div className="space-y-2">
                    {selectedOrder.products.map((product, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span>{product.name} x{product.quantity}</span>
                        <span>₦{product.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-pink-500">₦{selectedOrder.total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <button className="flex-1 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600">
                    Track Order
                  </button>
                  <button className="flex-1 py-3 border border-gray-200 rounded-xl hover:bg-gray-50">
                    Contact Support
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}