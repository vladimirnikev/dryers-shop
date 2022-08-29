import { LoginData } from 'src/app/common/interfaces/loginData.interface';
import { createAction, props } from '@ngrx/store';

export enum EUserActions {
  LoginUser = '[User] Login User',
  LoginUserSuccess = '[User] Login User Success',
  LoginUserFailed = '[User] Login User Failed',

  LogoutUser = '[User] Logout User',

  GetCurrentUser = '[User] Get Current User',
  GetCurrentUserSuccess = '[User] Get Current User Success',
  GetCurrentUserFailed = '[User] Get Current User Failed',

  GetCurrentUserSessionId = '[User] Get Current User Session Id',
  GetCurrentUserSessionIdSuccess = '[User] Get Current User Session Id Success',
  GetCurrentUserSessionIdFailed = '[User] Get Current User Session Id Failed',
}

export const loginUser = createAction(EUserActions.LoginUser, props<{ loginData: LoginData }>());
export const loginUserSuccess = createAction(EUserActions.LoginUserSuccess, props<{ user: any }>());
export const loginUserFailed = createAction(
  EUserActions.LoginUserFailed,
  props<{ error: Error }>(),
);

export const logoutUser = createAction(EUserActions.LogoutUser);

export const getCurrentUser = createAction(EUserActions.GetCurrentUser);
export const getCurrentUserSuccess = createAction(
  EUserActions.GetCurrentUserSuccess,
  props<{ user: any }>(),
);
export const getCurrentUserFailed = createAction(
  EUserActions.GetCurrentUserFailed,
  props<{ error: Error }>(),
);

export const getCurrentUserSessionId = createAction(EUserActions.GetCurrentUserSessionId);
export const getCurrentUserSessionIdSuccess = createAction(
  EUserActions.GetCurrentUserSessionIdSuccess,
  props<{ sessionId: string }>(),
);
export const getCurrentUserSessionIdFailed = createAction(
  EUserActions.GetCurrentUserSessionIdFailed,
  props<{ error: Error }>(),
);
