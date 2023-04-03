import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import MatchesService from '../services/MatchesService';

const MatechesRouter = Router();
const service = new MatchesService();
const controller = new MatchesController(service);

MatechesRouter.get('/', controller.getAll.bind(controller));

export default MatechesRouter;
