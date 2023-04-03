import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';

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

  async finishMatcher(id: number) {
    await this._matchesModel.update({ inProgress: false }, { where: { id } });
  }
}
