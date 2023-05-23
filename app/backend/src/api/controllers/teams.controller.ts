import { NextFunction, Request, Response } from 'express';
import NotFoundError from '../errors/NotFoundError';
import ITeamsController from '../interfaces/ITeamsController';
import ITeamsService from '../interfaces/ITeamsService';

const NOT_FOUND = 'Time não encontrado';

export default class TeamsController implements ITeamsController {
  private _teamsService: ITeamsService;

  constructor(teamsService: ITeamsService) {
    this._teamsService = teamsService;
  }

  public async getAll(_req: Request, res: Response) {
    const data = await this._teamsService.getAll();
    return res.status(200).json(data);
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await this._teamsService.getById(Number(id));

      if (!data) throw new NotFoundError(NOT_FOUND);

      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}
