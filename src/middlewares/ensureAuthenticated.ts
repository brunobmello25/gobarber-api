import { Request, Response, NextFunction, request } from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';
import { ApplicationError } from '../errors';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new ApplicationError('JWT Token is missing', 401);

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new ApplicationError('Invalid JWT token', 401);
  }
}
