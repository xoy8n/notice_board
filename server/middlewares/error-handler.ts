import type { Request, Response, NextFunction } from 'express';
import { HttpError } from '../errors/http-error';
import { errorResponse } from '../common/response';

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json(errorResponse(`ERR${err.statusCode}`, err.message));
  }

  console.error(err);
  return res.status(500).json(
    errorResponse('ERR500', 'Internal Server Error')
  );
}
