import { Injectable } from '@angular/core';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { AuthService } from 'src/app/shared/services/auth.service';
import { of } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import * as userActions from './users.action';

@Injectable()
export class UsersEffects {
  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loginUser),
      switchMap(({ loginData }) =>
        this.authService.login(loginData).pipe(
          map((response) => userActions.loginUserSuccess({ user: response.user })),
          catchError((err) => of(userActions.loginUserFailed(err))),
        ),
      ),
    ),
  );

  getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getCurrentUser),
      switchMap(() =>
        this.authService.getCurrentUser().pipe(
          map((user) => userActions.getCurrentUserSuccess({ user })),
          catchError((err) => of(userActions.getCurrentUserFailed(err))),
        ),
      ),
    ),
  );

  getCurrentUserSessionId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getCurrentUserSessionId),
      switchMap(() =>
        this.userService.getCurrentUserSessionId().pipe(
          map((sessionId) => {
            return userActions.getCurrentUserSessionIdSuccess({ sessionId: sessionId.value });
          }),
          catchError((err) => {
            return of(userActions.getCurrentUserSessionIdFailed(err));
          }),
        ),
      ),
    ),
  );

  makeCallRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.makeCallRequest),
      switchMap(({ data }) =>
        this.userService.makeCallRequest(data).pipe(
          map(() => userActions.makeCallRequestSuccess()),
          catchError((err) => of(userActions.makeCallRequestFailed(err))),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserService,
  ) {}
}
