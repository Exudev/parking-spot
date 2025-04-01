import { errorCode } from "../types/types";

export type ResponseType = "response" | "info" | "error";

class AppError  {
  type: Extract<ResponseType, "error">;
  errorCode: errorCode;
  errorMessage: string;
  details?: any;

  constructor(
    type: Extract<ResponseType, "error">,
    errorCode: errorCode,
    errorMessage: string,
    details?: any
  ) {
    this.type = type;
    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}


class ValidationError extends AppError {
  constructor(errorCode: errorCode, errorMessage = "Invalid input", details?: any) {
    super("error", errorCode, errorMessage, details);
  }
}

class RepositoryError extends AppError {
  constructor(
    errorCode: errorCode,
    errorMessage: string,
    details?: any
  ) {
    super("error", errorCode, errorMessage, details);
  }
}

export { AppError, ValidationError, RepositoryError };
