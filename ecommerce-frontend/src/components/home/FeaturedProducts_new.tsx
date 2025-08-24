'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Star, ShoppingCart, Heart, Eye, TrendingUp, Filter, Grid, List } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  discount?: number;
}

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<'all' | 'bestseller' | 'new' | 'sale'>('all');

  // Mock data with enhanced properties
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      price: 299.99,
      originalPrice: 399.99,
      rating: 4.8,
      reviewCount: 1247,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
      category: 'Electronics',
      isBestSeller: true,
      discount: 25
    },
    {
      id: '2',
      name: 'Smart Fitness Watch',
      price: 199.99,
      rating: 4.6,
      reviewCount: 892,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
      category: 'Wearables',
      isNew: true
    },
    {
      id: '3',
      name: 'Organic Cotton T-Shirt',
      price: 39.99,
      originalPrice: 59.99,
      rating: 4.7,
      reviewCount: 456,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
      category: 'Fashion',
      discount: 33
    },
    {
      id: '4',
      name: 'Professional Camera Lens',
      price: 599.99,
      rating: 4.9,
      reviewCount: 234,
      image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=300&h=300&fit=crop',
      category: 'Photography',
      isBestSeller: true
    },
    {
      id: '5',
      name: 'Minimalist Desk Setup',
      price: 299.99,
      rating: 4.5,
      reviewCount: 678,
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=300&fit=crop',
      category: 'Furniture',
      isNew: true
    },
    {
      id: '6',
      name: 'Artisan Coffee Beans',
      price: 24.99,
      originalPrice: 34.99,
      rating: 4.8,
      reviewCount: 1123,
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop',
      category: 'Food & Beverages',
      discount: 29
    }
  ];

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = products.filter(product => {
    if (filter === 'bestseller') return product.isBestSeller;
    if (filter === 'new') return product.isNew;
    if (filter === 'sale') return product.discount;
    return true;
  });

  const ProductCard = ({ product }: { product: Product }) => (
    <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden border border-gray-100">
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.isNew && (
          <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
            NEW
          </span>
        )}
        {product.isBestSeller && (
          <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            BESTSELLER
          </span>
        )}
        {product.discount && (
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            -{product.discount}%
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 group-hover:shadow-xl">
        <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
      </button>

      {/* Product Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
          <button className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition-all transform hover:scale-110 shadow-lg">
            <Eye className="w-5 h-5" />
          </button>
          <button className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-all transform hover:scale-110 shadow-lg">
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="text-sm text-blue-600 font-medium mb-2 uppercase tracking-wide">
          {product.category}
        </div>
        
        <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {product.rating} ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-lg text-gray-500 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-2xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group">
          <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
          Add to Cart
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="h-8 bg-gray-200 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 shadow-lg animate-pulse">
                <div className="h-64 bg-gray-200 rounded-2xl mb-6"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-10 bg-gray-200 rounded-2xl"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-pink-200/20 to-yellow-200/20 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover our handpicked selection of premium products designed to elevate your lifestyle
          </p>
        </div>

        {/* Filters and View Toggle */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-12 animate-slide-up">
          <div className="flex flex-wrap gap-3">
            {[
              { key: 'all', label: 'All Products' },
              { key: 'bestseller', label: 'Best Sellers' },
              { key: 'new', label: 'New Arrivals' },
              { key: 'sale', label: 'On Sale' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key as any)}
                className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 ${
                  filter === key
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-gray-600 font-medium">View:</span>
            <div className="bg-white rounded-2xl p-1 shadow-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl transition-all ${
                  viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-xl transition-all ${
                  viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-8 animate-fade-in-delay-1 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16 animate-fade-in-delay-2">
          <Link
            href="/products"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            <Eye className="w-6 h-6" />
            View All Products
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm ml-2">
              {products.length}+ Items
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
