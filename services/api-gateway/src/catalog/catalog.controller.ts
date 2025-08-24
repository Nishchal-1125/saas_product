import { Controller, Get, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('catalog')
@Controller('catalog')
export class CatalogController {
  private readonly CATALOG_SERVICE_URL = 'http://localhost:11000';

  @Get('products')
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Products retrieved successfully' })
  async getProducts(
    @Query('category') category?: string,
    @Query('search') search?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    try {
      const queryParams = new URLSearchParams();
      if (category) queryParams.append('category', category);
      if (search) queryParams.append('search', search);
      if (minPrice !== undefined) queryParams.append('minPrice', minPrice.toString());
      if (maxPrice !== undefined) queryParams.append('maxPrice', maxPrice.toString());
      if (page !== undefined) queryParams.append('page', page.toString());
      if (limit !== undefined) queryParams.append('limit', limit.toString());

      const url = `${this.CATALOG_SERVICE_URL}/products${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new HttpException('Failed to fetch products', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      
      return await response.json();
    } catch (error: any) {
      throw new HttpException(
        error.message || 'Failed to fetch products from catalog service',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('products/categories')
  @ApiOperation({ summary: 'Get all product categories' })
  @ApiResponse({ status: 200, description: 'Categories retrieved successfully' })
  async getCategories() {
    try {
      const response = await fetch(`${this.CATALOG_SERVICE_URL}/products/categories`);
      if (!response.ok) {
        throw new HttpException('Failed to fetch categories', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      
      return await response.json();
    } catch (error: any) {
      throw new HttpException(
        error.message || 'Failed to fetch categories from catalog service',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('products/:id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiResponse({ status: 200, description: 'Product retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async getProductById(@Param('id') id: string) {
    try {
      const response = await fetch(`${this.CATALOG_SERVICE_URL}/products/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }
        throw new HttpException('Failed to fetch product', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      
      return await response.json();
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        error.message || 'Failed to fetch product from catalog service',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
