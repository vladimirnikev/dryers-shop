import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ICartItem } from 'src/app/common/interfaces/cart-item.interface';
import { MobileService } from 'src/app/modules/shop/services/mobile.service';
import * as cartSelectors from 'src/app/store/cart/cart.selectors';

@Component({
  selector: 'app-order-items-list',
  templateUrl: './order-items-list.component.html',
  styleUrls: ['./order-items-list.component.scss'],
})
export class OrderItemsListComponent implements OnInit, OnDestroy {
  sub = new Subscription();

  currentLanguage: 'uk_UA' | 'ru';

  itemsInCart$: Observable<ICartItem[]>;

  isMobile$: Observable<boolean>;

  constructor(
    private store: Store,
    private translocoService: TranslocoService,
    private mobileService: MobileService,
  ) {
    this.itemsInCart$ = this.store.select(cartSelectors.selectItemRecords);
    this.isMobile$ = mobileService.isMobile$;
  }

  ngOnInit(): void {
    this.sub.add(
      this.translocoService.langChanges$.subscribe(
        (language: 'uk_UA' | 'ru') => (this.currentLanguage = language),
      ),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
