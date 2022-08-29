import { pluck, skip } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import * as productSelectors from 'src/app/store/products/products.selectors';

@Injectable()
export class ProductResolverService implements Resolve<any> {
  name: string;

  constructor(private store: Store) {}

  // eslint-disable-next-line
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return {
      name: this.store.select(productSelectors.selectCurrentProduct).pipe(skip(1), pluck('name')),
    };
  }
}
