import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { EViewType } from 'src/app/common/enums/viewType.enum';
import { Store } from '@ngrx/store';
import * as productSelectors from 'src/app/store/products/products.selectors';
import * as stocksActions from 'src/app/store/stocks/stocks.actions';
import * as stocksSelectors from 'src/app/store/stocks/stocks.selectors';
import { IProduct } from 'src/app/common/interfaces/product.interface';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Title } from '@angular/platform-browser';
import { MobileService } from '../../../services/mobile.service';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss'],
})
export class CatalogPageComponent implements OnInit, OnDestroy {
  sub = new Subscription();

  products$: Observable<IProduct[]>;

  viewedProducts$: Observable<IProduct[]>;

  isLoading$: Observable<boolean>;

  offset;

  limit;

  isStockPage: boolean;

  swiperConfig = {
    slidesPerView: 3,
    spaceBetween: 8,
    slidesPerGroup: 3,
    navigation: {
      nextEl: '.swiper-button-next-unique',
      prevEl: '.swiper-button-prev-unique',
    },
    breakpoints: {
      1025: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
    },
  };

  catalogTitle: string;

  viewType: EViewType = window.innerWidth > 539 ? EViewType.COLUMN : EViewType.ROW;

  isMobile$: Observable<boolean>;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private translocoService: TranslocoService,
    private mobileService: MobileService,
    private titleService: Title,
  ) {
    this.products$ = this.store.select(productSelectors.selectProducts);
    this.viewedProducts$ = this.store.select(productSelectors.selectViewedProducts);
    this.isLoading$ = this.store.select(productSelectors.selectIsLoading);
    this.isMobile$ = mobileService.isMobile$;
  }

  ngOnInit(): void {
    this.sub.add(
      combineLatest(
        this.route.data,
        this.route.params,
        this.translocoService.langChanges$,
      ).subscribe(([data, params, lang]) => {
        const productGroup = params['product-group'];
        // check if it is id of stock
        if (isFinite(productGroup)) {
          this.isStockPage = true;
          this.store.dispatch(stocksActions.getOneStock({ id: productGroup }));
          return;
        }

        this.isStockPage = false;
        if (lang === 'uk_UA') {
          this.catalogTitle = data.productGroup.nameUa;
          this.titleService.setTitle('WarmShop | Каталог');
          return;
        }
        this.titleService.setTitle('WarmShop | Каталог');
        this.catalogTitle = data.productGroup.name;
      }),
    );

    this.sub.add(
      combineLatest(
        this.store.select(stocksSelectors.selectCurrentStock),
        this.translocoService.langChanges$,
      ).subscribe(([stock, lang]) => {
        if (this.isStockPage) {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          lang === 'uk_UA'
            ? (this.catalogTitle = stock?.nameUa)
            : (this.catalogTitle = stock?.name);
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  changeListView(event) {
    this.viewType = event;
  }

  get viewTypeEnum(): typeof EViewType {
    return EViewType;
  }
}
