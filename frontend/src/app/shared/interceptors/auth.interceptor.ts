import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const currentToken = localStorage.getItem('token');
    if (currentToken) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${currentToken}`
        }
      })
    }
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log('[Error in interceptor]: ', error)
          if (error.status === 401) {
            this.authService.logout()
          }
          return throwError(error)
        })
      )
  }

}
