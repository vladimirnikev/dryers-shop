import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as productSelectors from 'src/app/store/products/products.selectors';
import * as productActions from 'src/app/store/products/products.actions';
import { pluck } from 'rxjs/operators';
import { PaginationService } from '../../services/pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit, OnDestroy {
  productsTotalCount$: Observable<number>;

  limit$: Observable<number>;

  currentPage: number = 0;

  sub = new Subscription();

  currentLimit: number;

  productsTotalCount: number;

  constructor(private paginationService: PaginationService, private store: Store) {
    this.productsTotalCount$ = this.store.select(productSelectors.selectProductsTotalCount);
    this.limit$ = this.paginationService.watchProductFilteringParams().pipe(pluck('limit'));
  }

  ngOnInit(): void {
    this.sub.add(
      this.paginationService
        .watchProductFilteringParams()
        .subscribe((params) => (this.currentPage = Math.floor(params.offset / params.limit))),
    );
    this.sub.add(
      this.paginationService
        .watchProductFilteringParams()
        .pipe(pluck('limit'))
        .subscribe((limit) => (this.currentLimit = limit)),
    );
    this.sub.add(
      this.store
        .select(productSelectors.selectProductsTotalCount)
        .subscribe((count) => (this.productsTotalCount = count)),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  changeLimit(event, limit: number) {
    event.target.parentElement.childNodes.forEach((el) => el.classList.remove('active'));
    event.target.classList.add('active');
    this.paginationService.changeProductFilteringParams({ limit });
    this.store.dispatch(
      productActions.getProducts({ params: this.paginationService.productFilteringParamsValue() }),
    );
  }

  pagesCounter(i: number) {
    return new Array(Math.ceil(i));
  }

  changePage(page: number) {
    const { limit } = this.paginationService.productFilteringParamsValue();
    const offset = page * limit;
    this.paginationService.changeProductFilteringParams({ offset });
    this.store.dispatch(
      productActions.getProducts({ params: this.paginationService.productFilteringParamsValue() }),
    );
    this.currentPage = page;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  goToNextPage() {
    const pagesCount = Math.ceil(this.productsTotalCount / this.currentLimit);
    if (pagesCount === this.currentPage + 1) {
      return;
    }
    this.paginationService.changeProductFilteringParams({
      offset:
        this.paginationService.productFilteringParamsValue().offset +
        this.paginationService.productFilteringParamsValue().limit,
    });
    this.currentPage = Math.ceil(
      this.paginationService.productFilteringParamsValue().offset /
        this.paginationService.productFilteringParamsValue().limit,
    );
    this.store.dispatch(
      productActions.getProducts({ params: this.paginationService.productFilteringParamsValue() }),
    );
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  goToPrevPage() {
    if (this.currentPage === 0) {
      return;
    }
    this.paginationService.changeProductFilteringParams({
      offset:
        this.paginationService.productFilteringParamsValue().offset -
        this.paginationService.productFilteringParamsValue().limit,
    });
    this.currentPage = Math.ceil(
      this.paginationService.productFilteringParamsValue().offset /
        this.paginationService.productFilteringParamsValue().limit,
    );
    this.store.dispatch(
      productActions.getProducts({ params: this.paginationService.productFilteringParamsValue() }),
    );
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
