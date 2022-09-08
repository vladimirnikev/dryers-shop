import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICallRequest } from 'src/app/common/interfaces/call-request.interfase';
import { HttpService } from './http.service';

@Injectable()
export class UserService {
  constructor(private httpService: HttpService) {}

  getCurrentUserSessionId(): Observable<{ value: string }> {
    return this.httpService.get('users/sessionId');
  }

  makeCallRequest(data: ICallRequest): Observable<void> {
    return this.httpService.post('calls', data);
  }
}
