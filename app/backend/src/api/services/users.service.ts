import * as bcrypt from 'bcryptjs';
import { ModelStatic } from 'sequelize';
import User from '../../database/models/UserModel';
import InvalidFomatError from '../errors/InvalidFormatError';
import IUser from '../interfaces/IUser';
import IUsersService from '../interfaces/IUsersService';
import generateToken from '../utils/JWT.functions';

const INVALID_FORMAT = 'Invalid email or password';

export default class UsersService implements IUsersService {
  protected model: ModelStatic<User> = User;

  public async login(user: IUser) {
    const data = await this.model.findOne({ where: { email: user.email } });

    if (!data || !bcrypt.compareSync(user.password, data.dataValues.password)) {
      throw new InvalidFomatError(INVALID_FORMAT);
    }

    const { email, password, role } = data.dataValues;

    const token = generateToken({
      email,
      password,
      role,
    });

    return token;
  }
}
