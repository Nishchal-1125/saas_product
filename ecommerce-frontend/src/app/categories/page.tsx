'use client'

import Link from 'next/link'
import { Shirt, Smartphone, Home, Coffee, Book, Music, Watch, Gamepad } from 'lucide-react'

interface Category {
  id: number
  name: string
  description: string
  icon: React.ReactNode
  image: string
  productCount: number
  href: string
  color: string
}

export default function CategoriesPage() {
  const categories: Category[] = [
    {
      id: 1,
      name: "Fashion & Clothing",
      description: "Trendy apparel for men, women, and children",
      icon: <Shirt className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
      productCount: 1234,
      href: "/products?category=fashion",
      color: "bg-pink-100 text-pink-600"
    },
    {
      id: 2,
      name: "Electronics",
      description: "Latest gadgets and electronic devices",
      icon: <Smartphone className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop",
      productCount: 856,
      href: "/products?category=electronics",
      color: "bg-blue-100 text-blue-600"
    },
    {
      id: 3,
      name: "Home & Living",
      description: "Everything for your home and garden",
      icon: <Home className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
      productCount: 967,
      href: "/products?category=home",
      color: "bg-green-100 text-green-600"
    },
    {
      id: 4,
      name: "Kitchen & Dining",
      description: "Cookware, appliances, and dining essentials",
      icon: <Coffee className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
      productCount: 543,
      href: "/products?category=kitchen",
      color: "bg-orange-100 text-orange-600"
    },
    {
      id: 5,
      name: "Books & Media",
      description: "Books, movies, music, and educational content",
      icon: <Book className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop",
      productCount: 789,
      href: "/products?category=books",
      color: "bg-purple-100 text-purple-600"
    },
    {
      id: 6,
      name: "Sports & Fitness",
      description: "Athletic gear and fitness equipment",
      icon: <Watch className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
      productCount: 425,
      href: "/products?category=sports",
      color: "bg-red-100 text-red-600"
    },
    {
      id: 7,
      name: "Gaming",
      description: "Video games, consoles, and accessories",
      icon: <Gamepad className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop",
      productCount: 312,
      href: "/products?category=gaming",
      color: "bg-indigo-100 text-indigo-600"
    },
    {
      id: 8,
      name: "Music & Audio",
      description: "Instruments, audio equipment, and accessories",
      icon: <Music className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
      productCount: 198,
      href: "/products?category=music",
      color: "bg-yellow-100 text-yellow-600"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Shop by <span className="gradient-text">Category</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Discover our wide range of product categories, carefully curated to meet all your needs
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className="group block"
              >
                <div className="card group-hover:scale-105 transition-all duration-300 overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                    <div className={`absolute top-4 left-4 p-3 rounded-full ${category.color}`}>
                      {category.icon}
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-900">
                      {category.productCount.toLocaleString()} products
                    </div>
                  </div>
                  <div className="card-body">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Featured Categories</h2>
            <p className="section-subtitle">
              Popular categories our customers love
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {categories.slice(0, 3).map((category) => (
              <Link
                key={`featured-${category.id}`}
                href={category.href}
                className="group block"
              >
                <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-colors duration-300"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                    <p className="text-gray-200 mb-3">{category.description}</p>
                    <div className="inline-flex items-center text-white font-medium">
                      Shop Now
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding hero-gradient">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contact our support team and we'll help you find the perfect product
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </section>
    </div>
  )
}
