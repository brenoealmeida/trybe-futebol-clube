import NotFoundError from '../errors/NotFoundError';
import UnprocessableEntity from '../errors/UnprocessableEntity';
import TeamsService from '../services/teams.service';

const SAME_TEAM = 'It is not possible to create a match with two equal teams';
const TEAM_NOT_FOUND = 'There is no team with such id!';

export default class MatchesValidations {
  public static async teams(homeTeamId: number, awayTeamId: number) {
    if (homeTeamId === awayTeamId) {
      throw new UnprocessableEntity(SAME_TEAM);
    }

    const teamsService = new TeamsService();
    const homeTeam = await teamsService.getById(homeTeamId);
    const awayTeam = await teamsService.getById(awayTeamId);

    if (!homeTeam || !awayTeam) throw new NotFoundError(TEAM_NOT_FOUND);
  }
}
