export interface CreateOrderDto {
  cartId?: string;
  items?: Array<{
    productId: string;
    variantId?: string;
    quantity: number;
  }>;
  shippingAddress: {
    firstName: string;
    lastName: string;
    company?: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone?: string;
  };
  billingAddress: {
    firstName: string;
    lastName: string;
    company?: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone?: string;
  };
  shippingMethod: string;
  paymentMethod: string;
  notes?: string;
  couponCode?: string;
}
