export interface OrderItemDto {
  id: string;
  productId: string;
  variantId?: string;
  quantity: number;
  price: number;
  originalPrice: number;
  discount: number;
  total: number;
  product: {
    id: string;
    name: string;
    sku: string;
    image?: string;
  };
  variant?: {
    id: string;
    name: string;
    sku: string;
    attributes: { [key: string]: string };
  };
}
