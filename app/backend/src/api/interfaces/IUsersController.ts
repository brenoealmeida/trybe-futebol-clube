import { NextFunction, Request, Response } from 'express';

export default interface IUsersController {
  login(req: Request, res: Response, next: NextFunction): Promise<Response<string> | undefined>
  // getRole(req: Request, res: Response, next: NextFunction): Promise<Response<object> | undefined>
}
