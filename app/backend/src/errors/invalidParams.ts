export default class InvalidParams extends Error {
  public statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 401;
  }
}
