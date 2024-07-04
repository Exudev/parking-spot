import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error: ', err);

  if (err instanceof AppError) {
    // Si el error es una instancia de AppError, devuelve una respuesta con el código y mensaje adecuados
    res.status(err.statusCode).json({
      error: {
        code: err.statusCode,
        message: err.message,
        details: err.details || null,
      },
    });
  } else {
    // Si no es un AppError, maneja otros tipos de errores de manera genérica
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
