import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import * as productActions from 'src/app/store/products/products.actions';
import * as productSelectors from 'src/app/store/products/products.selectors';
import { IProduct } from 'src/app/common/interfaces/product.interface';

SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.scss'],
})
export class SaleListComponent implements OnInit {
  products$: Observable<IProduct[]>;

  swiperConfig = {
    slidesPerView: 4,
    spaceBetween: 32,
    slidesPerGroup: 4,
    navigation: true,
  };

  constructor(private store: Store) {
    this.products$ = this.store.select(productSelectors.selectProducts);
  }

  ngOnInit(): void {
    this.store.dispatch(productActions.getProducts({ params: { discount: true } }));
  }
}
