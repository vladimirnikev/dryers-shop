import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IStock } from 'src/app/common/interfaces/stock.interface';
import SwiperCore, { SwiperOptions, Pagination, Autoplay } from 'swiper';
import * as stockSelectors from 'src/app/store/stocks/stocks.selectors';
import * as stockActions from 'src/app/store/stocks/stocks.actions';

SwiperCore.use([Pagination, Autoplay]);

@Component({
  selector: 'app-main-swiper',
  templateUrl: './main-swiper.component.html',
  styleUrls: ['./main-swiper.component.scss'],
})
export class MainSwiperComponent implements OnInit {
  swiperConfig: SwiperOptions = {
    slidesPerView: 1,
    pagination: {
      clickable: true,
      renderBullet(index, className) {
        return `<span class="${className}"></span>`;
      },
    },
    spaceBetween: 128,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  };

  stocks$: Observable<IStock[]>;

  constructor(private store: Store) {
    this.stocks$ = this.store.select(stockSelectors.selectStocks);
  }

  ngOnInit(): void {
    this.store.dispatch(stockActions.getStocks({ params: { isActive: true } }));
  }
}
