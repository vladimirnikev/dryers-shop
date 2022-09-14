import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/common/interfaces/product.interface';
import * as cartActions from 'src/app/store/cart/cart.actions';
import * as cartSelectors from 'src/app/store/cart/cart.selectors';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit, OnDestroy {
  isExistInCart: boolean;

  sub = new Subscription();

  @ViewChild('buttonWithOwnEvent') buttonWithOwnEvent: ElementRef;

  @Input() item: IProduct;

  constructor(private router: Router, private store: Store) {}

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

  navigateToItem(event) {
    const isIncludeOwnActions = this.buttonWithOwnEvent.nativeElement === event.target;

    if (isIncludeOwnActions) {
      return;
    }
    this.router.navigate(['catalog', 'discounts', 'product', this.item.id]);
  }

  addToCart() {
    this.store.dispatch(
      cartActions.addProductToCart({
        item: this.item.id,
        count: 1,
      }),
    );
  }
}
