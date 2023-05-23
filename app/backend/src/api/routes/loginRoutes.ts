import { NextFunction, Request, Response, Router } from 'express';
import UsersController from '../controllers/users.controller';
import LoginValidations from '../middlewares/LoginValidations';
import UsersService from '../services/users.service';
import TokenValidation from '../middlewares/TokenValidation';

const LoginRoutes = Router();

const userService = new UsersService();
const userController = new UsersController(userService);

LoginRoutes.post(
  '/',
  LoginValidations.fields,
  LoginValidations.email,
  (req: Request, res: Response, next: NextFunction) => (
    userController.login(req, res, next)),
);

LoginRoutes.get(
  '/role',
  TokenValidation.authorization,
  (req: Request, res: Response, next: NextFunction) => (
    UsersController.getRole(req, res, next)),
);

export default LoginRoutes;
