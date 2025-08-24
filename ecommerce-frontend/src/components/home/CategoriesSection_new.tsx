'use client';

import Link from 'next/link';
import { Shirt, Smartphone, Home, Coffee, Book, Music, ArrowRight, TrendingUp, Package, Sparkles } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  icon: React.ReactNode;
  image: string;
  productCount: number;
  href: string;
  gradient: string;
  isPopular?: boolean;
  growth?: string;
}

const CategoriesSection = () => {
  const categories: Category[] = [
    {
      id: 1,
      name: "Fashion",
      icon: <Shirt className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
      productCount: 1234,
      href: "/categories/fashion",
      gradient: "from-pink-500 to-rose-500",
      isPopular: true,
      growth: "+15%"
    },
    {
      id: 2,
      name: "Electronics",
      icon: <Smartphone className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop",
      productCount: 856,
      href: "/categories/electronics",
      gradient: "from-blue-500 to-cyan-500",
      isPopular: true,
      growth: "+23%"
    },
    {
      id: 3,
      name: "Home & Living",
      icon: <Home className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      productCount: 967,
      href: "/categories/home",
      gradient: "from-green-500 to-emerald-500",
      growth: "+8%"
    },
    {
      id: 4,
      name: "Kitchen",
      icon: <Coffee className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      productCount: 543,
      href: "/categories/kitchen",
      gradient: "from-orange-500 to-amber-500",
      growth: "+12%"
    },
    {
      id: 5,
      name: "Books",
      icon: <Book className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      productCount: 678,
      href: "/categories/books",
      gradient: "from-indigo-500 to-purple-500",
      growth: "+5%"
    },
    {
      id: 6,
      name: "Music",
      icon: <Music className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      productCount: 234,
      href: "/categories/music",
      gradient: "from-purple-500 to-pink-500",
      growth: "+18%"
    }
  ];

  const CategoryCard = ({ category }: { category: Category }) => (
    <Link href={category.href} className="group block">
      <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-gray-100">
        {/* Popular Badge */}
        {category.isPopular && (
          <div className="absolute top-4 left-4 z-20">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 animate-pulse">
              <Sparkles className="w-3 h-3" />
              POPULAR
            </span>
          </div>
        )}

        {/* Growth Badge */}
        <div className="absolute top-4 right-4 z-20">
          <span className="bg-white/90 backdrop-blur-sm text-green-600 px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            {category.growth}
          </span>
        </div>

        {/* Background Image with Overlay */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-60 group-hover:opacity-70 transition-opacity duration-300`}></div>
          
          {/* Floating Icon */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-white/20 backdrop-blur-lg p-4 rounded-2xl group-hover:scale-110 transition-all duration-300 shadow-xl">
              <div className="text-white group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </div>
            </div>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-white text-gray-900 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transform scale-90 group-hover:scale-100 transition-transform duration-300 shadow-xl">
              <Package className="w-5 h-5" />
              Shop Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {category.name}
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-gray-600 flex items-center gap-2">
              <Package className="w-4 h-4" />
              {category.productCount.toLocaleString()} products
            </p>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="py-20 bg-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-blue-200/20 rounded-full -translate-y-1/2 -translate-x-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-green-200/20 to-yellow-200/20 rounded-full translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Explore our carefully curated categories to find exactly what you're looking for
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-delay-1">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CategoryCard category={category} />
            </div>
          ))}
        </div>

        {/* View All Categories Button */}
        <div className="text-center mt-16 animate-fade-in-delay-2">
          <Link
            href="/categories"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            <Package className="w-6 h-6" />
            View All Categories
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
