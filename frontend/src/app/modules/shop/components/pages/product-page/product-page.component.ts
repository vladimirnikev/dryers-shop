import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IProduct } from 'src/app/common/interfaces/product.interface';
import SwiperCore, { FreeMode, Navigation, Thumbs } from 'swiper';
import * as productSelectors from 'src/app/store/products/products.selectors';
import * as productActions from 'src/app/store/products/products.actions';
import * as cartActions from 'src/app/store/cart/cart.actions';
import * as cartSelectors from 'src/app/store/cart/cart.selectors';
import { ModalService } from '../../../services/modal.service';

SwiperCore.use([FreeMode, Navigation, Thumbs]);

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit, OnDestroy {
  count = 1;

  viewedProducts$: Observable<IProduct[]>;

  isLoading$: Observable<boolean>;

  sub = new Subscription();

  thumbsSwiper: any;

  verticalSwiperConfig = {
    slidesPerView: 4,
    spaceBetween: 0,
    direction: 'vertical' as 'vertical' | 'horizontal',
    allowTouchMove: false,
    watchSlidesProgress: true,
    freeMode: true,
  };

  thumbsSwiperConfig = {
    allowTouchMove: false,
    direction: 'vertical' as 'vertical' | 'horizontal',
    navigation: {
      nextEl: '.btn-next',
      prevEl: '.btn-prev',
    },
  };

  product$: Observable<IProduct>;

  currentProductId: number;

  isExistInCart: boolean;

  constructor(
    private route: ActivatedRoute,
    private modalService: ModalService,
    private store: Store,
  ) {
    this.product$ = this.store.select(productSelectors.selectCurrentProduct);
    this.viewedProducts$ = this.store.select(productSelectors.selectViewedProducts);
    this.isLoading$ = this.store.select(productSelectors.selectIsLoading);
  }

  ngOnInit(): void {
    this.sub.add(
      this.route.params.subscribe(({ id }) => {
        this.store.dispatch(productActions.getOneProduct({ id }));
        this.currentProductId = id;
      }),
    );

    this.sub.add(
      this.store.select(cartSelectors.selectProductsInCardIds).subscribe((ids) => {
        this.isExistInCart = ids?.some((id) => +id === +this.currentProductId);
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
    this.modalService.openBuyInClickModal(this.currentProductId);
  }

  addProductToCart() {
    this.store.dispatch(
      cartActions.addProductToCart({ item: +this.currentProductId, count: this.count }),
    );
  }
}
