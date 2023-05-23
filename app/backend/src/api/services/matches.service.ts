import { ModelStatic } from 'sequelize';
import Match from '../../database/models/MatchModel';
import Team from '../../database/models/TeamModel';
import NotFoundError from '../errors/NotFoundError';
import IMatchUpdate from '../interfaces/IMatchesUpdate';
import IMatch from '../interfaces/IMatch';
import IMatchesService from '../interfaces/IMatchesService';

const MATCH_NOT_FOUND = 'Match not found';

export default class MatchesService implements IMatchesService {
  protected model: ModelStatic<Match> = Match;

  public async getAll() {
    return this.model.findAll({
      include: [
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
      ],
    });
  }

  public async getInProgress(inProgress: boolean) {
    return this.model.findAll({ where: { inProgress },
      include: [
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
      ],
    });
  }

  public async updateFinish(matchId: number) {
    const [updatedRows] = await this.model.update(
      {
        inProgress: false,
      },
      {
        where: { id: matchId },
      },
    );

    if (updatedRows === 0) throw new NotFoundError(MATCH_NOT_FOUND);

    return 'Finished';
  }

  public async updateGoals(matchId: number, { homeTeamGoals, awayTeamGoals }: IMatchUpdate) {
    const [updatedRows] = await this.model.update(
      {
        homeTeamGoals,
        awayTeamGoals,
      },
      {
        where: { id: matchId },
      },
    );

    if (updatedRows === 0) throw new NotFoundError(MATCH_NOT_FOUND);
  }

  public async create(newMatch: Omit<IMatch, 'id' | 'inProgress' | 'homeTeam' | 'awayTeam'>) {
    const data = await this.model.create({
      ...newMatch,
      inProgress: true,
    });

    return data;
  }
}
