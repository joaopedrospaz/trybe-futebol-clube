import { Router } from 'express';
import VeriryLogin from '../middlewares/VeriryLogin';
import UserController from '../controllers/UsersController';
import UsersService from '../services/UsersService';
import AuthToken from '../middlewares/AuthToken';

const LoginRouter = Router();
const service = new UsersService();
const controller = new UserController(service);

LoginRouter.post('/', VeriryLogin, controller.login.bind(controller));
LoginRouter.get('/role', AuthToken, UserController.getRole.bind(controller));

export default LoginRouter;
