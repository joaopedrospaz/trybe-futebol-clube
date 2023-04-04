import { NextFunction, Request, Response } from 'express';
import IRequest from '../middlewares/interfaces/IRequest';
import IUserService from '../services/interfaces/usersServiceInterfaces';
import IUserController from './interfaces/usersControllerInterfaces';

export default class UserController implements IUserController {
  private _userService: IUserService;

  constructor(userService: IUserService) {
    this._userService = userService;
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const data = req.body;
      const token = await this._userService.login(data);
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }

  static getRole(req: IRequest, res: Response): Response {
    const role = req.user?.role;
    return res.status(200).json({ role });
  }
}
