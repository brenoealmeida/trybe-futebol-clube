import { NextFunction, Request, Response, Router } from 'express';
import TeamsController from '../controllers/teams.controller';
import TeamsService from '../services/teams.service';

const TeamsRoutes = Router();

const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService);

TeamsRoutes.get('/', (req: Request, res: Response) => teamsController.getAll(req, res));
TeamsRoutes.get('/:id', (req: Request, res: Response, next: NextFunction) => teamsController
  .getById(req, res, next));

export default TeamsRoutes;
