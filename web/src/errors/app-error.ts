export class AppError extends Error {
  readonly statusCode: number;
  readonly userMessage: string;
  readonly context?: string;

  constructor(statusCode: number, userMessage: string, context?: string) {
    super(userMessage);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.userMessage = userMessage;
    this.context = context;
    Object.setPrototypeOf(this, AppError.prototype);
  }

  isUnauthorized(): boolean {
    return this.statusCode === 401;
  }

  isForbidden(): boolean {
    return this.statusCode === 403;
  }

  isNotFound(): boolean {
    return this.statusCode === 404;
  }

  isConflict(): boolean {
    return this.statusCode === 409;
  }

  isServerError(): boolean {
    return this.statusCode >= 500;
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}
