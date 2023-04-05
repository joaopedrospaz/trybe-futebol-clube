import { ICreateResult } from './MatchesInterfaces';

interface ITotalPoints {
  triunfos: number,
  empates: number
}

interface ITeamsMatcher {
  'teamId': number,
  'name': string,
  'matches': ICreateResult[]
}

interface ICalculate extends ICreateResult {
  teamId: number
}

export default ITotalPoints;
export { ITeamsMatcher, ICalculate };
