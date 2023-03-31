import * as Jwt from 'jsonwebtoken';
import IData from './interfaces/tokenInterface';

const JWT_SECRET = process.env.JWT_SECRET || 'segredo';
const CONFIG_JWT: Jwt.SignOptions = { algorithm: 'HS256', expiresIn: '5d' };

const createToken = (payload: Omit<IData, 'password' >) => {
  const result = Jwt.sign(payload, JWT_SECRET, CONFIG_JWT);
  return result;
};

const verifyToken = (token: string) => Jwt.verify(token, JWT_SECRET);

export { createToken, verifyToken };
