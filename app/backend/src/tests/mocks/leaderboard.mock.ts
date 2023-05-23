import IMatch from '../../api/interfaces/IMatch';
import Team from '../../database/models/TeamModel';

export const leaderboardTeamsMock: Team[] = [
  {
    id: 1,
    teamName: 'Atlético'
  } as Team,
  {
    id: 2,
    teamName: 'Bahia'
  } as Team,
  {
    id: 3,
    teamName: 'Botafogo'
  } as Team,
]


export const leaderboardMatchesMock: IMatch[] = [
  {
    id: 1,
    homeTeamId: 1,
    homeTeamGoals: 1,
    awayTeamId: 2,
    inProgress: false,
    awayTeamGoals: 1,
    awayTeam: {
      teamName: 'Bahia'
    },
    homeTeam: {
      teamName: 'Atlético'
    }
  },
  {
    id: 2,
    homeTeamId: 1,
    homeTeamGoals: 2,
    awayTeamId: 3,
    inProgress: false,
    awayTeamGoals: 1,
    awayTeam: {
      teamName: 'Botafogo'
    },
    homeTeam: {
      teamName: 'Atlético'
    }
  },
  {
    id: 3,
    homeTeamId: 2,
    homeTeamGoals: 3,
    awayTeamId: 3,
    inProgress: false,
    awayTeamGoals: 0,
    awayTeam: {
      teamName: 'Botafogo'
    },
    homeTeam: {
      teamName: 'Bahia'
    }
  },
  {
    id: 4,
    homeTeamId: 2,
    homeTeamGoals: 2,
    awayTeamId: 1,
    inProgress: false,
    awayTeamGoals: 2,
    awayTeam: {
      teamName: 'Atlético'
    },
    homeTeam: {
      teamName: 'Bahia'
    }
  },
  {
    id: 5,
    homeTeamId: 3,
    homeTeamGoals: 1,
    awayTeamId: 1,
    inProgress: false,
    awayTeamGoals: 1,
    awayTeam: {
      teamName: 'Atlético'
    },
    homeTeam: {
      teamName: 'Botafogo'
    }
  },
  {
    id: 6,
    homeTeamId: 3,
    homeTeamGoals: 3,
    awayTeamId: 2,
    inProgress: true,
    awayTeamGoals: 1,
    awayTeam: {
      teamName: 'Bahia'
    },
    homeTeam: {
      teamName: 'Botafogo'
    }
  },
]

export const leaderboardHomeMock =
  [
    {
      name: 'Atlético',
      totalPoints: 6,
      totalGames: 4,
      totalVictories: 1,
      totalDraws: 3,
      totalLosses: 1,
      goalsFavor: 6,
      goalsOwn: 5,
    },
    {
      name: 'Bahia',
      totalPoints: 5,
      totalGames: 3,
      totalVictories: 1,
      totalDraws: 2,
      totalLosses: 0,
      goalsFavor: 5,
      goalsOwn: 3,
    },
    {
      name: 'Botafogo',
      totalPoints: 1,
      totalGames: 3,
      totalVictories: 0,
      totalDraws: 1,
      totalLosses: 2,
      goalsFavor: 2,
      goalsOwn: 6,
    },
  ]

export const leaderboardAwayMock =
  [
    {
      name: 'Atlético',
      totalPoints: 6,
      totalGames: 4,
      totalVictories: 1,
      totalDraws: 3,
      totalLosses: 1,
      goalsFavor: 6,
      goalsOwn: 5,
    },
    {
      name: 'Bahia',
      totalPoints: 5,
      totalGames: 3,
      totalVictories: 1,
      totalDraws: 2,
      totalLosses: 0,
      goalsFavor: 5,
      goalsOwn: 3,
    },
    {
      name: 'Botafogo',
      totalPoints: 1,
      totalGames: 3,
      totalVictories: 0,
      totalDraws: 1,
      totalLosses: 2,
      goalsFavor: 2,
      goalsOwn: 6,
    },
  ]