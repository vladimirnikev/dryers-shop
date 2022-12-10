import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IManufacturer } from 'src/app/common/interfaces/manufacturer.interface';
import * as manufacturerActions from 'src/app/store/manufacturers/manufacturers.actions';
import * as manufacturerSelectors from 'src/app/store/manufacturers/manufacturers.selectors';
import * as colorActions from 'src/app/store/colors/colors.actions';
import * as colorSelectors from 'src/app/store/colors/colors.selectors';
import * as productActions from 'src/app/store/products/products.actions';
import { IColor } from 'src/app/common/interfaces/color.interface';
import { HelperService } from 'src/app/shared/services/helper.service';
import { PaginationService } from 'src/app/modules/shop/services/pagination.service';
import { TranslocoService } from '@ngneat/transloco';
import { MobileService } from 'src/app/modules/shop/services/mobile.service';

@Component({
  selector: 'app-filtering-bar',
  templateUrl: './filtering-bar.component.html',
  styleUrls: ['./filtering-bar.component.scss'],
})
export class FilteringBarComponent implements OnInit, OnDestroy {
  @ViewChildren('checkbox') checkboxes;

  currentLanguage: 'uk_UA' | 'ru';

  sub = new Subscription();

  isHiddenFilterBar = false;

  isHiddenPriceFilter = false;

  isHiddenManufacturerFilter = false;

  isHiddenExistFilter = false;

  isHiddenColorFilter = false;

  limit = 9;

  offset = 0;

  catalogType: string;

  filterForm: FormGroup;

  manufacturers$: Observable<IManufacturer[]>;

  colors$: Observable<IColor[]>;

  isMobile$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
    private helperService: HelperService,
    private paginationService: PaginationService,
    private translocoService: TranslocoService,
    private mobileService: MobileService,
  ) {
    this.filterForm = this.fb.group({
      manufacturer: new FormArray([]),
      availability: new FormArray([]),
      color: new FormArray([]),
    });

    this.manufacturers$ = this.store.select(manufacturerSelectors.selectAllManufacturers);
    this.colors$ = this.store.select(colorSelectors.selectAllColors);
    this.isMobile$ = mobileService.isMobile$;
  }

  ngOnInit(): void {
    this.sub.add(
      this.filterForm.valueChanges.subscribe((value) => {
        const clearValue = this.helperService.createFilterParamsFromForm(value);
        const isFormValueChanged = Object.values(clearValue).some((value) => !!value);

        if (isFormValueChanged) {
          this.paginationService.changeProductFilteringParams({ ...clearValue, offset: 0 });
        } else {
          this.paginationService.changeProductFilteringParams({ ...clearValue });
          this.paginationService.removeParam('price');
        }
        const params = {
          ...this.helperService.clearEmptyFilters(
            this.paginationService.productFilteringParamsValue(),
          ),
        };

        delete params.limit;
        delete params.offset;
        this.store.dispatch(productActions.getProductsPriceRange({ params }));
        this.store.dispatch(
          productActions.getProducts({
            params: this.paginationService.productFilteringParamsValue(),
          }),
        );
      }),
    );

    this.sub.add(
      this.route.parent.url.subscribe((url) => {
        this.catalogType = url[0].path;
        this.store.dispatch(manufacturerActions.getManufacturers());
        this.store.dispatch(colorActions.getColors());
        this.resetFilters();
      }),
    );

    this.sub.add(
      this.translocoService.langChanges$.subscribe(
        (language: 'uk_UA' | 'ru') => (this.currentLanguage = language),
      ),
    );

    this.sub.add(
      this.mobileService.isMobile$.subscribe((value: boolean) => {
        this.isHiddenFilterBar = value;
      }),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  resetFilters() {
    if (this.checkboxes) {
      this.checkboxes._results.forEach((el: ElementRef) => (el.nativeElement.checked = false));
    }
    this.paginationService.cleanProductFilterParams();

    const isFormEmpty = Object.values(this.filterForm.value).every((value: []) => !value.length);

    if (isFormEmpty) {
      this.filterForm.updateValueAndValidity();
    }

    Object.keys(this.filterForm.value).forEach((key) => {
      const formArray = this.filterForm.get(key) as FormArray;
      formArray.clear();
    });
  }

  hideFilterBar() {
    this.isHiddenFilterBar = !this.isHiddenFilterBar;
  }

  hidePriceFilter(event) {
    this.isHiddenPriceFilter = event;
  }

  hideFilter(type) {
    switch (type) {
      case 'manufacturer':
        this.isHiddenManufacturerFilter = !this.isHiddenManufacturerFilter;
        break;
      case 'exist':
        this.isHiddenExistFilter = !this.isHiddenExistFilter;
        break;

      case 'color':
        this.isHiddenColorFilter = !this.isHiddenColorFilter;
        break;

      default:
        break;
    }
  }

  changePriceRange(event) {
    this.paginationService.changeProductFilteringParams({
      offset: 0,
      price: `${event[0]}-${event[1]}`,
    });
    this.store.dispatch(
      productActions.getProducts({
        params: {
          ...this.paginationService.productFilteringParamsValue(),
        },
      }),
    );
  }

  onCheckChange(event, formArrayName) {
    const formArray: FormArray = this.filterForm.get(formArrayName) as FormArray;

    /* Selected */
    if (event.target.checked) {
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    } else {
      /* unselected */
      // find the unselected element
      let i: number = 0;

      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value === event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }

        i++;
      });
    }
  }
}
