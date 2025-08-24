import { OrderStatus } from '../enums/order-status.enum';

export interface OrderStatusUpdateDto {
  status: OrderStatus;
  notes?: string;
  trackingNumber?: string;
  estimatedDelivery?: Date;
}

export interface OrderStatusHistoryDto {
  id: string;
  orderId: string;
  status: OrderStatus;
  notes?: string;
  createdAt: Date;
  createdBy: string;
}
