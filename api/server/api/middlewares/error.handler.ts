import { Request, Response, NextFunction } from 'express';
import L from '../../common/logger';

export default function errorHandler(
  err,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void {
  const errors = err.errors || [{ message: err.message }];
  L.error(errors);
  res.status(err.status || 500).json({ errors });
}
