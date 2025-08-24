import React from 'react';
import { Star, Heart, ShoppingCart } from 'lucide-react';

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

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onToggleWishlist }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-gray-200">
        {product.sale && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              -{product.discount}%
            </span>
          </div>
        )}
        
        <button 
          onClick={() => onToggleWishlist?.(product)}
          className="absolute top-3 right-3 z-10 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
        >
          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
        </button>

        <img
          src={product.image}
          alt={product.name}
          className="h-48 w-full object-center object-cover group-hover:opacity-75"
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <button 
            onClick={() => onAddToCart?.(product)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Quick Add
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{product.category}</p>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
