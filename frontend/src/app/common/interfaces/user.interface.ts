export interface UserInterface {
  user: {
    id: number;
    email?: string;
    username: string;
    name?: string;
    surname?: string;
    city?: string;
    phone?: string;
    token?: string;
  };
}

export interface IUser {
  id: number;
  email?: string;
  username: string;
  name?: string;
  surname?: string;
  city?: string;
  phone?: string;
  token?: string;
}
