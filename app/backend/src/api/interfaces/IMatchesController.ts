import { NextFunction, Request, Response } from 'express';
import IMatch from './IMatch';

export default interface IMatchesController {
  getAll(req: Request, res: Response): Promise<Response<IMatch[]>>;
  updateFinish(req: Request, res: Response, next: NextFunction):
  Promise<Response<string> | undefined> ;
  updateGoals(req: Request, res: Response, next: NextFunction): Promise<Response | undefined>;
  create(req: Request, res: Response, next: NextFunction): Promise<Response<IMatch> | undefined>
}
