import { errorCode } from "../types/types";

class AppError extends Error {
    statusCode: number;
    errorCode: errorCode;
    errorMessage: string;
    details: any;
  
    constructor( statusCode: number, errorCode : errorCode, errorMessage: string, details?: any) {
      super(errorCode);
      this.statusCode = statusCode;
      this.errorCode = errorCode;
      this.errorMessage = errorMessage;
      this.details = details;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  class NotFoundError extends AppError {
    constructor( errorCode: errorCode, errorMessage = 'Resource not found', details?: any) {
      super(404,errorCode, errorMessage, details);
    }
  }
  
  class ValidationError extends AppError {
    constructor( errorCode: errorCode, errorMessage = 'Invalid input', details?: any) {
      super(400, errorCode, errorMessage, details);
    }
  }

  class RepositoryError extends AppError {
    constructor(errorCode: errorCode, errorMessage: string, statusCode: number, details?: any) {
      super(statusCode, errorCode,errorMessage , details);
    }
  }
  
  
  export { AppError, NotFoundError, ValidationError , RepositoryError};
  