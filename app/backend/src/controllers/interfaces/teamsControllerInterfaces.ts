import { Request, Response } from 'express';

export default interface ITeamsController {
  getAll(req: Request, res: Response): Promise<Response>
  getById(req: Request, res: Response): Promise<Response>
}
