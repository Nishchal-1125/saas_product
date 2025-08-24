export interface CreateProductDto {
  name: string;
  description: string;
  shortDescription?: string;
  sku: string;
  price: number;
  comparePrice?: number;
  costPrice?: number;
  trackInventory?: boolean;
  quantity?: number;
  lowStockThreshold?: number;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  categoryIds: string[];
  attributes?: Array<{
    name: string;
    value: string;
    displayOrder?: number;
  }>;
  variants?: Array<{
    name: string;
    sku: string;
    price: number;
    quantity: number;
    attributes: { [key: string]: string };
  }>;
  isActive?: boolean;
  isFeatured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  tags?: string[];
  vendorId?: string;
}
