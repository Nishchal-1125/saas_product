export interface UserProfileDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  dateOfBirth?: Date;
  preferences: {
    newsletter: boolean;
    notifications: boolean;
    language: string;
    currency: string;
  };
}

export interface UpdateProfileDto {
  firstName?: string;
  lastName?: string;
  phone?: string;
  dateOfBirth?: Date;
  preferences?: {
    newsletter?: boolean;
    notifications?: boolean;
    language?: string;
    currency?: string;
  };
}
