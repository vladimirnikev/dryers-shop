import { HttpService } from './http.service';
import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginData } from 'src/common/interfaces/loginData.interface';
import { UserInterface } from 'src/common/interfaces/user.interface';
import { Location } from '@angular/common';

@Injectable()
export class AuthService {
  private token = new BehaviorSubject<string>('')

  constructor(
    private router: Router,
    private httpService: HttpService,
    private location: Location,
    private route: ActivatedRoute
  ) {
    // if (this.router.parseUrl.toString().includes('admin'))
    this.setToken(localStorage.getItem('token'))
  }

  setToken(value: string) {
    // const expDate = new Date(new Date().getTime() + )
    this.token.next(value)
    if (value) {
      localStorage.setItem('token', value)
    } else {
      localStorage.removeItem('token')
      if (this.location.path().includes('admin')) {
        this.router.navigate(['/admin', 'login'])
      }
    }
  }

  getToken(): Observable<string> {
    return this.token
  }

  getTokenValue(): string {
    return this.token.getValue()
  }

  login(loginData: LoginData) {
    this.httpService.post('users/login', loginData)
      .subscribe((res: UserInterface) => this.setToken(res.user.token))
  }

  logout() {
    this.setToken(null)
  }

}
