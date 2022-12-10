import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';

@Injectable()
export class MainResolverService implements Resolve<any> {
  name: string;

  constructor(private translocoService: TranslocoService) {}

  // eslint-disable-next-line
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.translocoService.selectTranslate('BREADCRUMBS.MAIN');
  }
}
