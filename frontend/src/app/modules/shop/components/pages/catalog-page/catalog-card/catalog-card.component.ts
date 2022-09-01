import { Component, Input, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/modules/shop/services/modal.service';
import { EViewType } from 'src/app/common/enums/viewType.enum';
import { IProduct } from 'src/app/common/interfaces/product.interface';
import * as cartActions from 'src/app/store/cart/cart.actions';
import * as cartSelectors from 'src/app/store/cart/cart.selectors';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-catalog-card',
  templateUrl: './catalog-card.component.html',
  styleUrls: ['./catalog-card.component.scss'],
})
export class CatalogCardComponent implements OnInit, OnDestroy {
  sub = new Subscription();

  count = 1;

  @Input() item: IProduct;

  @ViewChildren('buttonWithOwnEvent') buttonsWithOwnEvents;

  @Input() viewType: EViewType;

  isExistInCart: boolean;

  constructor(private modalService: ModalService, private router: Router, private store: Store) {}

  ngOnInit(): void {
    this.sub.add(
      this.store.select(cartSelectors.selectProductsInCardIds).subscribe((ids) => {
        this.isExistInCart = ids?.some((id) => +id === +this.item.id);
      }),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  increment() {
    this.count += 1;
  }

  decrement() {
    if (this.count === 1) {
      return;
    }
    this.count -= 1;
  }

  openBuyInClickModal() {
    this.modalService.openBuyInClickModal(this.item.id);
  }

  navigateToItem(event) {
    const isIncludeOwnActions = this.buttonsWithOwnEvents._results.some(
      (el) =>
        el.nativeElement === event.target ||
        (el.nativeElement === event.target.parentElement &&
          [...this.buttonsWithOwnEvents._results].some(
            (element) => element.nativeElement === event.target.parentElement,
          )),
    );

    if (isIncludeOwnActions) {
      return;
    }

    this.router.navigate([this.router.url, 'product', this.item.id]);
  }

  addItemToCart() {
    this.store.dispatch(cartActions.addProductToCart({ item: this.item.id, count: this.count }));
  }
}
