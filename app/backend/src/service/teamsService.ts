import Teams from '../database/models/teamsModel';
import TeamServiceBase, { ITeam } from './interfaces/teamsServiceInterfaces';

export default class TeamsService implements TeamServiceBase {
  private _teamModel;

  constructor() {
    this._teamModel = Teams;
  }

  async getAll(): Promise<ITeam[]> {
    const all = await this._teamModel.findAll();
    return all;
  }
}
