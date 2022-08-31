import { Component } from '@angular/core';
import * as stockSelectors from 'src/app/store/stocks/stocks.selectors';
import * as productSelectors from 'src/app/store/products/products.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  stocksIsLoading$: Observable<boolean>;

  productsIsLoading$: Observable<boolean>;

  constructor(private store: Store) {
    this.stocksIsLoading$ = this.store.select(stockSelectors.selectLoadingStatus);
    this.productsIsLoading$ = this.store.select(productSelectors.selectIsLoading);
  }
}
