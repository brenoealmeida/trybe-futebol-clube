import IMatch from './IMatch';
import IMatchUpdate from './IMatchesUpdate';

export default interface IMatchesService {
  getAll(): Promise<IMatch[]>;
  getInProgress(inProgress: boolean): Promise<IMatch[]>;
  updateFinish(matchId: number): Promise<string> ;
  updateGoals(matchId: number, goals: IMatchUpdate): void;
  create(data: Omit<IMatch, 'id' | 'inProgress' | 'homeTeam' | 'awayTeam'>): Promise<IMatch>
}
