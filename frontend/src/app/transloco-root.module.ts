/* eslint-disable max-classes-per-file */
import { HttpClient } from '@angular/common/http';
import {
  TRANSLOCO_LOADER,
  Translation,
  TranslocoLoader,
  TRANSLOCO_CONFIG,
  translocoConfig,
  TranslocoModule,
  TranslocoService,
} from '@ngneat/transloco';
import { APP_INITIALIZER, Injectable, NgModule } from '@angular/core';
import { environment } from '../environments/environment';

const DEFAULT_LANG = 'uk_UA';

function preloadLang(translocoService: TranslocoService) {
  // eslint-disable-next-line func-names
  return function () {
    const savedLanguage = localStorage.getItem('i18n_language');
    translocoService.setActiveLang(savedLanguage || DEFAULT_LANG);
    return translocoService.load(savedLanguage || DEFAULT_LANG).toPromise();
  };
}

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string) {
    return this.http.get<Translation>(`./assets/i18n/${lang}.json`);
  }
}

const translocoPreLoad = {
  provide: APP_INITIALIZER,
  multi: true,
  useFactory: preloadLang,
  deps: [TranslocoService],
};

const translocoConfigProvider = {
  provide: TRANSLOCO_CONFIG,
  useValue: translocoConfig({
    availableLangs: ['uk_UA', 'ru'],
    defaultLang: DEFAULT_LANG,
    reRenderOnLangChange: true,
    prodMode: environment.production,
  }),
};

@NgModule({
  exports: [TranslocoModule],
  providers: [
    translocoConfigProvider,
    translocoPreLoad,
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
  ],
})
export class TranslocoRootModule {}
