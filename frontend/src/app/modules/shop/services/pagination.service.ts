import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProductFilteringParams } from 'src/app/common/interfaces/product-filtering-params.interface';

@Injectable()
export class PaginationService {
  private productFilteringParams: BehaviorSubject<IProductFilteringParams>;

  constructor(private router: Router) {
    const urlArr = this.router.url.split('/');
    if (urlArr[2] === 'search') {
      const searchText = urlArr[urlArr.length - 1];
      this.productFilteringParams = new BehaviorSubject({ offset: 0, limit: 9, name: searchText });
    } else {
      const type = urlArr[urlArr.length - 1];
      this.productFilteringParams = new BehaviorSubject({ offset: 0, limit: 9, type });
    }
  }

  changeProductFilteringParams(params): void {
    this.productFilteringParams.next({ ...this.productFilteringParams.value, ...params });
  }

  watchProductFilteringParams(): Observable<IProductFilteringParams> {
    return this.productFilteringParams.asObservable();
  }

  productFilteringParamsValue(): IProductFilteringParams {
    return this.productFilteringParams.value;
  }

  cleanProductFilterParams(): void {
    const urlArr = this.router.url.split('/');
    const isSearchPage = urlArr[2] === 'search';
    const type = urlArr[urlArr.length - 1];
    let initialParamsKeys = ['limit', 'offset', 'type'].sort();
    if (isSearchPage) {
      initialParamsKeys = ['limit', 'offset', 'name'].sort();
    }
    const filledParams = Object.fromEntries(
      // eslint-disable-next-line
      Object.entries(this.productFilteringParamsValue()).filter(([key, value]) => {
        return (
          (Array.isArray(value) && value.length > 0) ||
          (!Array.isArray(value) && !!value) ||
          (typeof value === 'number' && value === 0)
        );
      }),
    );

    const filledParamsKeys = Object.keys(filledParams).sort();

    const isExistOnlyInitialParams =
      JSON.stringify(initialParamsKeys) === JSON.stringify(filledParamsKeys);

    if (isSearchPage) {
      if (isExistOnlyInitialParams) {
        this.productFilteringParams.next({
          offset: this.productFilteringParamsValue().offset,
          limit: this.productFilteringParamsValue().limit,
          name: type,
        });
        return;
      }
      this.productFilteringParams.next({
        offset: 0,
        limit: this.productFilteringParamsValue().limit,
        name: type,
      });
      return;
    }

    if (isExistOnlyInitialParams) {
      this.productFilteringParams.next({
        offset: this.productFilteringParamsValue().offset,
        limit: this.productFilteringParamsValue().limit,
        type,
      });
      return;
    }
    this.productFilteringParams.next({
      offset: 0,
      limit: this.productFilteringParamsValue().limit,
      type,
    });
  }

  removeParam(paramName: string) {
    const isParamExist = Object.keys(this.productFilteringParams.value).find(
      (key) => key === paramName,
    );

    if (isParamExist) {
      const newParams = { ...this.productFilteringParams.value };
      delete newParams[paramName];
      this.productFilteringParams.next({ ...newParams });
    }
  }
}
