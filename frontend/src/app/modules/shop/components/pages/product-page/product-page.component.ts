import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IProduct } from 'src/app/common/interfaces/product.interface';
import SwiperCore, { FreeMode, Navigation, Pagination, Thumbs } from 'swiper';
import * as productSelectors from 'src/app/store/products/products.selectors';
import * as productActions from 'src/app/store/products/products.actions';
import * as cartActions from 'src/app/store/cart/cart.actions';
import * as cartSelectors from 'src/app/store/cart/cart.selectors';
import * as stocksActions from 'src/app/store/stocks/stocks.actions';
import { TranslocoService } from '@ngneat/transloco';
import { ModalService } from '../../../services/modal.service';
import { MobileService } from '../../../services/mobile.service';

SwiperCore.use([FreeMode, Navigation, Thumbs, Pagination]);

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit, OnDestroy {
  currentLanguage: 'uk_UA' | 'ru';

  selectedColor: number;

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

  mobileSwiperConfig = {
    slidesPerView: 1,
    spaceBetween: 0,
    pagination: true,
  };

  product$: Observable<IProduct>;

  currentProductId: number;

  isExistInCart: boolean;

  isMobile$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private modalService: ModalService,
    private store: Store,
    private translocoService: TranslocoService,
    private mobileService: MobileService,
  ) {
    this.product$ = this.store.select(productSelectors.selectCurrentProduct);
    this.viewedProducts$ = this.store.select(productSelectors.selectViewedProducts);
    this.isLoading$ = this.store.select(productSelectors.selectIsLoading);
    this.isMobile$ = mobileService.isMobile$;
  }

  ngOnInit(): void {
    this.sub.add(
      this.route.params.subscribe(({ id, ...rest }) => {
        const productGroup = rest['product-group'];
        // Check if it's id of stock entity
        if (isFinite(productGroup)) {
          this.store.dispatch(stocksActions.getOneStock({ id: productGroup }));
        }
        this.store.dispatch(productActions.getOneProduct({ id }));
        this.currentProductId = id;
      }),
    );

    this.sub.add(
      this.store.select(cartSelectors.selectProductsInCardIds).subscribe((ids) => {
        this.isExistInCart = ids?.some((id) => +id === +this.currentProductId);
      }),
    );

    this.sub.add(
      this.store.select(productSelectors.selectFirstColorInProduct).subscribe((color) => {
        this.selectedColor = color?.id;
      }),
    );

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
      cartActions.addProductToCart({
        item: +this.currentProductId,
        count: this.count,
        color: this.selectedColor,
      }),
    );
  }

  selectColor(id: number) {
    this.selectedColor = id;
  }
}
