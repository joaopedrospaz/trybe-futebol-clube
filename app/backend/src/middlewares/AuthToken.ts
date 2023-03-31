import { NextFunction, Response } from 'express';
import IData from '../utils/interfaces/tokenInterface';
import { verifyToken } from '../utils/tokenFunctions';
import IRequest from './interfaces/IRequest';

const AuthToken = (req: IRequest, res: Response, next: NextFunction) => {
  const { authorization: token } = req.headers;
  console.log(token);

  if (!token) return res.status(401).json({ message: 'Token not found' });
  try {
    const auth = verifyToken(token);
    req.user = auth as Omit<IData, 'password'>;
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  next();
};

export default AuthToken;
