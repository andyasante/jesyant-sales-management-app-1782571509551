import { Request, Response, NextFunction } from 'express';

interface ErrorResponse extends Error {
  status?: number;
}

const errorHandler = (err: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  console.error(err);

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};

export default errorHandler;