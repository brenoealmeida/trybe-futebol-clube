import { ModelStatic } from 'sequelize';
import Team from '../../database/models/TeamModel';
import ITeam from '../interfaces/ITeam';
import ITeamsService from '../interfaces/ITeamsService';

export default class TeamsService implements ITeamsService {
  protected model: ModelStatic<Team> = Team;

  public async getAll(): Promise<ITeam[]> {
    return this.model.findAll();
  }

  public async getById(teamId: number): Promise<ITeam | null> {
    const data = await this.model.findOne({ where: { id: teamId } });
    return data;
  }
}
