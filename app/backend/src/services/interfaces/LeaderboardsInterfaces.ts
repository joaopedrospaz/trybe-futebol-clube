import { ICreateResult } from './MatchesInterfaces';

interface ITotalPoints {
  triunfos: number,
  empates: number
}

interface ITeamsMatcher {
  'id': number,
  'teamName': string,
  'homeMatches'?: ICreateResult[],
  'awayMatches'?: ICreateResult[],
}

interface ICalculate extends ICreateResult {
  teamId: number
}

interface IDataLeaderBoard {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string,
}

export default ITotalPoints;
export { ITeamsMatcher, ICalculate, IDataLeaderBoard };
