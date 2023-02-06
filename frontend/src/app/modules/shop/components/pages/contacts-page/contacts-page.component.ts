import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslocoService } from '@ngneat/transloco';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss'],
})
export class ContactsPageComponent implements OnInit, OnDestroy {
  sub = new Subscription();

  currentLanguage: 'uk_UA' | 'ru';

  constructor(private translocoService: TranslocoService, private titleService: Title) {}

  ngOnInit(): void {
    this.sub.add(
      this.translocoService.langChanges$.subscribe((language: 'uk_UA' | 'ru') => {
        this.currentLanguage = language;
        if (language === 'uk_UA') {
          this.titleService.setTitle('WarmShop | Контакти');
          return;
        }
        this.titleService.setTitle('WarmShop | Контакты');
      }),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
