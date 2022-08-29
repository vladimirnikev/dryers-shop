import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { HttpService } from '../services/http.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private httpService: HttpService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot, // eslint-disable-line
    state: RouterStateSnapshot, // eslint-disable-line
  ): boolean | Observable<boolean> | Promise<boolean> {
    const token = this.authService.getTokenValue();
    if (token) {
      return this.httpService
        .get('users/role')
        .toPromise()
        .then((data: any) => {
          if (data.role === 'ADMIN') {
            return true;
          }
          this.router.navigate(['']);
          return false;
        });
    }
    this.authService.logout();
    return false;
  }
}
