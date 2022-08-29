import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IProduct } from 'src/app/common/interfaces/product.interface';
import * as productActions from 'src/app/store/products/products.actions';
import * as productSelectors from 'src/app/store/products/products.selectors';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-viewed-products-list',
  templateUrl: './viewed-products-list.component.html',
  styleUrls: ['./viewed-products-list.component.scss'],
})
export class ViewedProductsListComponent implements OnInit, OnDestroy {
  @ViewChild('swiper') swiper: SwiperComponent;

  sub = new Subscription();

  swiperConfig: SwiperOptions = {
    slidesPerView: 4,
    spaceBetween: 8,
    navigation: {
      nextEl: '.swiper-button-next-unique',
      prevEl: '.swiper-button-prev-unique',
    },
  };

  @Input() currentProductId: number = null;

  viewedProducts$: Observable<IProduct[]>;

  constructor(private store: Store, private route: ActivatedRoute, private actions$: Actions) {
    this.viewedProducts$ = this.store.select(productSelectors.selectViewedProducts);
  }

  ngOnInit(): void {
    this.sub.add(
      this.store.select(productSelectors.selectViewedProducts).subscribe(() => {
        this.swiper?.swiperRef.slideTo(0);
        this.swiper?.swiperRef.navigation.update();
      }),
    );

    this.sub.add(
      this.route.params.subscribe((v) => {
        if (v.id) {
          this.store.dispatch(productActions.getViewedProducts({ currentProductId: v.id }));
          return;
        }
        this.store.dispatch(productActions.getViewedProducts({}));
      }),
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
