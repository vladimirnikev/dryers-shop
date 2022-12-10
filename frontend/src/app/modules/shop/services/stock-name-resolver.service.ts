import { pluck } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCurrentStock } from 'src/app/store/stocks/stocks.selectors';
import { Observable } from 'rxjs';

@Injectable()
export class StockNameResolverService implements Resolve<any> {
  constructor(private store: Store) {}

  // eslint-disable-next-line
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store.select(selectCurrentStock).pipe(pluck('name'));
  }
}
