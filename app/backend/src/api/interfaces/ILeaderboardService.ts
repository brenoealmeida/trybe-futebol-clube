// import ILeaderboard from './ILeaderboard';

import ILeaderboard from './ILeaderboard';

export default interface ILeaderboardService {
  getHomeInfo(): Promise<ILeaderboard[]>;
  getAwayInfo(): Promise<ILeaderboard[]>;
  getAll(): Promise<ILeaderboard[]>;
}
