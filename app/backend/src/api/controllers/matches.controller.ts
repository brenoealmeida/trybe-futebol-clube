import { NextFunction, Request, Response } from 'express';
import IMatchesController from '../interfaces/IMatchesController';
import IMatchesService from '../interfaces/IMatchesService';
import MatchesValidations from '../utils/MatchesValidations';

export default class MatchesController implements IMatchesController {
  private _matchesService: IMatchesService;

  constructor(matchesService: IMatchesService) {
    this._matchesService = matchesService;
  }

  public async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (inProgress) {
      const data = await this._matchesService.getInProgress(inProgress === 'true');
      return res.status(200).json(data);
    }

    const data = await this._matchesService.getAll();
    return res.status(200).json(data);
  }

  public async updateFinish(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const message = await this._matchesService.updateFinish(Number(id));
      return res.status(200).json({ message });
    } catch (err) {
      next(err);
    }
  }

  public async updateGoals(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const goals = req.body;

      await this._matchesService.updateGoals(Number(id), goals);

      return res.status(200).json({ message: 'Updated' });
    } catch (err) {
      next(err);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newMatch = req.body;
      const { homeTeamId, awayTeamId } = newMatch;

      await MatchesValidations.teams(homeTeamId, awayTeamId);

      const data = await this._matchesService.create(newMatch);

      return res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }
}
