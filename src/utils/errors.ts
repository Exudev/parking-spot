import { errorCode } from "../types/types";

class AppError extends Error {
    statusCode: number;
    details: any;
  
    constructor(message: string, statusCode: number, details?: any) {
      super(message);
      this.statusCode = statusCode;
      this.details = details;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  class NotFoundError extends AppError {
    constructor(message = 'Resource not found', details?: any) {
      super(message, 404, details);
    }
  }
  
  class ValidationError extends AppError {
    constructor(message = 'Invalid input', details?: any) {
      super(message, 400, details);
    }
  }

  class RepositoryError extends AppError {
    constructor(message: errorCode,statusCode: number, details?: any) {
      super(message, statusCode, details);
    }
  }
  
  
  export { AppError, NotFoundError, ValidationError , RepositoryError};
  