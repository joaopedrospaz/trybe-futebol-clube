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

  async getById(id: number): Promise<ITeam | null> {
    const team = await this._teamModel.findByPk(id);
    // alterar essa tipagem usando <T>
    return team as ITeam;
  }
}
