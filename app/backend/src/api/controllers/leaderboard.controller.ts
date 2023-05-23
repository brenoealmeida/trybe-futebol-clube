import { Request, Response } from 'express';
import ILeaderboardController from '../interfaces/ILeaderboardController';
import ILeaderboardService from '../interfaces/ILeaderboardService';

export default class LeaderboardController implements ILeaderboardController {
  private _leaderboardService: ILeaderboardService;

  constructor(leaderboardService: ILeaderboardService) {
    this._leaderboardService = leaderboardService;
  }

  public async getHomeInfo(_req: Request, res: Response) {
    const data = await this._leaderboardService.getHomeInfo();
    return res.status(200).json(data);
  }

  public async getAwayInfo(_req: Request, res: Response) {
    const data = await this._leaderboardService.getAwayInfo();
    return res.status(200).json(data);
  }

  public async getAll(_req: Request, res: Response) {
    const data = await this._leaderboardService.getAll();
    return res.status(200).json(data);
  }
}
