'use client';

import { ShoppingCart, Star, Heart, Eye } from 'lucide-react';

export default function ProductsSection() {
  const products = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299.99,
      originalPrice: 399.99,
      rating: 4.8,
      reviews: 1247,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      badge: "BESTSELLER",
      badgeColor: "from-orange-500 to-red-500"
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199.99,
      rating: 4.6,
      reviews: 892,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      badge: "NEW",
      badgeColor: "from-green-500 to-emerald-500"
    },
    {
      id: 3,
      name: "Organic Cotton T-Shirt",
      price: 39.99,
      originalPrice: 59.99,
      rating: 4.7,
      reviews: 456,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
      badge: "SALE -33%",
      badgeColor: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
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

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-delay-1">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden border border-gray-100 animate-scale-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className={`bg-gradient-to-r ${product.badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse`}>
                  {product.badge}
                </span>
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
                    {product.rating} ({product.reviews.toLocaleString()})
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
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16 animate-fade-in-delay-2">
          <button className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
            <Eye className="w-6 h-6" />
            View All Products
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm ml-2">
              1000+ Items
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
