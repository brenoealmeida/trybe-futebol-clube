import ITeam from './ITeam';

export default interface ITeamsService {
  getAll(): Promise<ITeam[]>;
  getById(teamId: number): Promise<ITeam | null>;
}
