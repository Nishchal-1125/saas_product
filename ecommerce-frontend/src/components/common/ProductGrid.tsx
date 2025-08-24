'use client';

import React, { lazy, Suspense } from 'react';

// Lazy load the ProductCard component
const ProductCard = lazy(() => import('./ProductCard'));

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  sale?: boolean;
  discount?: number;
}

interface ProductGridProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  loading?: boolean;
}

// Loading skeleton for product cards
function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
      <div className="aspect-w-1 aspect-h-1 w-full bg-gray-200 rounded-lg mb-4 h-48"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-3 bg-gray-200 rounded w-12"></div>
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="h-5 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
}

export default function ProductGrid({ 
  products, 
  onAddToCart, 
  onToggleWishlist, 
  loading = false 
}: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-4 4 4 4M7 7l4 4-4 4" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-500">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Suspense key={product.id} fallback={<ProductCardSkeleton />}>
          <ProductCard
            product={product}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
          />
        </Suspense>
      ))}
    </div>
  );
}
