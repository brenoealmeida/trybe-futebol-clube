import { NextFunction, Request, Response, Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import TokenValidation from '../middlewares/TokenValidation';
import MatchesService from '../services/matches.service';

const MatchesRoutes = Router();

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

MatchesRoutes.get('/', (req: Request, res: Response) => matchesController.getAll(req, res));

MatchesRoutes.patch(
  '/:id/finish',
  TokenValidation.authorization,
  (req: Request, res: Response, next: NextFunction) =>
    matchesController.updateFinish(req, res, next),
);

MatchesRoutes.patch(
  '/:id',
  TokenValidation.authorization,
  (req: Request, res: Response, next: NextFunction) =>
    matchesController.updateGoals(req, res, next),
);

MatchesRoutes.post(
  '/',
  TokenValidation.authorization,
  ((req: Request, res: Response, next: NextFunction) =>
    matchesController.create(req, res, next)),
);

export default MatchesRoutes;
