import NotFound from '../errors/notFound';
import UnprocessableEntity from '../errors/unprocessableEntity';
import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';
import IScore, { ICreate, ICreateResult } from './interfaces/MatchesInterfaces';

export default class MatchesService {
  private _matchesModel;

  constructor() {
    this._matchesModel = Matches;
  }

  async getAll(inProgressQuery: string) {
    if (inProgressQuery) {
      const inProgress = inProgressQuery === 'true';
      const filter = await this._matchesModel.findAll(
        {
          where: { inProgress },
          include: [{ model: Teams, as: 'homeTeam' }, { model: Teams, as: 'awayTeam' }],
        },
      );
      return filter;
    }
    const all = await this._matchesModel.findAll(
      { include: [{ model: Teams, as: 'homeTeam' }, { model: Teams, as: 'awayTeam' }] },
    );
    return all;
  }

  async finishMatcher(id: number): Promise<void> {
    await this._matchesModel.update({ inProgress: false }, { where: { id } });
  }

  async updateResultMatcher(id: number, score: IScore): Promise<void> {
    const { homeTeamGoals, awayTeamGoals } = score;
    await this._matchesModel.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
  }

  async findByID(id: number):Promise<Matches | null> {
    const team = await this._matchesModel.findByPk(id);
    return team;
  }

  async createMatcher(data: ICreate): Promise<ICreateResult> {
    const { homeTeamId, awayTeamId } = data;
    if (homeTeamId === awayTeamId) {
      throw new UnprocessableEntity('It is not possible to create a match with two equal teams');
    }
    const homeTeam = await this.findByID(homeTeamId);
    const awayTeam = await this.findByID(awayTeamId);

    if (!homeTeam || !awayTeam) throw new NotFound('There is no team with such id!');

    const insert = await this._matchesModel.create({ ...data });
    return insert;
  }
}
