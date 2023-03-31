import { Router } from 'express';
import TeamsService from '../services/teamsService';
import TeamsController from '../controllers/teamsController';

const teamsRouter = Router();

const service = new TeamsService();
const controller = new TeamsController(service);

teamsRouter.get('/', controller.getAll.bind(controller));
teamsRouter.get('/:id', controller.getById.bind(controller));

export default teamsRouter;
