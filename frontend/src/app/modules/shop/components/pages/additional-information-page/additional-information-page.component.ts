import { Subscription } from 'rxjs';
import { TranslocoService } from '@ngneat/transloco';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-additional-information-page',
  templateUrl: './additional-information-page.component.html',
  styleUrls: ['./additional-information-page.component.scss'],
})
export class AdditionalInformationPageComponent implements OnInit, OnDestroy {
  lastPartOfPath: string;

  private sub = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private translocoService: TranslocoService,
  ) {}

  ngOnInit(): void {
    this.sub.add(
      this.translocoService.langChanges$.subscribe((lang: 'uk_UA' | 'ru') => {
        if (lang === 'uk_UA') {
          this.titleService.setTitle('WarmShop | Додаткова інформація');
          return;
        }
        this.titleService.setTitle('WarmShop | Дополнительная информация');
      }),
    );

    this.route.url.subscribe((url) => {
      this.lastPartOfPath = url.slice(-1)[0].path;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
