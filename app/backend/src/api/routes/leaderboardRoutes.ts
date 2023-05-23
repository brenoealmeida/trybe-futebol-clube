import { Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';
import LeaderboardService from '../services/leaderboard.service';

const LeaderboardRoutes = Router();

const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

LeaderboardRoutes.get('/', (req: Request, res: Response) => leaderboardController.getAll(req, res));
LeaderboardRoutes.get('/home', (req: Request, res: Response) =>
  leaderboardController.getHomeInfo(req, res));
LeaderboardRoutes.get('/away', (req: Request, res: Response) =>
  leaderboardController.getAwayInfo(req, res));

export default LeaderboardRoutes;
