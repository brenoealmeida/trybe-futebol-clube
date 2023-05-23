import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/JWT.functions';
import InvalidFomatError from '../errors/InvalidFormatError';

const INVALID_TOKEN = 'Token must be a valid token';
const TOKEN_NOT_FOUND = 'Token not found';

export default class TokenValidation {
  public static authorization(req: Request, _res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new InvalidFomatError(TOKEN_NOT_FOUND);
    }
    try {
      const user = verifyToken(authorization);
      req.body.data = user;

      next();
    } catch (err) {
      throw new InvalidFomatError(INVALID_TOKEN);
    }
  }
}
