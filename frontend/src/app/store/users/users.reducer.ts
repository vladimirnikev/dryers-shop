import { createReducer, on, Action } from '@ngrx/store';
import { IUserState } from 'src/app/common/interfaces/user-state.interface';
import * as userActions from './users.action';

export const userInitialState: IUserState = {
  currentUser: null,
  currentUserSessionId: null,
  isLoading: false,
  error: '',
};

const reducer = createReducer(
  userInitialState,
  on(userActions.loginUser, (state: IUserState) => ({ ...state, isLoading: true })),
  on(userActions.loginUserSuccess, (state: IUserState, { user }) => ({
    ...state,
    currentUser: user,
    isLoading: false,
  })),
  on(userActions.loginUserFailed, (state: IUserState, { error }) => ({
    ...state,
    error: error.message,
    isLoading: false,
  })),

  on(userActions.logoutUser, (state: IUserState) => ({ ...state, currentUser: null })),

  on(userActions.getCurrentUser, (state: IUserState) => ({ ...state, isLoading: true })),
  on(userActions.getCurrentUserSuccess, (state: IUserState, { user }) => ({
    ...state,
    currentUser: user,
    isLoading: false,
  })),
  on(userActions.getCurrentUserFailed, (state: IUserState, { error }) => ({
    ...state,
    error: error.message,
    isLoading: false,
  })),

  on(userActions.getCurrentUserSessionId, (state: IUserState) => ({ ...state, isLoading: true })),
  on(userActions.getCurrentUserSessionIdSuccess, (state: IUserState, { sessionId }) => ({
    ...state,
    currentUserSessionId: sessionId,
    isLoading: false,
  })),
  on(userActions.getCurrentUserSessionIdFailed, (state: IUserState, { error }) => ({
    ...state,
    error: error.message,
    isLoading: false,
  })),
);

export function userReducer(state: IUserState | undefined, action: Action) {
  return reducer(state, action);
}
