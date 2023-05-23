import { Request, Response } from 'express';
import { NextFunction } from 'express-serve-static-core';
import IUsersController from '../interfaces/IUsersController';
import IUsersService from '../interfaces/IUsersService';

export default class UsersController implements IUsersController {
  private _usersService: IUsersService;

  constructor(usersService: IUsersService) {
    this._usersService = usersService;
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.body;
      const token = await this._usersService.login(user);
      return res.status(200).json({ token });
    } catch (err) {
      next(err);
    }
  }

  public static getRole(req: Request, res: Response, next: NextFunction) {
    try {
      const { data } = req.body;
      return res.status(200).json({ role: data.role });
    } catch (err) {
      next(err);
    }
  }
}
