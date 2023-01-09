import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import urljoin from 'url-join';
import { environment } from '../../../environments/environment';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  get<T>(url: string, httpOptions: object = {}): Observable<T> {
    return this.http.get<T>(urljoin(this.getServerBaseUrl(), url), {
      ...httpOptions,
    });
  }

  post<T>(url: string, body: unknown | null = null, httpOptions: object = {}): Observable<T> {
    return this.http.post<T>(urljoin(this.getServerBaseUrl(), url), body, {
      ...httpOptions,
    });
  }

  put<T>(url: string, body: unknown | null = null, httpOptions: object = {}): Observable<T> {
    return this.http.put<T>(urljoin(this.getServerBaseUrl(), url), body, {
      ...httpOptions,
    });
  }

  delete<T>(url: string, httpOptions: object = {}): Observable<T> {
    return this.http.delete<T>(urljoin(this.getServerBaseUrl(), url), {
      ...httpOptions,
    });
  }

  getServerBaseUrl() {
    if (environment.serverBaseUrl) {
      return environment.serverBaseUrl;
    }
    return 'http://localhost:3000';
  }
}
