import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class ProductGroupResolverService implements Resolve<any> {
  // eslint-disable-next-line
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const productGroup = route.params['product-group'];
    if (productGroup === 'water') {
      return {
        name: 'Водяные полотенцесушители',
      };
    }

    if (productGroup === 'electricity') {
      return {
        name: 'Электрические полотенцесушители',
      };
    }

    if (productGroup === 'combine') {
      return {
        name: 'Комбинированные полотенцесушители',
      };
    }

    if (productGroup === 'accessories') {
      return {
        name: 'Аксессуары',
      };
    }

    if (productGroup === 'discounts') {
      return {
        name: 'Товары со скидкой',
      };
    }

    return {
      name: productGroup,
    };
  }
}
