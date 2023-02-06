import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IProduct } from 'src/app/common/interfaces/product.interface';
import * as productSelectors from 'src/app/store/products/products.selectors';
import * as cartSelectors from 'src/app/store/cart/cart.selectors';
import { ICart } from 'src/app/common/interfaces/cart.interface';
import { TranslocoService } from '@ngneat/transloco';
import { Title } from '@angular/platform-browser';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;

  viewedProducts$: Observable<IProduct[]>;

  currentCart$: Observable<ICart>;

  private sub = new Subscription();

  constructor(
    private modalService: ModalService,
    private store: Store,
    private translocoService: TranslocoService,
    private titleService: Title,
  ) {
    this.viewedProducts$ = this.store.select(productSelectors.selectViewedProducts);
    this.currentCart$ = this.store.select(cartSelectors.selectCurrentCart);
    this.isLoading$ = this.store.select(cartSelectors.selectIsLoading);
  }

  ngOnInit(): void {
    this.sub.add(
      this.translocoService.langChanges$.subscribe((lang: 'uk_UA' | 'ru') => {
        if (lang === 'uk_UA') {
          this.titleService.setTitle('WarmShop | Кошик');
          return;
        }
        this.titleService.setTitle('WarmShop | Корзина');
      }),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  openBuyInClickModal() {
    this.modalService.openBuyInClickModal();
  }
}
