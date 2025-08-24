'use client';

import { ShoppingCart, Star, Users, TrendingUp } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center text-white max-w-6xl px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight animate-fade-in">
            Welcome to <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">ShopMart</span>
          </h1>
          
          <p className="text-2xl md:text-3xl mb-6 opacity-90 font-light animate-fade-in-delay-1">
            Your Premium Shopping Destination
          </p>
          
          <p className="text-xl md:text-2xl mb-12 opacity-80 max-w-3xl mx-auto animate-fade-in-delay-2">
            Discover amazing products with the best deals and fastest delivery. Shop with confidence!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-delay-3">
            <button className="group inline-flex items-center bg-white text-gray-900 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105">
              <ShoppingCart className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
              Start Shopping
              <span className="ml-3 group-hover:translate-x-1 transition-transform">→</span>
            </button>
            
            <button className="group inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-gray-900 px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 backdrop-blur-sm bg-white/10">
              <Users className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
              Join Free
              <Star className="w-6 h-6 ml-3 group-hover:rotate-12 transition-transform" />
            </button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto animate-fade-in-delay-4">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
                <TrendingUp className="w-8 h-8 text-green-400" />
                2M+
              </div>
              <div className="text-sm opacity-80">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
                <ShoppingCart className="w-8 h-8 text-blue-400" />
                10K+
              </div>
              <div className="text-sm opacity-80">Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
                <Star className="w-8 h-8 text-yellow-400" />
                99.9%
              </div>
              <div className="text-sm opacity-80">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
