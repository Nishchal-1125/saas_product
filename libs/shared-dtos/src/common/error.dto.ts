export interface ErrorDetail {
  field?: string;
  message: string;
  code?: string;
}

export class ApiError extends Error {
  public statusCode: number;
  public errors?: ErrorDetail[];
  public isOperational: boolean;

  constructor(
    message: string,
    statusCode: number = 500,
    errors?: ErrorDetail[],
    isOperational: boolean = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = isOperational;

    // Set the prototype explicitly for proper instanceof checks
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export class ValidationError extends ApiError {
  constructor(errors: ErrorDetail[]) {
    super('Validation failed', 400, errors);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string = 'Forbidden') {
    super(message, 403);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
  }
}

export class ConflictError extends ApiError {
  constructor(message: string = 'Resource already exists') {
    super(message, 409);
  }
}
