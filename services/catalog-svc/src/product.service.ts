import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  
  private products = [
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      category: 'Electronics',
      price: 299.99,
      originalPrice: 399.99,
      rating: 4.5,
      reviews: 128,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      sale: true,
      discount: 25,
      description: 'High-quality wireless headphones with noise cancellation',
      inStock: true,
      stock: 15,
    },
    {
      id: 2,
      name: 'Organic Cotton T-Shirt',
      category: 'Clothing',
      price: 39.99,
      originalPrice: 59.99,
      rating: 4.7,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
      sale: true,
      discount: 33,
      description: 'Comfortable organic cotton t-shirt',
      inStock: true,
      stock: 42,
    },
    {
      id: 3,
      name: 'Smart Fitness Watch',
      category: 'Electronics',
      price: 199.99,
      rating: 4.3,
      reviews: 256,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      sale: false,
      description: 'Advanced fitness tracking with heart rate monitoring',
      inStock: true,
      stock: 8,
    },
    {
      id: 4,
      name: 'Eco-Friendly Water Bottle',
      category: 'Home',
      price: 24.99,
      rating: 4.8,
      reviews: 342,
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop',
      sale: false,
      description: 'Sustainable stainless steel water bottle',
      inStock: true,
      stock: 23,
    },
    {
      id: 5,
      name: 'Wireless Gaming Mouse',
      category: 'Electronics',
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.6,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
      sale: true,
      discount: 20,
      description: 'High-precision wireless gaming mouse',
      inStock: true,
      stock: 31,
    },
    {
      id: 6,
      name: 'Yoga Mat Pro',
      category: 'Sports',
      price: 49.99,
      rating: 4.4,
      reviews: 78,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
      sale: false,
      description: 'Premium non-slip yoga mat',
      inStock: true,
      stock: 17,
    },
  ];

  private categories = [
    { id: 1, name: 'Electronics', description: 'Latest gadgets and electronic devices', productCount: 3 },
    { id: 2, name: 'Clothing', description: 'Trendy apparel for men, women, and children', productCount: 1 },
    { id: 3, name: 'Home', description: 'Everything for your home and garden', productCount: 1 },
    { id: 4, name: 'Sports', description: 'Sports and fitness equipment', productCount: 1 },
  ];

  getAllProducts(category?: string, search?: string) {
    let filtered = this.products;
    
    if (category && category !== 'all') {
      filtered = filtered.filter(product => product.category === category);
    }
    
    if (search) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    return {
      success: true,
      data: filtered,
      total: filtered.length,
    };
  }

  getProductById(id: number) {
    const product = this.products.find(p => p.id === id);
    if (!product) {
      return {
        success: false,
        message: 'Product not found',
      };
    }
    
    return {
      success: true,
      data: product,
    };
  }

  getAllCategories() {
    return {
      success: true,
      data: this.categories,
      total: this.categories.length,
    };
  }
}
