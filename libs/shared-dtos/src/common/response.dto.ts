export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
  meta?: any;
}

export class SuccessResponse<T = any> implements ApiResponse<T> {
  success = true;
  data?: T;
  message?: string;
  meta?: any;

  constructor(data?: T, message?: string, meta?: any) {
    this.data = data;
    this.message = message;
    this.meta = meta;
  }
}

export class ErrorResponse implements ApiResponse {
  success = false;
  message: string;
  errors?: string[];

  constructor(message: string, errors?: string[]) {
    this.message = message;
    this.errors = errors;
  }
}
