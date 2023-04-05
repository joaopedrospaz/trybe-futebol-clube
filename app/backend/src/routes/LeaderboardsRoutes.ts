import { Router } from 'express';
import MatchesService from '../services/MatchesService';
import TeamsService from '../services/teamsService';
import LeaderboardsController from '../controllers/LeaderboardsController';
import LeaderboardsService from '../services/LeaderboardsService';

const LeaderboardsRoutes = Router();
const matchesService = new MatchesService();
const teamsService = new TeamsService();
const service = new LeaderboardsService(matchesService, teamsService);
const controller = new LeaderboardsController(service);

LeaderboardsRoutes.get('/home', controller.board.bind(controller));

export default LeaderboardsRoutes;
