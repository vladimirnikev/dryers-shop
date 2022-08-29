import { IUser } from './user.interface';

export interface IUserState {
  currentUser: IUser | null;
  currentUserSessionId: string;
  isLoading: boolean;
  error: string;
}
