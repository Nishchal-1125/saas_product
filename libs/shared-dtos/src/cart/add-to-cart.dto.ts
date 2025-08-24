export interface AddToCartDto {
  productId: string;
  variantId?: string;
  quantity: number;
}

export interface ApplyCouponDto {
  code: string;
}

export interface RemoveFromCartDto {
  itemId: string;
}
