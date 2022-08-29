import { createSelector } from '@ngrx/store';
import { IUserState } from 'src/app/common/interfaces/user-state.interface';
import { AppState } from '../app.state';

export const selectFeature = (state: AppState) => state.user;

export const selectCurrentUser = createSelector(
  selectFeature,
  (state: IUserState) => state.currentUser,
);

export const selectCurrentUserSessionId = createSelector(
  selectFeature,
  (state: IUserState) => state.currentUserSessionId,
);
