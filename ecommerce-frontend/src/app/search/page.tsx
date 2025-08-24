'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import { Search, Filter, Star, Heart, ShoppingCart, X } from 'lucide-react';

// Search component that uses useSearchParams
function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(query);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('relevance');

  // Mock search results
  const searchResults = [
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
      description: 'High-quality wireless headphones with noise cancellation'
    },
    {
      id: 2,
      name: 'Smart Fitness Watch',
      category: 'Electronics',
      price: 199.99,
      rating: 4.3,
      reviews: 256,
      image: '/api/placeholder/400/400',
      sale: false,
      description: 'Advanced fitness tracking with heart rate monitoring'
    },
    {
      id: 3,
      name: 'Wireless Gaming Mouse',
      category: 'Electronics',
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.6,
      reviews: 156,
      image: '/api/placeholder/400/400',
      sale: true,
      discount: 20,
      description: 'Professional gaming mouse with customizable buttons'
    },
  ];

  const categories = ['Electronics', 'Clothing', 'Home', 'Sports', 'Books'];
  const brands = ['Apple', 'Samsung', 'Sony', 'Nike', 'Adidas'];

  const filteredResults = searchResults.filter(product => {
    const matchesQuery = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesFilters = selectedFilters.length === 0 || 
                          selectedFilters.some(filter => 
                            categories.includes(filter) ? product.category === filter : true
                          );
    return matchesQuery && matchesPrice && matchesFilters;
  });

  const handleFilterToggle = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const removeFilter = (filter: string) => {
    setSelectedFilters(prev => prev.filter(f => f !== filter));
  };

  const clearAllFilters = () => {
    setSelectedFilters([]);
    setPriceRange([0, 1000]);
  };

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Search Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'Search Products'}
            </h1>
            <p className="text-gray-600">
              {filteredResults.length} {filteredResults.length === 1 ? 'result' : 'results'} found
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                  {selectedFilters.length > 0 && (
                    <button
                      onClick={clearAllFilters}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Active Filters */}
                {selectedFilters.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Active Filters</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedFilters.map(filter => (
                        <span
                          key={filter}
                          className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                        >
                          {filter}
                          <button
                            onClick={() => removeFilter(filter)}
                            className="ml-2 hover:text-blue-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Categories</h4>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <label key={category} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedFilters.includes(category)}
                          onChange={() => handleFilterToggle(category)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Brands</h4>
                  <div className="space-y-2">
                    {brands.map(brand => (
                      <label key={brand} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedFilters.includes(brand)}
                          onChange={() => handleFilterToggle(brand)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Price Range</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">${priceRange[0]}</span>
                      <span className="text-sm text-gray-600">-</span>
                      <span className="text-sm text-gray-600">${priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Search Bar and Sort */}
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="relevance">Most Relevant</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Best Rating</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
              </div>

              {/* Search Results */}
              {filteredResults.length > 0 ? (
                <div className="space-y-6">
                  {filteredResults.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
                      <div className="flex items-start gap-6">
                        <div className="relative flex-shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-32 h-32 object-center object-cover rounded-lg"
                          />
                          {product.sale && (
                            <span className="absolute -top-2 -left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                              -{product.discount}%
                            </span>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-xl font-medium text-gray-900 mb-2">{product.name}</h3>
                              <p className="text-gray-600 mb-2">{product.description}</p>
                              <p className="text-sm text-gray-500 mb-3">{product.category}</p>
                              
                              <div className="flex items-center mb-4">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                    />
                                  ))}
                                </div>
                                <span className="ml-2 text-sm text-gray-600">({product.reviews} reviews)</span>
                              </div>
                            </div>

                            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                              <Heart className="w-5 h-5 text-gray-600" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                              {product.originalPrice && (
                                <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                              )}
                            </div>

                            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-500 mb-4">
                    {searchQuery 
                      ? `No products match your search for "${searchQuery}"`
                      : 'Try searching for products'
                    }
                  </p>
                  <p className="text-gray-400">
                    Try adjusting your search terms or filters
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

// Main component with Suspense wrapper
export default function SearchPage() {
  return (
    <Suspense fallback={
      <MainLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading search results...</p>
          </div>
        </div>
      </MainLayout>
    }>
      <SearchResults />
    </Suspense>
  );
}
