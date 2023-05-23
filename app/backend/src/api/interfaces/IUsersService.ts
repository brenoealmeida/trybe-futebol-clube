import IUser from './IUser';

export default interface IUsersService {
  login(user: IUser): Promise<string>;
}
