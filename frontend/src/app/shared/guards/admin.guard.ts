import { HttpService } from './../services/http.service';
import { AuthService } from './../services/auth.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private httpService: HttpService,
    private router: Router
  ) { }

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
     ): boolean | Observable<boolean> | Promise<boolean> {
      const token = this.authService.getTokenValue()
      if (token) {
       return this.httpService.get('users/role').toPromise().then((data: any) => {
          console.log(data.body.role)
          if (data.body.role === 'ADMIN') {
            return true
          } else {
            this.router.navigate([''])
            return false
          }
         })
      }
      this.authService.logout()
      // this.router.navigate(['']) // admin login page ЭТОТ РЕДИРЕКТ ЕСТЬ В AuthService
      return false
  }
}
