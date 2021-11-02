import { UserInterface } from './../../../common/interfaces/user.interface';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import urljoin from 'url-join'
import { map } from 'rxjs/operators';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }

  get<T>(url: string, httpOptions: object = {}): Observable<T> {
    return this.http.get<T>(urljoin(this.getServerBaseUrl(), url), {
      ...httpOptions,
      // observe: 'response'
    })
  }

  post<T>(url: string,
    body: unknown | null = null,
    httpOptions: object = {}
  ): Observable<T> {
    return this.http.post<T>(urljoin(this.getServerBaseUrl(), url), body, {
      ...httpOptions,
      // observe: 'response'
    })
  }

  put<T>(url: string,
    body: unknown | null = null,
    httpOptions: object = {}
  ): Observable<T> {
    return this.http.put<T>(urljoin(this.getServerBaseUrl(), url), body, {
      ...httpOptions,
      // observe: 'response'
    })
  }

  delete<T>(url: string, httpOptions: object = {}): Observable<T> {
    return this.http.delete<T>(urljoin(this.getServerBaseUrl(), url), {
      ...httpOptions,
      // observe: 'response'
    })
  }

  // private withErrorHandling<T>(request: Observable<HttpResponse<T>>, allowedStatuses: number[]) {
  //   return request.toPromise().then(
  //     (response: HttpResponse<T>) => {
  //       if (response) {
  //         // if (response.status === 401) {
  //         //   this.isNotAuthorized();
  //         // }
  //         if (!allowedStatuses.includes(response.status)) {
  //           throw httpErrors(response.status, response.statusText);
  //         }
  //       }

  //       return response as HttpResponse<T> & { body: T };
  //     },
  //     async (reason: any) => {
  //       const error = reason as HttpErrorResponse;
  //       // if (error.status === 401) {
  //       //   await this.isNotAuthorized();
  //       // }
  //       this.openSnackBar(reason.error.error.message, error.status.toString())
  //       throw httpErrors(error.status, error.statusText);

  //     },
  //   );
  // }

  getServerBaseUrl() {
    if (environment.serverBaseUrl) {
      return environment.serverBaseUrl
    }
    return 'http://localhost:3000'
  }

}
