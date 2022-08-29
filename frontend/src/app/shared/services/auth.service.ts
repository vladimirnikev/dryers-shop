import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginData } from 'src/app/common/interfaces/loginData.interface';
import { UserInterface } from 'src/app/common/interfaces/user.interface';
import { Location } from '@angular/common';
import { logoutUser } from 'src/app/store/users/users.action';
import { HttpService } from './http.service';

@Injectable()
export class AuthService {
  private token = new BehaviorSubject<string>('');

  constructor(
    private router: Router,
    private httpService: HttpService,
    private location: Location,
    private store$: Store,
  ) {
    this.setToken(localStorage.getItem('token'));
  }

  setToken(value: string) {
    this.token.next(value);
    if (value) {
      localStorage.setItem('token', value);
    } else {
      localStorage.removeItem('token');
      if (this.location.path().includes('admin')) {
        this.router.navigate(['/admin', 'login']);
      }
    }
  }

  getToken(): Observable<string> {
    return this.token;
  }

  getTokenValue(): string {
    return this.token.getValue();
  }

  login(loginData: LoginData): Observable<UserInterface> {
    return this.httpService.post('users/login', loginData).pipe(
      map((res: UserInterface) => {
        this.setToken(res.user.token);
        return res;
      }),
    );
  }

  logout() {
    this.setToken(null);
    this.store$.dispatch(logoutUser());
  }

  getCurrentUser(): Observable<UserInterface> {
    return this.httpService.get('users');
  }
}
