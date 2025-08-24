export interface UpdateProductDto {
  name?: string;
  description?: string;
  shortDescription?: string;
  price?: number;
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
  categoryIds?: string[];
  attributes?: Array<{
    id?: string;
    name: string;
    value: string;
    displayOrder?: number;
  }>;
  isActive?: boolean;
  isFeatured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  tags?: string[];
  vendorId?: string;
}
