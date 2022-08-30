import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/common/interfaces/product.interface';
import * as productSelectors from 'src/app/store/products/products.selectors';
import * as cartSelectors from 'src/app/store/cart/cart.selectors';
import { ICart } from 'src/app/common/interfaces/cart.interface';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent {
  isLoading$: Observable<boolean>;

  viewedProducts$: Observable<IProduct[]>;

  currentCart$: Observable<ICart>;

  constructor(private modalService: ModalService, private store: Store) {
    this.viewedProducts$ = this.store.select(productSelectors.selectViewedProducts);
    this.currentCart$ = this.store.select(cartSelectors.selectCurrentCart);
    this.isLoading$ = this.store.select(cartSelectors.selectIsLoading);
  }

  openBuyInClickModal() {
    this.modalService.openBuyInClickModal();
  }
}
