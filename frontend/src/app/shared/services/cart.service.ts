import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICart } from 'src/app/common/interfaces/cart.interface';
import { HttpService } from './http.service';

@Injectable()
export class CartService {
  constructor(private httpService: HttpService) {}

  getCurrentUserCart(): Observable<ICart> {
    return this.httpService.get('cart');
  }

  addItemToCart(item: number, count: number): Observable<ICart> {
    return this.httpService.put('cart', { item, count });
  }

  incrementProductCountInCart(itemRecordId: number): Observable<ICart> {
    return this.httpService.put('cart/add', { itemRecordId });
  }

  decrementProductCountInCart(itemRecordId: number): Observable<ICart> {
    return this.httpService.delete(`cart/add/${itemRecordId}`);
  }

  deleteProductFromCart(itemRecordId: number): Observable<void> {
    return this.httpService.delete(`cart/${itemRecordId}`);
  }
}
