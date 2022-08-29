import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable()
export class UserService {
  constructor(private httpService: HttpService) {}

  getCurrentUserSessionId(): Observable<{ value: string }> {
    return this.httpService.get('users/sessionId');
  }
}
