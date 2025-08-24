export interface PaymentIntentDto {
  id: string;
  clientSecret: string;
  amount: number;
  currency: string;
  status: string;
  orderId: string;
  paymentMethods: string[];
  metadata?: any;
}

export interface ConfirmPaymentIntentDto {
  paymentIntentId: string;
  paymentMethod: string;
  returnUrl?: string;
}
