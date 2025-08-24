import { CartItemDto } from './cart-item.dto';

export interface CartDto {
  id: string;
  userId?: string;
  sessionId?: string;
  items: CartItemDto[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  couponCode?: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date;
}

export interface CartSummaryDto {
  itemCount: number;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
}
