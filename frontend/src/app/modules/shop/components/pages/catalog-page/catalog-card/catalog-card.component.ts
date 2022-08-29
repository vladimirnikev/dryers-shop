import { Component, Input, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/modules/shop/services/modal.service';
import { EViewType } from 'src/app/common/enums/viewType.enum';
import { IProduct } from 'src/app/common/interfaces/product.interface';
import * as cartActions from 'src/app/store/cart/cart.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-catalog-card',
  templateUrl: './catalog-card.component.html',
  styleUrls: ['./catalog-card.component.scss'],
})
export class CatalogCardComponent {
  count = 1;

  @Input() item: IProduct;

  @ViewChildren('buttonWithOwnEvent') buttonsWithOwnEvents;

  @Input() viewType: EViewType;

  constructor(private modalService: ModalService, private router: Router, private store: Store) {}

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
    this.modalService.openBuyInClickModal();
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
