export default interface IUserService {
  login(data: ILogin): Promise<string>
}
export interface ILogin {
  email: string
  password: string
}
