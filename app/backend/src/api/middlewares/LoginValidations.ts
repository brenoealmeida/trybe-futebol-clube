import { NextFunction, Request, Response } from 'express';
import BadRequestError from '../errors/BadRequestError';
import InvalidFomatError from '../errors/InvalidFormatError';

const BAD_REQUEST = 'All fields must be filled';
const INVALID_FORMAT = 'Invalid email or password';

export default class LoginValidations {
  public static fields(req: Request, _res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new BadRequestError(BAD_REQUEST);
      }
      if (password.length < 6) {
        throw new InvalidFomatError(INVALID_FORMAT);
      }
      next();
    } catch (err) {
      next(err);
    }
  }

  public static email(req: Request, _res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const regex = /^\S+@\S+\.\S+$/;
      if (!email.match(regex)) {
        throw new InvalidFomatError(INVALID_FORMAT);
      }
      next();
    } catch (err) {
      next(err);
    }
  }
}
