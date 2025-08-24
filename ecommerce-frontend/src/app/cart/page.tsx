'use client';

import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { ShoppingCart, Plus, Minus, Trash2, Heart, ArrowRight } from 'lucide-react';

export default function CartPage() {
  // Mock cart data
  const cartItems = [
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      price: 299.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
      color: 'Black',
      size: 'Medium'
    },
    {
      id: 2,
      name: 'Organic Cotton T-Shirt',
      price: 39.99,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop',
      color: 'White',
      size: 'Large'
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 99 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
              <p className="text-gray-600">Review your items and proceed to checkout</p>
            </div>

            <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
              {/* Cart Items */}
              <section className="lg:col-span-7">
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900">Cart Items ({cartItems.length})</h2>
                  </div>

                  <div className="divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <div key={item.id} className="p-6 flex">
                        <div className="flex-shrink-0">
                          <img
                            className="w-24 h-24 rounded-md object-center object-cover"
                            src={item.image}
                            alt={item.name}
                          />
                        </div>

                        <div className="ml-6 flex-1 flex flex-col">
                          <div className="flex">
                            <div className="min-w-0 flex-1">
                              <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                              <p className="mt-1 text-sm text-gray-500">
                                Color: {item.color} • Size: {item.size}
                              </p>
                            </div>

                            <div className="ml-4">
                              <button className="text-gray-400 hover:text-red-500 transition-colors">
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </div>

                          <div className="flex-1 pt-2 flex items-end justify-between">
                            <div className="flex items-center space-x-3">
                              <button className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-md hover:bg-gray-50">
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="text-gray-900 font-medium">{item.quantity}</span>
                              <button className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-md hover:bg-gray-50">
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>

                            <p className="text-lg font-medium text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Continue Shopping */}
                <div className="mt-6">
                  <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                    <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                    Continue Shopping
                  </button>
                </div>
              </section>

              {/* Order Summary */}
              <section className="mt-16 rounded-lg bg-white shadow-sm lg:mt-0 lg:col-span-5">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-gray-600">Subtotal</dt>
                      <dd className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-gray-600">Shipping</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                      </dd>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-gray-600">Tax</dt>
                      <dd className="text-sm font-medium text-gray-900">${tax.toFixed(2)}</dd>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                      <dt className="text-base font-medium text-gray-900">Order total</dt>
                      <dd className="text-base font-medium text-gray-900">${total.toFixed(2)}</dd>
                    </div>
                  </div>

                  {shipping > 0 && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-md">
                      <p className="text-sm text-blue-800">
                        Add ${(99 - subtotal).toFixed(2)} more to get free shipping!
                      </p>
                    </div>
                  )}

                  <div className="mt-6">
                    <button className="w-full bg-blue-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                      Proceed to Checkout
                    </button>
                  </div>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                      Or{' '}
                      <button className="text-blue-600 font-medium hover:text-blue-500">
                        save for later
                      </button>
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Recommended Products */}
            <section className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">You might also like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-gray-200">
                      <img
                        src={`https://images.unsplash.com/photo-${i === 1 ? '1572635196243-4dd75fb18494' : i === 2 ? '1542291026-7eec264764ba' : i === 3 ? '1549298916-b41d501d3772' : '1560472355-b83f0e8f28b7'}?w=300&h=300&fit=crop`}
                        alt={`Product ${i}`}
                        className="h-48 w-full object-center object-cover group-hover:opacity-75"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-gray-900">Product Name {i}</h3>
                      <p className="mt-1 text-sm text-gray-500">Category</p>
                      <p className="mt-2 text-lg font-medium text-gray-900">$99.99</p>
                      <button className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}
