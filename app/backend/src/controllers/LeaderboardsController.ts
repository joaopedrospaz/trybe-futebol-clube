import { Response, Request } from 'express';
import LeaderboardsService from '../services/LeaderboardsService';

export default class LeaderboardsController {
  private _leaderboardsService: LeaderboardsService;

  constructor(leaderboardsService: LeaderboardsService) {
    this._leaderboardsService = leaderboardsService;
  }

  async board(req: Request, res: Response) {
    const teams = await this._leaderboardsService.getHomeLeaderboards();
    const teamsLeaderBoards = teams.map((e) => this._leaderboardsService.getLeaderBoard(e));

    const LeaderBoardsOrder = teamsLeaderBoards.sort((a, b) => {
      if (a.totalPoints < b.totalPoints) { return 1; }
      if (a.totalPoints > b.totalPoints) { return -1; }
      const saldoA = a.goalsFavor - a.goalsOwn;
      const saldoB = b.goalsFavor - b.goalsOwn;
      if (saldoA > saldoB) { return -1; }
      if (saldoA > saldoB) { return 1; }
      if (a.goalsFavor > b.goalsFavor) { return -1; }
      if (a.goalsFavor < b.goalsFavor) { return 1; }
      return 0;
    });
    return res.status(200).json(LeaderBoardsOrder);
  }
}
