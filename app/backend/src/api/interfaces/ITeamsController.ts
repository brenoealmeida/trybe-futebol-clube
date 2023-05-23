import { NextFunction, Request, Response } from 'express';
import ITeam from './ITeam';

export default interface ITeamsController {
  getAll(req: Request, res: Response): Promise<Response<ITeam[]>>
  getById(req: Request, res: Response, next: NextFunction): Promise<Response<ITeam> | undefined>
}
