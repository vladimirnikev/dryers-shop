import { Component, Input } from '@angular/core';
import { IStock } from 'src/app/common/interfaces/stock.interface';

@Component({
  selector: 'app-swiper-slide',
  templateUrl: './swiper-slide.component.html',
  styleUrls: ['./swiper-slide.component.scss'],
})
export class SwiperSlideComponent {
  @Input() stock: IStock;
}
