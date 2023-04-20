import MatchesService from './MatchesService';
import TeamsService from './teamsService';
import { ICreateResult } from './interfaces/MatchesInterfaces';
import { IDataLeaderBoard, ITeamsMatcher } from './interfaces/LeaderboardsInterfaces';

export default class LeaderboardsService {
  private _teamsService: TeamsService;
  private _leaderBoard: ICreateResult[] | [];

  constructor(matchesService: MatchesService, teamsService: TeamsService) {
    this._teamsService = teamsService;
    this._leaderBoard = [];
  }

  async getAllLeaderboards(): Promise<ITeamsMatcher[]> {
    const teams = await this._teamsService.getAllWithMatches();

    return teams;
  }

  async getHomeLeaderboards(): Promise<ITeamsMatcher[]> {
    const all = await this.getAllLeaderboards();

    const filterHome = all.map(({ id, teamName, homeMatches }) => ({
      id,
      teamName,
      homeMatches,
    }));

    return filterHome;
  }

  async getawayLeaderboards(): Promise<ITeamsMatcher[]> {
    const all = await this.getAllLeaderboards();

    const filterHome = all.map(({ id, teamName, awayMatches }) => ({
      id,
      teamName,
      awayMatches,
    }));

    return filterHome;
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
    const { id, teamName, homeMatches, awayMatches } = teamsMatcher;

    if (homeMatches) this._leaderBoard = homeMatches;
    if (awayMatches) this._leaderBoard = awayMatches;
    if (homeMatches && awayMatches) this._leaderBoard = [...homeMatches, ...awayMatches];

    return {
      name: teamName,
      totalPoints: this.getTotalPoints(id),
      totalGames: this.getTotalGames(),
      totalVictories: this.getTotalVictories(id),
      totalDraws: this.getTotalDraws(id),
      totalLosses: this.getTotalLosses(id),
      goalsFavor: this.getGoalsFavor(id),
      goalsOwn: this.getGoalsOwn(id),
      goalsBalance: this.getGoalsBalance(id),
      efficiency: this.getEfficiency(id),
    };
  }
}
