import { ModelStatic } from 'sequelize';
import Match from '../../database/models/MatchModel';
import Team from '../../database/models/TeamModel';
import ILeaderboard from '../interfaces/ILeaderboard';
import ILeaderboardService from '../interfaces/ILeaderboardService';
import IMatch from '../interfaces/IMatch';
import ITeam from '../interfaces/ITeam';
import TeamInfo from '../utils/TeamInfo';

export default class LeaderboardService implements ILeaderboardService {
  protected teamModel: ModelStatic<Team> = Team;
  protected matchModel: ModelStatic<Match> = Match;

  private async getTeams() {
    const teams = await this.teamModel.findAll();
    return teams.map((e) => e.dataValues);
  }

  private async getMatches() {
    const matches = await this.matchModel.findAll({ where: { inProgress: false } });
    return matches.map((e) => e.dataValues);
  }

  private static winLostOrDraw(firstTeamGoals: number, secondTeamGoals: number) {
    let totalPoints = 0;
    let totalVictories = 0;
    let totalDraws = 0;
    let totalLosses = 0;

    if (firstTeamGoals > secondTeamGoals) {
      totalPoints += 3;
      totalVictories += 1;
    } else if (firstTeamGoals === secondTeamGoals) {
      totalPoints += 1;
      totalDraws += 1;
    } else {
      totalLosses += 1;
    }

    return { totalPoints, totalVictories, totalDraws, totalLosses };
  }

  private static getHomeTeamInfo(team: ITeam, matches: IMatch[]) {
    const homeTeamInfo = new TeamInfo(team.teamName);
    matches.filter((match: IMatch) => team.id === match.homeTeamId).forEach((played: IMatch) => {
      const teste = LeaderboardService.winLostOrDraw(played.homeTeamGoals, played.awayTeamGoals);
      homeTeamInfo.totalPoints += teste.totalPoints;
      homeTeamInfo.totalVictories += teste.totalVictories;
      homeTeamInfo.totalLosses += teste.totalLosses;
      homeTeamInfo.totalDraws += teste.totalDraws;
      homeTeamInfo.totalGames += 1;
      homeTeamInfo.goalsFavor += played.homeTeamGoals;
      homeTeamInfo.goalsOwn += played.awayTeamGoals;
      homeTeamInfo.goalsBalance = homeTeamInfo.goalsFavor - homeTeamInfo.goalsOwn;
      homeTeamInfo.efficiency = Number((
        (homeTeamInfo.totalPoints / (homeTeamInfo.totalGames * 3)) * 100).toFixed(2));
    });
    return homeTeamInfo;
  }

  private static getAwayTeamInfo(team: ITeam, matches: IMatch[]) {
    const awayTeamInfo = new TeamInfo(team.teamName);
    matches.filter((match: IMatch) => team.id === match.awayTeamId).forEach((played: IMatch) => {
      const teste = LeaderboardService.winLostOrDraw(played.awayTeamGoals, played.homeTeamGoals);
      awayTeamInfo.totalPoints += teste.totalPoints;
      awayTeamInfo.totalVictories += teste.totalVictories;
      awayTeamInfo.totalLosses += teste.totalLosses;
      awayTeamInfo.totalDraws += teste.totalDraws;
      awayTeamInfo.totalGames += 1;
      awayTeamInfo.goalsFavor += played.awayTeamGoals;
      awayTeamInfo.goalsOwn += played.homeTeamGoals;
      awayTeamInfo.goalsBalance = awayTeamInfo.goalsFavor - awayTeamInfo.goalsOwn;
      awayTeamInfo.efficiency = Number((
        (awayTeamInfo.totalPoints / (awayTeamInfo.totalGames * 3)) * 100).toFixed(2));
    });
    return awayTeamInfo;
  }

  private static getAllTeamInfo(homeData: ILeaderboard[], awayData: ILeaderboard[]) {
    return homeData.map((homeTeam) => {
      const teamInfo = new TeamInfo(homeTeam.name);
      awayData.forEach((awayTeam) => {
        if (homeTeam.name === awayTeam.name) {
          teamInfo.totalPoints = awayTeam.totalPoints + homeTeam.totalPoints;
          teamInfo.totalVictories = awayTeam.totalVictories + homeTeam.totalVictories;
          teamInfo.totalLosses = awayTeam.totalLosses + homeTeam.totalLosses;
          teamInfo.totalDraws = awayTeam.totalDraws + homeTeam.totalDraws;
          teamInfo.totalGames = awayTeam.totalGames + homeTeam.totalGames;
          teamInfo.goalsFavor = awayTeam.goalsFavor + homeTeam.goalsFavor;
          teamInfo.goalsOwn = awayTeam.goalsOwn + homeTeam.goalsOwn;
          teamInfo.goalsBalance = teamInfo.goalsFavor - teamInfo.goalsOwn;
          teamInfo.efficiency = Number((
            (teamInfo.totalPoints / (teamInfo.totalGames * 3)) * 100).toFixed(2));
        }
      });
      return { ...teamInfo };
    });
  }

  public static sortData(data: ILeaderboard[]) {
    return data.sort((b, a) => {
      if (a.totalPoints === b.totalPoints) {
        if (a.totalVictories === b.totalVictories) {
          if (a.goalsBalance === b.goalsBalance) {
            return a.goalsFavor - b.goalsFavor;
          }
          return a.goalsBalance - b.goalsBalance;
        }
        return a.totalVictories - b.totalVictories;
      }
      return a.totalPoints - b.totalPoints;
    });
  }

  public async getHomeInfo() {
    const teams = await this.getTeams();
    const matches = await this.getMatches();

    const data = teams.map((team) => LeaderboardService.getHomeTeamInfo(team, matches));

    return LeaderboardService.sortData(data);
  }

  public async getAwayInfo() {
    const teams = await this.getTeams();
    const matches = await this.getMatches();

    const data = teams.map((team) => LeaderboardService.getAwayTeamInfo(team, matches));

    return LeaderboardService.sortData(data);
  }

  public async getAll() {
    const teams = await this.getTeams();
    const matches = await this.getMatches();

    const homeData = teams.map((team) => LeaderboardService.getHomeTeamInfo(team, matches));
    const awayData = teams.map((team) => LeaderboardService.getAwayTeamInfo(team, matches));

    const data = LeaderboardService.getAllTeamInfo(homeData, awayData);

    return LeaderboardService.sortData(data);
  }
}
