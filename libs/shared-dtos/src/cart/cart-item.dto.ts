export interface CartItemDto {
  id: string;
  productId: string;
  variantId?: string;
  quantity: number;
  price: number;
  originalPrice: number;
  discount: number;
  product: {
    id: string;
    name: string;
    sku: string;
    image?: string;
    weight?: number;
  };
  variant?: {
    id: string;
    name: string;
    sku: string;
    attributes: { [key: string]: string };
  };
  reservedUntil?: Date;
}

export interface UpdateCartItemDto {
  quantity: number;
}
