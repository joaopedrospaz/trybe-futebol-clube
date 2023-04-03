import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';

export default class MatchesService {
  private _matchesModel;

  constructor() {
    this._matchesModel = Matches;
  }

  async getAll(inProgressQuery: string) {
    if (inProgressQuery === 'true') {
      const filter = await this._matchesModel.findAll(
        {
          where: { inProgress: true },
          include: [{ model: Teams, as: 'homeTeam' }, { model: Teams, as: 'awayTeam' }],
        },
      );
      return filter;
    }
    console.log('___________________');

    const all = await this._matchesModel.findAll(
      { include: [{ model: Teams, as: 'homeTeam' }, { model: Teams, as: 'awayTeam' }] },
    );
    return all;
  }
}
