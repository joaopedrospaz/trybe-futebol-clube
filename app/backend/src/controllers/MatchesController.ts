import { NextFunction, Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  private _matchesService: MatchesService;

  constructor(matchesService: MatchesService) {
    this._matchesService = matchesService;
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    const all = await this._matchesService.getAll(inProgress as string);
    return res.status(200).json(all);
  }

  async finishMatcher(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await this._matchesService.finishMatcher(Number(id));

    return res.status(200).json({ message: 'Finished' });
  }

  async updateResultMatcher(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const score = req.body;
    await this._matchesService.updateResultMatcher(Number(id), score);

    return res.status(200).json('GOOOOOOOOOOL');
  }

  async createMatcher(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const data = req.body;
    try {
      const result = await this._matchesService.createMatcher({ ...data, inProgress: true });
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
}
