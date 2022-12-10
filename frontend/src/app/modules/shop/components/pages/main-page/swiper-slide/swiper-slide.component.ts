import { Subscription } from 'rxjs';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { IStock } from 'src/app/common/interfaces/stock.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-swiper-slide',
  templateUrl: './swiper-slide.component.html',
  styleUrls: ['./swiper-slide.component.scss'],
})
export class SwiperSlideComponent implements OnInit, OnDestroy {
  sub = new Subscription();

  currentLanguage: 'uk_UA' | 'ru';

  @Input() stock: IStock;

  constructor(private translocoService: TranslocoService, private router: Router) {}

  ngOnInit(): void {
    this.sub.add(
      this.translocoService.langChanges$.subscribe(
        (language: 'uk_UA' | 'ru') => (this.currentLanguage = language),
      ),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
