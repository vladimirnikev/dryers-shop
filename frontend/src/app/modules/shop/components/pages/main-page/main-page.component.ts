import { Component, OnDestroy, OnInit } from '@angular/core';
import * as stockSelectors from 'src/app/store/stocks/stocks.selectors';
import * as productSelectors from 'src/app/store/products/products.selectors';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { TranslocoService } from '@ngneat/transloco';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  stocksIsLoading$: Observable<boolean>;

  productsIsLoading$: Observable<boolean>;

  private sub = new Subscription();

  constructor(
    private store: Store,
    private translocoService: TranslocoService,
    private titleService: Title,
  ) {
    this.stocksIsLoading$ = this.store.select(stockSelectors.selectLoadingStatus);
    this.productsIsLoading$ = this.store.select(productSelectors.selectIsLoading);
  }

  ngOnInit(): void {
    this.sub.add(
      this.translocoService.langChanges$.subscribe((lang: 'uk_UA' | 'ru') => {
        if (lang === 'uk_UA') {
          this.titleService.setTitle('WarmShop - магазин вашого тепла');
          return;
        }
        this.titleService.setTitle('WarmShop - магазин вашего тепла');
      }),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
