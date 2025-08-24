export interface CategoryDto {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  children?: CategoryDto[];
  isActive: boolean;
  displayOrder: number;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCategoryDto {
  name: string;
  slug?: string;
  description?: string;
  image?: string;
  parentId?: string;
  isActive?: boolean;
  displayOrder?: number;
  seoTitle?: string;
  seoDescription?: string;
}

export interface UpdateCategoryDto {
  name?: string;
  slug?: string;
  description?: string;
  image?: string;
  parentId?: string;
  isActive?: boolean;
  displayOrder?: number;
  seoTitle?: string;
  seoDescription?: string;
}
