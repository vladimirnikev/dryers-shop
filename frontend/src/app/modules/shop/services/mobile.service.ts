import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Injectable()
export class MobileService {
  private isMobileSubject: BehaviorSubject<boolean>;

  public isMobile$: Observable<boolean>;

  private checkIsMobileEvent$: Observable<void>;

  constructor() {
    this.isMobileSubject = new BehaviorSubject(window.innerWidth <= 768);
    this.isMobile$ = this.isMobileSubject.asObservable();

    this.checkIsMobileEvent$ = merge(fromEvent(window, 'resize')).pipe(
      debounceTime(200),
      map(() => {
        this.isMobileSubject.next(window.innerWidth <= 768);
      }),
    );

    this.checkIsMobileEvent$.subscribe();
  }
}
