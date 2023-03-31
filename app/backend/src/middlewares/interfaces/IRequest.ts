import { Request } from 'express';
import IData from '../../utils/interfaces/tokenInterface';

export default interface IRequest extends Request {
  user?: Omit<IData, 'password'>
}
