import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'],
})
export class LanguageSwitcherComponent {
  activeLanguage = (localStorage.getItem('i18n_language') as 'uk_UA' | 'ru') || 'uk_UA';

  constructor(private translocoService: TranslocoService) {
    translocoService.setActiveLang(this.activeLanguage);
  }

  setCurrentLanguage(language: 'uk_UA' | 'ru') {
    if (this.activeLanguage === language) {
      return;
    }
    localStorage.setItem('i18n_language', language);
    this.translocoService.setActiveLang(language);
    this.activeLanguage = language;
  }
}
