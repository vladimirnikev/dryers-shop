import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Data,
  NavigationEnd,
  Router,
} from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, iif } from 'rxjs';
import { filter, map, mergeMap, skip } from 'rxjs/operators';
import * as productSelectors from 'src/app/store/products/products.selectors';
import * as stockSelectors from 'src/app/store/stocks/stocks.selectors';

@Injectable()
export class BreadcrumbsService {
  breadcrumbCustomName: string;

  productGroupCustomName: string;

  // Subject emitting the breadcrumb hierarchy
  private readonly _breadcrumbs$ = new BehaviorSubject([]);

  // Observable exposing the breadcrumb hierarchy
  readonly breadcrumbs$ = this._breadcrumbs$.asObservable();

  constructor(
    private router: Router,
    private store: Store,
    private route: ActivatedRoute,
    private translocoService: TranslocoService,
  ) {
    const includeProduct$ = combineLatest(
      translocoService.langChanges$,
      this.route.url,
      this.store.select(productSelectors.selectCurrentProduct).pipe(skip(1)),
      this.store.select(stockSelectors.selectCurrentStock),
    ).pipe(
      // eslint-disable-next-line
      map(([lang, event, product, stock]) => {
        if (lang === 'uk_UA') {
          this.breadcrumbCustomName = product?.nameUa;
          this.productGroupCustomName = stock?.nameUa;
        } else {
          this.breadcrumbCustomName = product?.name;
          this.productGroupCustomName = stock?.name;
        }
        // Construct the breadcrumb hierarchy
        const { root } = this.router.routerState.snapshot;
        const breadcrumbs = [];
        this.addBreadcrumb(root, [], breadcrumbs, lang);

        // Emit the new hierarchy
        this._breadcrumbs$.next(breadcrumbs);
      }),
    );

    const withoutProduct$ = combineLatest(translocoService.langChanges$, this.route.url).pipe(
      // eslint-disable-next-line
      map(([lang, url]) => {
        // Construct the breadcrumb hierarchy
        const { root } = this.router.routerState.snapshot;
        const breadcrumbs = [];

        // // Emit the new hierarchy
        this.addBreadcrumb(root, [], breadcrumbs, lang);

        // Emit the new hierarchy
        this._breadcrumbs$.next(breadcrumbs);
      }),
    );
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        mergeMap((route: NavigationEnd) =>
          iif(() => route.url.includes('product'), includeProduct$, withoutProduct$),
        ),
      )
      .subscribe();
  }

  private addBreadcrumb(
    route: ActivatedRouteSnapshot,
    parentUrl: string[],
    breadcrumbs,
    language?: string,
  ) {
    if (route) {
      // Construct the route URL
      const routeUrl = parentUrl.concat(route.url.map((url) => url.path));

      // Add an element for the current route part
      if (route.data.breadcrumb) {
        const currentRouteIsProductGroup =
          !!Object.keys(route.params).length &&
          Object.keys(route.params).every((key) => key === 'product-group');

        let breadcrumb = {
          label: this.getLabel(route.data, language),
          url: `/${routeUrl.join('/')}`,
        };

        if (currentRouteIsProductGroup) {
          // Check if route param is id of stock entity
          const productGroupIsStock = isFinite(route.params['product-group']);
          if (productGroupIsStock) {
            breadcrumb = {
              label: this.productGroupCustomName,
              url: `/${routeUrl.join('/')}`,
            };
          }
        }

        // Check for existing child in current route
        if (!route.firstChild && typeof route.data.breadcrumb === 'function') {
          breadcrumb = {
            label: this.breadcrumbCustomName,
            url: `/${routeUrl.join('/')}`,
          };
        }
        breadcrumbs.push(breadcrumb);
      }

      // Add another element for the next route part
      this.addBreadcrumb(route.firstChild, routeUrl, breadcrumbs, language);
    }
  }

  private getLabel(data: Data, language?: string) {
    let breadcrumb = data.breadcrumb;
    let breadcrumbFunc = typeof data.breadcrumb === 'function' && data.breadcrumb(data);

    if (language) {
      breadcrumb = data.breadcrumb[language];
      if (typeof data.breadcrumb === 'function') {
        breadcrumbFunc = data.breadcrumb(data)[language];
      }
    }

    // The breadcrumb can be defined as a static string or as a function to construct the breadcrumb element out of the route data
    return typeof data.breadcrumb === 'function' ? breadcrumbFunc : breadcrumb;
  }
}
