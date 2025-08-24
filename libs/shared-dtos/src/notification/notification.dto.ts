export interface NotificationDto {
  id: string;
  userId?: string;
  type: 'email' | 'sms' | 'push' | 'in-app';
  channel: string;
  subject?: string;
  message: string;
  data?: any;
  status: 'pending' | 'sent' | 'delivered' | 'failed';
  sentAt?: Date;
  deliveredAt?: Date;
  failureReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateNotificationDto {
  userId?: string;
  type: 'email' | 'sms' | 'push' | 'in-app';
  channel: string;
  subject?: string;
  message: string;
  data?: any;
  scheduledFor?: Date;
}
