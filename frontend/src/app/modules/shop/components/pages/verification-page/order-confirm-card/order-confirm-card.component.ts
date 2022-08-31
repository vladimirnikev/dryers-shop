import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as cartSelectors from 'src/app/store/cart/cart.selectors';

@Component({
  selector: 'app-order-confirm-card',
  templateUrl: './order-confirm-card.component.html',
  styleUrls: ['./order-confirm-card.component.scss'],
})
export class OrderConfirmCardComponent {
  @Output() confirmOrderEvent = new EventEmitter();

  cartSum$: Observable<number>;

  constructor(private store: Store) {
    this.cartSum$ = this.store.select(cartSelectors.selectCartSum);
  }

  confirmOrder() {
    this.confirmOrderEvent.emit(true);
  }
}
