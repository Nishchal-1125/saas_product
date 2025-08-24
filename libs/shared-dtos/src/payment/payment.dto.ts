import { PaymentStatus } from '../enums/payment-status.enum';

export interface PaymentDto {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  provider: string;
  providerId: string;
  paymentMethod: string;
  metadata?: any;
  failureReason?: string;
  refundedAmount?: number;
  createdAt: Date;
  updatedAt: Date;
  paidAt?: Date;
}

export interface PaymentMethodDto {
  id: string;
  type: string;
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}
