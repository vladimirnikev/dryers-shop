import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICart } from 'src/app/common/interfaces/cart.interface';
import * as cartActions from 'src/app/store/cart/cart.actions';
import * as cartSelectors from 'src/app/store/cart/cart.selectors';

@Component({
  selector: 'app-basket-bar-card',
  templateUrl: './basket-bar-card.component.html',
  styleUrls: ['./basket-bar-card.component.scss'],
})
export class BasketBarCardComponent implements OnInit {
  currentCart$: Observable<ICart>;

  constructor(private store: Store) {
    this.currentCart$ = this.store.select(cartSelectors.selectCurrentCart);
  }

  ngOnInit(): void {
    this.store.dispatch(cartActions.getCart());
  }
}
