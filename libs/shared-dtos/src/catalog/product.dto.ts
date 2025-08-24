export interface ProductDto {
  id: string;
  name: string;
  description: string;
  shortDescription?: string;
  sku: string;
  price: number;
  comparePrice?: number;
  costPrice?: number;
  trackInventory: boolean;
  quantity: number;
  lowStockThreshold?: number;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  images: ProductImageDto[];
  categories: CategoryDto[];
  attributes: ProductAttributeDto[];
  variants: ProductVariantDto[];
  isActive: boolean;
  isFeatured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  tags: string[];
  vendorId?: string;
  createdAt: Date;
  updatedAt: Date;
}

import { CategoryDto } from './category.dto';

export interface ProductImageDto {
  id: string;
  url: string;
  alt?: string;
  position: number;
  isMain: boolean;
}

export interface ProductAttributeDto {
  id: string;
  name: string;
  value: string;
  displayOrder: number;
}

export interface ProductVariantDto {
  id: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  attributes: { [key: string]: string };
  images: ProductImageDto[];
}
