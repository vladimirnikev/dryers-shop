import { HttpService } from './http.service';
import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginData } from 'src/common/interfaces/loginData.interface';
import { UserInterface } from 'src/common/interfaces/user.interface';

@Injectable()
export class AuthService {
  private token = new BehaviorSubject<string>('')

  constructor(
    private router: Router,
    private httpService: HttpService
  ) {
    this.setToken(localStorage.getItem('token'))
  }

  setToken(value: string) {
    // const expDate = new Date(new Date().getTime() + )
    this.token.next(value)
    if (value) {
      localStorage.setItem('token', value)
    } else {
      localStorage.removeItem('token')
      this.router.navigate(['/admin', 'login']) // Redirect to admin login page
    }
  }

  getToken(): Observable<string>{
    return this.token
  }

  getTokenValue(): string {
    return this.token.getValue()
  }

  login(loginData: LoginData) {
    const response: HttpResponse<UserInterface> = this.httpService.post('users/login', loginData)
    this.setToken(response.body.user.token)
  }

  logout() {
    this.setToken(null)
  }

}
