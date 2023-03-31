import * as bcrypt from 'bcryptjs';
import { createToken } from '../utils/tokenFunctions';
import Users from '../database/models/usersModel';
import IUserService, { ILogin } from './interfaces/usersServiceInterfaces';

export default class UsersService implements IUserService {
  private _userMdeol;

  constructor() {
    this._userMdeol = Users;
  }

  async login(data: ILogin) {
    const { email, password } = data;
    const user = await this._userMdeol.findOne({ where: { email } });

    if (!user) throw new Error('User not found');
    const verifyPassword = bcrypt.compareSync(password, user.password);

    if (!verifyPassword) throw new Error('Password invalid');

    const { id, role, username } = user.dataValues;

    return createToken({ id, role, username, email });
  }
}
