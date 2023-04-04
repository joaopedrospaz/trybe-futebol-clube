export default interface IScore {
  homeTeamGoals: number,
  awayTeamGoals: number
}

interface ICreate {
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress: boolean
}
interface ICreateResult extends ICreate {
  id: number,
}
export { ICreate, ICreateResult };
