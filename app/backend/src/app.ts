import * as express from 'express';
import TeamsRoutes from './api/routes/teamsRoutes';
import LoginRoutes from './api/routes/loginRoutes';
import MatchesRoutes from './api/routes/matchesRoutes';
import ErrorHandler from './api/middlewares/ErrorHandler';
import LeaderboardRoutes from './api/routes/leaderboardRoutes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));

    this.app.use('/teams', TeamsRoutes);
    this.app.use('/login', LoginRoutes);
    this.app.use('/matches', MatchesRoutes);
    this.app.use('/leaderboard', LeaderboardRoutes);

    this.app.use(ErrorHandler.handle);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
