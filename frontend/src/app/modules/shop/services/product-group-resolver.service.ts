import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class ProductGroupResolverService implements Resolve<any> {
  // eslint-disable-next-line
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const productGroup = route.params['product-group'].toLowerCase();
    if (productGroup === 'water') {
      return {
        name: 'Водяные полотенцесушители',
        nameUa: 'Водяні рушникосушарки',
      };
    }

    if (productGroup === 'electricity') {
      return {
        name: 'Электрические полотенцесушители',
        nameUa: 'Електричні рушникосушарки',
      };
    }

    if (productGroup === 'combine') {
      return {
        name: 'Комбинированные полотенцесушители',
        nameUa: 'Комбіновані рушникосушарки',
      };
    }

    if (productGroup === 'accessories') {
      return {
        name: 'Аксессуары',
        nameUa: 'Аксесуари',
      };
    }

    if (productGroup === 'discounts') {
      return {
        name: 'Товары со скидкой',
        nameUa: 'Товари зі знижкою',
      };
    }

    return {
      name: productGroup,
    };
  }
}
