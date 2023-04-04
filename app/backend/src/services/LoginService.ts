import * as bcrypt from 'bcryptjs';
import { createToken } from '../utils/tokenFunctions';
import Users from '../database/models/UsersModel';
import IUserService, { ILogin } from './interfaces/usersServiceInterfaces';
import InvalidParams from '../errors/invalidParams';
import validate from './validations/LoginValidation';

export default class UsersService implements IUserService {
  private _userMdeol;

  constructor() {
    this._userMdeol = Users;
  }

  async login(data: ILogin) {
    const { email, password } = data;
    validate(data);

    const user = await this._userMdeol.findOne({ where: { email } });
    if (!user) throw new InvalidParams('Invalid email or password');

    const verifyPassword = bcrypt.compareSync(password, user.password);
    if (!verifyPassword) throw new InvalidParams('Invalid email or password');

    const { id, role, username } = user;

    return createToken({ id, role, username, email });
  }
}
