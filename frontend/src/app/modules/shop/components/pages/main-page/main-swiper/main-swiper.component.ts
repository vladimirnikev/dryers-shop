import { Component } from '@angular/core';
import SwiperCore, { SwiperOptions, Pagination, Autoplay } from 'swiper';

SwiperCore.use([Pagination, Autoplay]);

@Component({
  selector: 'app-main-swiper',
  templateUrl: './main-swiper.component.html',
  styleUrls: ['./main-swiper.component.scss'],
})
export class MainSwiperComponent {
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
}
