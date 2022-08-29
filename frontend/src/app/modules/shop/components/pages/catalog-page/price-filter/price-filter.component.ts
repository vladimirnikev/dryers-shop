import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { ISliderPriceFilter } from 'src/app/common/interfaces/slider-price-filter.interface';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import * as productsActions from 'src/app/store/products/products.actions';
import * as productsSelectors from 'src/app/store/products/products.selectors';
import { skip } from 'rxjs/operators';
import { HelperService } from 'src/app/shared/services/helper.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/services/validator.service';
import { PaginationService } from 'src/app/modules/shop/services/pagination.service';

@Component({
  selector: 'app-price-filter',
  templateUrl: './price-filter.component.html',
  styleUrls: ['./price-filter.component.scss'],
})
export class PriceFilterComponent implements OnInit, OnDestroy {
  sub = new Subscription();

  @Output() isHiddenFilterEvent = new EventEmitter(false);

  @Output() sliderEvent = new EventEmitter<number[]>();

  @Input() filteringParams;

  isHiddenFilter = false;

  priceRangeForm: FormGroup;

  productsPriceRange$: Observable<ISliderPriceFilter>;

  sliderMinValue = 0;

  sliderMaxValue = 1;

  sliderOptions: Options = {
    floor: 0,
    ceil: 200,
    hideLimitLabels: true,
  };

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private helperService: HelperService,
    private fb: FormBuilder,
    private paginationService: PaginationService,
  ) {
    this.productsPriceRange$ = this.store.select(productsSelectors.selectProductsPriceRange);

    this.priceRangeForm = this.fb.group({
      min: [0, [], [ValidatorService.isSmallerThanMaxValue(this.productsPriceRange$)]],
      max: [1, [], [ValidatorService.isBiggerThanMinValue(this.productsPriceRange$)]],
    });
  }

  ngOnInit(): void {
    this.sub.add(
      this.route.parent.url.subscribe((url) => {
        if (url[0].path === 'search') {
          const searchText = url[1].path;
          const params = {
            name: searchText,
          };

          this.store.dispatch(
            productsActions.getProductsPriceRange({
              params: this.helperService.clearEmptyFilters(params),
            }),
          );
          return;
        }

        const catalogTypeUrl = url[0].path;

        const params = {
          type: catalogTypeUrl,
        };

        this.store.dispatch(
          productsActions.getProductsPriceRange({
            params: this.helperService.clearEmptyFilters(params),
          }),
        );
      }),
    );

    this.sub.add(
      this.store
        .select(productsSelectors.selectProductsPriceRange)
        .pipe(skip(1))
        .subscribe((range) => {
          if (this.paginationService.productFilteringParamsValue().price) {
            const priceRangeInForm = {
              min: +this.paginationService.productFilteringParamsValue().price.split('-')[0],
              max: +this.paginationService.productFilteringParamsValue().price.split('-')[1],
            };

            if (priceRangeInForm.min < range.min || priceRangeInForm.max > range.max) {
              this.sliderOptions = { ...this.sliderOptions };
            }

            return;
          }

          // Check for empty data in range
          if (Object.values(range).some((v) => !v)) {
            this.sliderOptions = { ...this.sliderOptions, floor: 0, ceil: 0 };
            return;
          }

          this.sliderOptions = { ...this.sliderOptions, floor: range.min, ceil: range.max };
          this.resetFilter();
        }),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  resetFilter() {
    this.sliderMinValue = this.sliderOptions.floor;
    this.sliderMaxValue = this.sliderOptions.ceil;
  }

  hideFilter() {
    this.isHiddenFilter = !this.isHiddenFilter;
    this.isHiddenFilterEvent.emit(this.isHiddenFilter);
  }

  changeValues() {
    this.priceRangeForm.setValue({
      min: this.sliderMinValue,
      max: this.sliderMaxValue,
    });
  }

  sendData() {
    this.sliderMinValue = this.formMinPrice;
    this.sliderMaxValue = this.formMaxPrice;

    const range = [this.formMinPrice, this.formMaxPrice];
    this.sliderEvent.emit(range);
  }

  get formMinPrice() {
    return this.priceRangeForm.get('min').value;
  }

  get formMaxPrice() {
    return this.priceRangeForm.get('max').value;
  }
}
