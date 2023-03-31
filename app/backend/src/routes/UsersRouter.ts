import { Router } from 'express';
import VeriryLogin from '../middlewares/VeriryLogin';
import UserController from '../controllers/UsersController';
import UsersService from '../services/UsersService';

const UsersRouter = Router();

const service = new UsersService();
const controller = new UserController(service);

UsersRouter.post('/', VeriryLogin, controller.login.bind(controller));

export default UsersRouter;
