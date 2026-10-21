import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { config } from '../config';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error('API Error:', err);

  if (err instanceof ZodError) {
    res.status(400).json({
      error: 'Validation Error',
      message: 'The submitted data failed validation requirements.',
      details: err.errors.map(e => ({
        path: e.path.join('.'),
        message: e.message,
      })),
    });
    return;
  }

  const statusCode = (err as any).statusCode || 500;
  const isDev = config.nodeEnv === 'development';

  res.status(statusCode).json({
    error: 'Internal Server Error',
    message: isDev ? err.message : 'An unexpected error occurred while processing your request.',
    ...(isDev ? { stack: err.stack } : {}),
  });
};
