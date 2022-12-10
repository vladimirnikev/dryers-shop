import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ICartItem } from 'src/app/common/interfaces/cart-item.interface';
import * as cartActions from 'src/app/store/cart/cart.actions';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit, OnDestroy {
  sub = new Subscription();

  currentLanguage: 'uk_UA' | 'ru';

  @ViewChildren('buttonWithOwnEvent') buttonsWithOwnEvent: ElementRef[];

  @Input() cartRecord: ICartItem;

  constructor(
    private store: Store,
    private translocoService: TranslocoService,
    private router: Router,
  ) {}

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

  navigateToItem(event) {
    const isIncludeOwnActions = this.buttonsWithOwnEvent.some(
      (el) => el.nativeElement === event.target,
    );

    if (isIncludeOwnActions) {
      return;
    }
    this.router.navigate([
      'catalog',
      this.cartRecord.item.category,
      'product',
      this.cartRecord.item.id,
    ]);
  }
}
