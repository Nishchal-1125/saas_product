'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ShoppingBag, Star, Users, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isAuthenticated, user } = useAuth();

  const slides = [
    {
      id: 1,
      title: isAuthenticated ? `Welcome back, ${user?.firstName}!` : "Summer Collection 2024",
      subtitle: isAuthenticated ? "Continue your shopping journey" : "Discover the latest trends",
      description: isAuthenticated ? "Explore personalized recommendations just for you" : "Up to 50% off on selected items",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
      cta: isAuthenticated ? "Continue Shopping" : "Shop Now",
      link: "/products"
    },
    {
      id: 2,
      title: "Electronics Sale",
      subtitle: "Latest gadgets & tech",
      description: "Free shipping on orders over $100",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=600&fit=crop",
      cta: "Explore Tech",
      link: "/products?category=electronics"
    },
    {
      id: 3,
      title: "Home & Living",
      subtitle: "Transform your space",
      description: "Beautiful furniture and decor",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=600&fit=crop",
      cta: "Shop Home",
      link: "/products?category=home"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative min-h-[90vh] overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
      </div>

      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="w-full h-full bg-cover bg-center relative"
            style={{ 
              backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${slide.image})` 
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-6xl px-4">
                <div className="animate-fade-in">
                  <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                    {slide.title}
                  </h1>
                  
                  <p className="text-2xl md:text-3xl mb-6 opacity-90 font-light">
                    {slide.subtitle}
                  </p>
                  
                  <p className="text-xl md:text-2xl mb-12 opacity-80 max-w-3xl mx-auto">
                    {slide.description}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-delay-1">
                  <Link
                    href={slide.link}
                    className="group inline-flex items-center bg-white text-gray-900 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
                  >
                    <ShoppingBag className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                    {slide.cta}
                    <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  
                  {!isAuthenticated && (
                    <Link
                      href="/auth/register"
                      className="group inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-gray-900 px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 backdrop-blur-sm bg-white/10"
                    >
                      <Users className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                      Join Free
                      <Star className="w-6 h-6 ml-3 group-hover:rotate-12 transition-transform" />
                    </Link>
                  )}
                  
                  {isAuthenticated && user && (
                    <div className="bg-white/20 backdrop-blur-lg px-8 py-6 rounded-2xl border border-white/30 animate-bounce-in">
                      <p className="text-white font-bold text-xl mb-1">
                        Welcome back, {user.firstName}! 👋
                      </p>
                      <p className="text-gray-200 capitalize">
                        {user.role.toLowerCase()} Dashboard
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto animate-fade-in-delay-2">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">2M+</div>
                    <div className="text-sm opacity-80">Happy Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">10K+</div>
                    <div className="text-sm opacity-80">Products</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">99.9%</div>
                    <div className="text-sm opacity-80">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full transition-all backdrop-blur-sm hover:scale-110"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full transition-all backdrop-blur-sm hover:scale-110"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
