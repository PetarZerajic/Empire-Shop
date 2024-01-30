export interface IError {
  status: string;
  statusCode: number;
  message: string;
  name: string;
  stack?: string;
  path?: string;
  value?: string;
}
