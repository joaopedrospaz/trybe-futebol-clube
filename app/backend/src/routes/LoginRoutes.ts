import { Router } from 'express';
import UserController from '../controllers/LoginController';
import LoginService from '../services/LoginService';
import AuthToken from '../middlewares/AuthToken';

const LoginRouter = Router();
const service = new LoginService();
const controller = new UserController(service);

LoginRouter.post('/', controller.login.bind(controller));
LoginRouter.get('/role', AuthToken, UserController.getRole.bind(controller));

export default LoginRouter;
