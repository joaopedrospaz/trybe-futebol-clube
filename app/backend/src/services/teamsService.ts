import Teams from '../database/models/TeamsModel';
import TeamServiceBase, { ITeam } from './interfaces/teamsServiceInterfaces';
import Matches from '../database/models/MatchesModel';

export default class TeamsService implements TeamServiceBase {
  private _teamModel;

  constructor() {
    this._teamModel = Teams;
  }

  async getAll(): Promise<ITeam[]> {
    const all = await this._teamModel.findAll();
    return all;
  }

  async getAllWithMatches(): Promise<ITeam[]> {
    const allTeams = await this._teamModel.findAll({
      include: [{ model: Matches, as: 'homeMatches' }, { model: Matches, as: 'awayMatches' }],
    });
    return allTeams;
  }

  async getById(id: number): Promise<ITeam | null> {
    const team = await this._teamModel.findByPk(id);
    return team;
  }
}
