import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICart } from 'src/app/common/interfaces/cart.interface';
import { IOrderFormData } from 'src/app/common/interfaces/order-form-data.interface';
import { IOrderInClickData } from 'src/app/common/interfaces/order-in-click-data.interface';
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

  makeOrder(data: IOrderFormData): Observable<void> {
    return this.httpService.post('cart/order', data);
  }

  makeOrderInClick(data: IOrderInClickData): Observable<void> {
    return this.httpService.post('cart/buy-in-click', data);
  }
}
