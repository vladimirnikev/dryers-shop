import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, zip } from 'rxjs';
import { debounceTime, distinctUntilChanged, first, map } from 'rxjs/operators';
import { ISliderPriceFilter } from 'src/app/common/interfaces/slider-price-filter.interface';
import { IStock } from 'src/app/common/interfaces/stock.interface';

export class ValidatorService {
  static isExistName(
    itemsObs: Observable<IStock[]>,
    currentStockObs?: Observable<IStock> | null,
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> | null => {
      if (currentStockObs) {
        return zip(itemsObs, currentStockObs)
          .pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map(([stocks, currentStock]) => {
              const nameExist = stocks.some(
                (stock) =>
                  +stock.id !== +currentStock.id &&
                  stock.name.toLowerCase() === control.value.toLowerCase(),
              );
              return nameExist ? { nameExist: true } : null;
            }),
          )
          .pipe(first());
      }
      return itemsObs
        .pipe(
          debounceTime(200),
          distinctUntilChanged(),
          map((stocks) => {
            const nameExist = stocks.some(
              (stock) => stock.name.toLowerCase() === control.value.toLowerCase(),
            );
            return nameExist ? { nameExist: true } : null;
          }),
        )
        .pipe(first());
    };
  }

  static isBiggerThanMinValue(initialRange: Observable<ISliderPriceFilter>): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> | null => {
      return initialRange
        .pipe(
          map(() => {
            const isSmallValue = !(control.value > control.parent?.get('min').value);
            return isSmallValue ? { isSmallValue: true } : null;
          }),
        )
        .pipe(first());
    };
  }

  static isSmallerThanMaxValue(initialRange: Observable<ISliderPriceFilter>): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> | null => {
      return initialRange
        .pipe(
          map(() => {
            const isBigValue = !(control.value < control.parent?.get('max').value);
            return isBigValue ? { isBigValue: true } : null;
          }),
        )
        .pipe(first());
    };
  }
}
