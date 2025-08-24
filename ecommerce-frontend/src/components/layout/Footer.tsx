'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  CreditCard,
  Shield,
  Truck,
  RefreshCw
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              🛒 ShopMart
            </h3>
            <p className="text-gray-300 text-sm">
              Your premium shopping destination with the best deals and fastest delivery. 
              Shop with confidence and enjoy our exceptional customer service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/categories/electronics" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/categories/clothing" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Clothing
                </Link>
              </li>
              <li>
                <Link href="/categories/home" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Home & Garden
                </Link>
              </li>
              <li>
                <Link href="/categories/sports" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Sports
                </Link>
              </li>
              <li>
                <Link href="/categories/books" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Books
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300 text-sm">
                  123 Shopping St, Commerce City, CC 12345
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300 text-sm">
                  +1 (555) 123-4567
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300 text-sm">
                  support@shopmart.com
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <h5 className="font-semibold text-sm">Free Shipping</h5>
                <p className="text-gray-400 text-xs">On orders over $99</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <RefreshCw className="h-5 w-5" />
              </div>
              <div>
                <h5 className="font-semibold text-sm">Easy Returns</h5>
                <p className="text-gray-400 text-xs">30-day return policy</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h5 className="font-semibold text-sm">Secure Payment</h5>
                <p className="text-gray-400 text-xs">100% secure checkout</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <h5 className="font-semibold text-sm">Multiple Payment</h5>
                <p className="text-gray-400 text-xs">Credit, debit & more</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} ShopMart. All rights reserved.
            </div>
            
            <div className="flex flex-wrap items-center space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">Powered by</span>
              <span className="text-blue-400 font-semibold text-sm">ShopMart Tech</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
