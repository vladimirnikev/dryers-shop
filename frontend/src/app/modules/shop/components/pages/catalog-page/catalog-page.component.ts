import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { EViewType } from 'src/app/common/enums/viewType.enum';
import { Store } from '@ngrx/store';
import * as productSelectors from 'src/app/store/products/products.selectors';
import { IProduct } from 'src/app/common/interfaces/product.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss'],
})
export class CatalogPageComponent {
  products$: Observable<IProduct[]>;

  viewedProducts$: Observable<IProduct[]>;

  isLoading$: Observable<boolean>;

  offset;

  limit;

  swiperConfig = {
    slidesPerView: 4,
    spaceBetween: 8,
    slidesPerGroup: 4,
    navigation: {
      nextEl: '.swiper-button-next-unique',
      prevEl: '.swiper-button-prev-unique',
    },
  };

  viewType: EViewType;

  constructor(private store: Store, private route: ActivatedRoute) {
    this.products$ = this.store.select(productSelectors.selectProducts);
    this.viewedProducts$ = this.store.select(productSelectors.selectViewedProducts);
    this.isLoading$ = this.store.select(productSelectors.selectIsLoading);
  }

  changeListView(event) {
    this.viewType = event;
  }
}
