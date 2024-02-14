export interface IUsers {
  data: {
    user: {
      name: string;
      email: string;
      role: string;
      active: boolean;
      password: string;
    };
  };
}
