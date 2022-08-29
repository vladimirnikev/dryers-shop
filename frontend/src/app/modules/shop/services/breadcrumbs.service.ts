import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Data,
  NavigationEnd,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { filter, pluck, skip } from 'rxjs/operators';
import * as productSelectors from 'src/app/store/products/products.selectors';

@Injectable()
export class BreadcrumbsService {
  breadcrumbCustomName: string;

  // Subject emitting the breadcrumb hierarchy
  private readonly _breadcrumbs$ = new BehaviorSubject([]);

  // Observable exposing the breadcrumb hierarchy
  readonly breadcrumbs$ = this._breadcrumbs$.asObservable();

  constructor(private router: Router, private store: Store, private route: ActivatedRoute) {
    // merge(this.router.events, this.store)
    if (this.router.url.includes('product')) {
      combineLatest(
        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)),
        this.store.select(productSelectors.selectCurrentProduct).pipe(skip(1), pluck('name')),
        // eslint-disable-next-line
      ).subscribe(([event, name]) => {
        this.breadcrumbCustomName = name;
        // Construct the breadcrumb hierarchy
        const { root } = this.router.routerState.snapshot;
        const breadcrumbs = [];
        this.addBreadcrumb(root, [], breadcrumbs);

        // Emit the new hierarchy
        this._breadcrumbs$.next(breadcrumbs);
      });
    } else {
      console.log('Not Product');
      this.router.events
        .pipe(
          // Filter the NavigationEnd events as the breadcrumb is updated only when the route reaches its end
          filter((event) => event instanceof NavigationEnd),
        )
        // eslint-disable-next-line
        .subscribe((event) => {
          // Construct the breadcrumb hierarchy
          const { root } = this.router.routerState.snapshot;
          const breadcrumbs = [];
          this.addBreadcrumb(root, [], breadcrumbs);

          // Emit the new hierarchy
          this._breadcrumbs$.next(breadcrumbs);
        });
    }
  }

  private addBreadcrumb(route: ActivatedRouteSnapshot, parentUrl: string[], breadcrumbs) {
    if (route) {
      // Construct the route URL
      const routeUrl = parentUrl.concat(route.url.map((url) => url.path));
      // Add an element for the current route part
      if (route.data.breadcrumb) {
        let breadcrumb = {
          label: this.getLabel(route.data),
          url: `/${routeUrl.join('/')}`,
        };

        console.log(route);
        // Check for existing child in current route
        if (!route.firstChild && typeof route.data.breadcrumb === 'function') {
          console.log('NOT FIRST CHILD IN ROUTE');
          breadcrumb = {
            label: this.breadcrumbCustomName,
            url: `/${routeUrl.join('/')}`,
          };
        }
        breadcrumbs.push(breadcrumb);
      }

      // Add another element for the next route part
      this.addBreadcrumb(route.firstChild, routeUrl, breadcrumbs);
    }
  }

  private getLabel(data: Data) {
    // The breadcrumb can be defined as a static string or as a function to construct the breadcrumb element out of the route data
    return typeof data.breadcrumb === 'function' ? data.breadcrumb(data) : data.breadcrumb;
  }
}
