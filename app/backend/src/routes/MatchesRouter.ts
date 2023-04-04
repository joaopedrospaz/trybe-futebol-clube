import { Router } from 'express';
import AuthToken from '../middlewares/AuthToken';
import MatchesController from '../controllers/MatchesController';
import MatchesService from '../services/MatchesService';

const MatechesRouter = Router();
const service = new MatchesService();
const controller = new MatchesController(service);

MatechesRouter.get('/', controller.getAll.bind(controller));
MatechesRouter.patch('/:id/finish', AuthToken, controller.finishMatcher.bind(controller));
MatechesRouter.patch('/:id', AuthToken, controller.updateResultMatcher.bind(controller));
MatechesRouter.post('/', AuthToken, controller.createMatcher.bind(controller));

export default MatechesRouter;
