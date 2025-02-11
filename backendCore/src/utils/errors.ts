import { errorCode } from "../types/types";

export type ResponseType = "response" | "info" | "error";

class AppError  {
  type: Extract<ResponseType, "error">;
  statusCode: number;
  errorCode: errorCode;
  errorMessage: string;
  details?: any;

  constructor(
    type: Extract<ResponseType, "error">,
    statusCode: number,
    errorCode: errorCode,
    errorMessage: string,
    details?: any
  ) {
    this.type = type;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends AppError {
  constructor(errorCode: errorCode, errorMessage = "Resource not found", details?: any) {
    super("error", 404, errorCode, errorMessage, details);
  }
}

class ValidationError extends AppError {
  constructor(errorCode: errorCode, errorMessage = "Invalid input", details?: any) {
    super("error", 400, errorCode, errorMessage, details);
  }
}

class RepositoryError extends AppError {
  constructor(
    errorCode: errorCode,
    errorMessage: string,
    statusCode: number,
    details?: any
  ) {
    super("error", statusCode, errorCode, errorMessage, details);
  }
}

export { AppError, NotFoundError, ValidationError, RepositoryError };
