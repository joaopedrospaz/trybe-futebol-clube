import MatchesService from './MatchesService';
import TeamsService from './teamsService';
import { ICreateResult } from './interfaces/MatchesInterfaces';
import { IDataLeaderBoard, ITeamsMatcher } from './interfaces/LeaderboardsInterfaces';

export default class LeaderboardsService {
  private _teamsService: TeamsService;
  private _matchesService: MatchesService;
  private _leaderBoard: ICreateResult[] | [];

  constructor(matchesService: MatchesService, teamsService: TeamsService) {
    this._matchesService = matchesService;
    this._teamsService = teamsService;
    this._leaderBoard = [];
  }

  async getAllLeaderboards() {
    const teams = await this._teamsService.getAll();
    const matches = await this._matchesService.justGetAll();

    const teamsMatcher = teams
      .map((team) => ({
        teamId: team.id,
        name: team.teamName,
        matches: matches
          .filter((matcher) => matcher.homeTeamId === team.id || matcher.awayTeamId === team.id),
      }));
    return teamsMatcher;
  }

  async getHomeLeaderboards(): Promise<ITeamsMatcher[]> {
    const all = await this.getAllLeaderboards();

    return all.map((result) => ({
      teamId: result.teamId,
      name: result.name,
      matches: result.matches.filter((r) => r.homeTeamId === result.teamId),
    }));
  }

  async getawayLeaderboards() {
    const all = await this.getAllLeaderboards();
    return all.map((result) => ({
      teamId: result.teamId,
      name: result.name,
      matches: result.matches.filter((r) => r.awayTeamId === result.teamId),
    }));
  }

  getTotalPoints(id: number): number {
    const victories = this.getTotalVictories(id) * 3;
    const draws = this.getTotalDraws(id);

    return victories + draws;
  }

  getTotalGames(matches: ICreateResult[] = this._leaderBoard): number {
    let games = 0;
    matches.forEach((e) => {
      if (e.inProgress === false) {
        games += 1;
      }
    });
    return games;
  }

  getTotalVictories(id: number, matches: ICreateResult[] = this._leaderBoard): number {
    let victories = 0;

    matches.forEach((e) => {
      if (e.inProgress === false && e.homeTeamId === id && e.homeTeamGoals > e.awayTeamGoals) {
        victories += 1;
      }
      if (e.inProgress === false && e.awayTeamId === id && e.awayTeamGoals > e.homeTeamGoals) {
        victories += 1;
      }
    });
    return victories;
  }

  getTotalDraws(id: number, matches: ICreateResult[] = this._leaderBoard): number {
    let draws = 0;

    matches.forEach((e) => {
      if (e.inProgress === false && e.homeTeamGoals === e.awayTeamGoals) {
        draws += 1;
      }
    });
    return draws;
  }

  getTotalLosses(id: number, matches: ICreateResult[] = this._leaderBoard): number {
    let draws = 0;

    matches.forEach((e) => {
      if (e.inProgress === false && e.homeTeamId === id && e.homeTeamGoals < e.awayTeamGoals) {
        draws += 1;
      }
      if (e.inProgress === false && e.awayTeamId === id && e.awayTeamGoals < e.homeTeamGoals) {
        draws += 1;
      }
    });
    return draws;
  }

  getGoalsFavor(id: number, matches: ICreateResult[] = this._leaderBoard): number {
    let golsFavor = 0;

    matches.forEach((e) => {
      if (e.inProgress === false && e.homeTeamId === id) {
        golsFavor += e.homeTeamGoals;
      }
      if (e.inProgress === false && e.awayTeamId === id) {
        golsFavor += e.awayTeamGoals;
      }
    });
    return golsFavor;
  }

  getGoalsOwn(id: number, matches: ICreateResult[] = this._leaderBoard): number {
    let golsOwn = 0;

    matches.forEach((e) => {
      if (e.inProgress === false && e.homeTeamId === id) {
        golsOwn += e.awayTeamGoals;
      }
      if (e.inProgress === false && e.awayTeamId === id) {
        golsOwn += e.homeTeamGoals;
      }
    });
    return golsOwn;
  }

  getGoalsBalance(id: number) {
    return this.getGoalsFavor(id) - this.getGoalsOwn(id);
  }

  getEfficiency(id: number) {
    const efficiency = this.getTotalPoints(id) / (this.getTotalGames() * 3);

    return (efficiency * 100).toFixed(2);
  }

  getLeaderBoard(teamsMatcher: ITeamsMatcher): IDataLeaderBoard {
    const { teamId, name, matches } = teamsMatcher;
    this._leaderBoard = matches;

    return {
      name,
      totalPoints: this.getTotalPoints(teamId),
      totalGames: this.getTotalGames(),
      totalVictories: this.getTotalVictories(teamId),
      totalDraws: this.getTotalDraws(teamId),
      totalLosses: this.getTotalLosses(teamId),
      goalsFavor: this.getGoalsFavor(teamId),
      goalsOwn: this.getGoalsOwn(teamId),
      goalsBalance: this.getGoalsBalance(teamId),
      efficiency: this.getEfficiency(teamId),
    };
  }
}
