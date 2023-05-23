import * as bcrypt from 'bcryptjs';
import User from '../../database/models/UserModel';
import IUser from '../../api/interfaces/IUser';

const userInput: IUser = {
  email: 'jose@gmail.com',
  password: 'senhas1',
};

const hash = bcrypt.hashSync(userInput.password, 10);

const userOutput = {
  dataValues: {
    id: 3,
    email: 'jose@gmail.com',
    password: hash,
    role: 'admin',
  },
} as User;

const noEmail = {
  email: null,
  password: 'senhas',
};

const invalidEmail = {
  email: 'emailemail',
  password: 'senhas',
};

const noPassword = {
  email: 'jose@gmail.com',
  password: null,
};

const invalidPassword = {
  email: 'jose@gmail.com',
  password: '123',
};

export { userInput, userOutput, noEmail, noPassword, invalidEmail, invalidPassword };
