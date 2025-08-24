'use client';

import React, { lazy, Suspense } from 'react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import LoadingSpinner, { LoadingCard } from '@/components/common/Loading';
import { Shield, Truck, Clock, Award } from 'lucide-react';

// Lazy load heavy components
const ProductGrid = lazy(() => import('@/components/common/ProductGrid'));

export default function HomePage() {
  // Mock featured products data
  const featuredProducts = [
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      category: 'Electronics',
      price: 299.99,
      originalPrice: 399.99,
      rating: 4.5,
      reviews: 128,
      image: '/api/placeholder/400/400',
      sale: true,
      discount: 25,
    },
    {
      id: 2,
      name: 'Organic Cotton T-Shirt',
      category: 'Clothing',
      price: 39.99,
      originalPrice: 59.99,
      rating: 4.7,
      reviews: 89,
      image: '/api/placeholder/400/400',
      sale: true,
      discount: 33,
    },
    {
      id: 3,
      name: 'Smart Fitness Watch',
      category: 'Electronics',
      price: 199.99,
      rating: 4.3,
      reviews: 256,
      image: '/api/placeholder/400/400',
      sale: false,
    },
    {
      id: 4,
      name: 'Eco-Friendly Water Bottle',
      category: 'Home',
      price: 24.99,
      rating: 4.8,
      reviews: 342,
      image: '/api/placeholder/400/400',
      sale: false,
    },
  ];

  const handleAddToCart = (product: any) => {
    console.log('Adding to cart:', product);
    // Implement cart functionality
  };

  const handleToggleWishlist = (product: any) => {
    console.log('Toggle wishlist:', product);
    // Implement wishlist functionality
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Welcome to <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ShopMart</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Discover amazing products with the best deals and fastest delivery. Your premium shopping destination awaits!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-colors">
                  Shop Now
                </Link>
                <Link href="/about" className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-full font-semibold transition-colors">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose ShopMart?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We provide the best shopping experience with premium quality products and exceptional service
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Free Shipping</h3>
                <p className="text-gray-600 text-sm">Free delivery on orders over $99 worldwide</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Payment</h3>
                <p className="text-gray-600 text-sm">100% secure payment with SSL encryption</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Support</h3>
                <p className="text-gray-600 text-sm">Round the clock customer support</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Guarantee</h3>
                <p className="text-gray-600 text-sm">Premium quality products with warranty</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover our handpicked selection of premium products
              </p>
            </div>

            <Suspense fallback={
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <LoadingCard count={4} />
              </div>
            }>
              <ProductGrid
                products={featuredProducts}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
              />
            </Suspense>

            <div className="text-center mt-12">
              <Link
                href="/products"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                View All Products
              </Link>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Categories</h2>
              <p className="text-gray-600">Explore our wide range of product categories</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {[
                { name: 'Electronics', icon: '📱', color: 'bg-blue-100' },
                { name: 'Fashion', icon: '👗', color: 'bg-pink-100' },
                { name: 'Home', icon: '🏠', color: 'bg-green-100' },
                { name: 'Sports', icon: '⚽', color: 'bg-orange-100' },
                { name: 'Books', icon: '📚', color: 'bg-purple-100' },
                { name: 'Beauty', icon: '💄', color: 'bg-red-100' },
              ].map((category, index) => (
                <Link
                  key={index}
                  href={`/categories?category=${encodeURIComponent(category.name.toLowerCase())}`}
                  className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105"
                >
                  <div className={`${category.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">1M+</div>
                <div className="text-blue-100">Happy Customers</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50K+</div>
                <div className="text-blue-100">Products</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">99%</div>
                <div className="text-blue-100">Satisfaction Rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-blue-100">Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and get the latest deals, new arrivals, and exclusive offers delivered to your inbox
            </p>
            
            <div className="max-w-md mx-auto flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-l-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-r-full font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
