import { Router } from 'express';
import TeamsService from '../service/teamsService';
import TeamsController from '../controllers/teamsController';

const teamsRouter = Router();

const service = new TeamsService();
const controller = new TeamsController(service);

teamsRouter.get('/', controller.getAll.bind(controller));

export default teamsRouter;
