import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICartItem } from 'src/app/common/interfaces/cart-item.interface';
import * as cartSelectors from 'src/app/store/cart/cart.selectors';

@Component({
  selector: 'app-order-items-list',
  templateUrl: './order-items-list.component.html',
  styleUrls: ['./order-items-list.component.scss'],
})
export class OrderItemsListComponent {
  itemsInCart$: Observable<ICartItem[]>;

  constructor(private store: Store) {
    this.itemsInCart$ = this.store.select(cartSelectors.selectItemRecords);
  }
}
