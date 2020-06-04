import { Request, Response, NextFunction, request } from 'express';
import jwt from 'jsonwebtoken';
import { auth } from '@config/index';
import { ApplicationError } from '@shared/errors';

interface ITokenPayload {
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
    const decoded = jwt.verify(token, auth.jwt.secret);

    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new ApplicationError('Invalid JWT token', 401);
  }
}
