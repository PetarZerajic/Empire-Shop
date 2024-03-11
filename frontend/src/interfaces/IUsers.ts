export interface IUsers {
  _id: string;
  name: string;
  email: string;
  role: string;
  photo: string;
  active?: boolean;
  password?: string;
  passwordConfirm?: string;
}
export interface IUserInfo {
  data: {
    user: IUsers;
  };
}
