import { Request, Response } from 'express';
import ILeaderboard from './ILeaderboard';

export default interface ILeaderboardController {
  getHomeInfo(req: Request, res: Response): Promise<Response<ILeaderboard[]>>;
  getAwayInfo(req: Request, res: Response): Promise<Response<ILeaderboard[]>>;
  getAll(req: Request, res: Response): Promise<Response<ILeaderboard[]>>;
}
