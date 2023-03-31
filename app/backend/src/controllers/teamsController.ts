import { Request, Response } from 'express';
import TeamServiceBase from '../services/interfaces/teamsServiceInterfaces';
import ITeamsController from './interfaces/teamsControllerInterfaces';

export default class TeamsController implements ITeamsController {
  private _teamsService: TeamServiceBase;

  constructor(teamsService: TeamServiceBase) {
    this._teamsService = teamsService;
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const allTeams = await this._teamsService.getAll();

    return res.status(200).json(allTeams);
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const team = await this._teamsService.getById(Number(id));
    return res.status(200).json(team);
  }
}
