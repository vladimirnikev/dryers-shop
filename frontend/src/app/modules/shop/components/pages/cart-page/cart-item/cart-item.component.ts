import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICartItem } from 'src/app/common/interfaces/cart-item.interface';
import * as cartActions from 'src/app/store/cart/cart.actions';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent {
  @Input() cartRecord: ICartItem;

  constructor(private store: Store) {}

  increment() {
    this.store.dispatch(
      cartActions.incrementProductCountInCart({ itemRecordId: this.cartRecord.id }),
    );
  }

  decrement() {
    if (this.cartRecord.count === 1) {
      return;
    }

    this.store.dispatch(
      cartActions.decrementProductCountInCart({ itemRecordId: this.cartRecord.id }),
    );
  }

  deleteItem() {
    this.store.dispatch(cartActions.deleteProductFromCart({ itemRecordId: this.cartRecord.id }));
  }
}
