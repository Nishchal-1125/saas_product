export interface CreatePaymentDto {
  orderId: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  returnUrl?: string;
  metadata?: any;
}

export interface ProcessPaymentDto {
  paymentIntentId: string;
  confirmationToken?: string;
  metadata?: any;
}
