import { Response, Request } from 'express';
import LeaderboardsService from '../services/LeaderboardsService';
import ILeaderResult from './interfaces/LeaderBoardsInterfaces';

export default class LeaderboardsController {
  private _leaderboardsService: LeaderboardsService;

  constructor(leaderboardsService: LeaderboardsService) {
    this._leaderboardsService = leaderboardsService;
  }

  async board(req: Request, res: Response) {
    const teams = await this._leaderboardsService.getAllLeaderboards();

    const teamsLeaderBoards = teams.map((e) => this._leaderboardsService.getLeaderBoard(e));

    return res.status(200).json(LeaderboardsController.OrderLeaderBoards(teamsLeaderBoards));
  }

  async boardHome(req: Request, res: Response) {
    const teams = await this._leaderboardsService.getHomeLeaderboards();

    const teamsLeaderBoards = teams.map((e) => this._leaderboardsService.getLeaderBoard(e));

    return res.status(200).json(LeaderboardsController.OrderLeaderBoards(teamsLeaderBoards));
  }

  async boardaAway(req: Request, res: Response) {
    const teams = await this._leaderboardsService.getawayLeaderboards();

    const teamsLeaderBoards = teams.map((e) => this._leaderboardsService.getLeaderBoard(e));

    return res.status(200).json(LeaderboardsController.OrderLeaderBoards(teamsLeaderBoards));
  }

  private static OrderLeaderBoards(leaderBoard: ILeaderResult[]): ILeaderResult[] {
    const sortLeaderBoard = leaderBoard.sort((a, b) => {
      if (a.totalPoints < b.totalPoints) { return 1; }
      if (a.totalPoints > b.totalPoints) { return -1; }
      if (a.goalsBalance > b.goalsBalance) { return -1; }
      if (a.goalsBalance < b.goalsBalance) { return 1; }
      if (a.goalsFavor > b.goalsFavor) { return -1; }
      if (a.goalsFavor < b.goalsFavor) { return 1; }
      return 0;
    });
    return sortLeaderBoard;
  }
}
