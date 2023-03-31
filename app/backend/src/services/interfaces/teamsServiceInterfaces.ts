export interface ITeam {
  id: number,
  teamName: string
}
export default interface TeamServiceBase {
  getAll(): Promise<ITeam[]>
  getById(id: number): Promise<ITeam | null>
}
