import { Request, Response, NextFunction } from 'express';
import { AppError, RepositoryError, ValidationError } from '../utils/errors';

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error: ', err);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: {
        statusCode: err.statusCode,
        errorCode:err.errorCode,
        errorMessage: err.errorMessage,
        details: err.details || null,
      },
    });
  } else if (err instanceof RepositoryError){
    res.status(err.statusCode).json({
      error: {
        statusCode: err.statusCode,
        errorCode:err.errorCode,
        errorMessage: err.errorMessage,
        details: err.details || null,
      },
    });
  }
    else if (err instanceof ValidationError){
      res.status(err.statusCode).json({
        error: {
          statusCode: err.statusCode,
          errorCode:err.errorCode,
          errorMessage: err.errorMessage,
          details: err.details || null,
        },
      });
  } else {
    res.status(500).json({
      error: {
        code: 500,
        message: 'Internal Server Error',
        details: null,
      },
    });
  }
};

export default errorMiddleware;
