import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { merge, Observable, Subscription } from 'rxjs';
import * as stockActions from 'src/app/store/stocks/stocks.actions';
import * as stockSelectors from 'src/app/store/stocks/stocks.selectors';
import * as productActions from 'src/app/store/products/products.actions';
import * as productSelectors from 'src/app/store/products/products.selectors';
import { HelperService } from 'src/app/shared/services/helper.service';
import { Actions, ofType } from '@ngrx/effects';
import { IStock } from 'src/app/common/interfaces/stock.interface';
import { ValidatorService } from 'src/app/shared/services/validator.service';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import {
  IProduct,
  IProductQuery,
  IProductQueryFilters,
} from 'src/app/common/interfaces/product.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-stock-modal',
  templateUrl: './create-stock-modal.component.html',
  styleUrls: ['./create-stock-modal.component.scss'],
})
export class CreateStockModalComponent implements OnInit, OnDestroy, AfterViewInit {
  form: FormGroup;

  filterForm: FormGroup;

  displayedColumns: string[] = ['name', 'add'];

  sub = new Subscription();

  isSimilarName = false;

  image: string | ArrayBuffer;

  formData: FormData = new FormData();

  isLoading$: Observable<boolean>;

  stocks$: Observable<IStock[]>;

  totalCount: number;

  dataSource: MatTableDataSource<IProduct[]>;

  filters: IProductQueryFilters;

  stockIsActive: boolean;

  imagesArr = [];

  files: File[] = [];

  @ViewChild('file') fileInput: ElementRef<HTMLElement>;

  @ViewChild('imgCard') imgCard: ElementRef<HTMLElement>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private store$: Store,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private helperService: HelperService,
    private actions: Actions,
    private router: Router,
  ) {
    this.stocks$ = this.store$.select(stockSelectors.selectStocks);

    this.form = this.fb.group({
      name: ['', [Validators.required], [ValidatorService.isExistName(this.stocks$)]],
      nameUa: ['', Validators.required],
      file: [this.formData],
      products: [[], [Validators.required, Validators.minLength(1)]],
      isActive: false,
    });

    this.filterForm = this.fb.group({
      name: '',
    });

    this.isLoading$ = this.store$.select(stockSelectors.selectLoadingStatus);
  }

  ngOnInit(): void {
    this.store$.dispatch(stockActions.getStocks({}));
    this.store$.dispatch(productActions.getProducts({ params: { limit: 10 } }));

    this.sub.add(
      this.store$.select(productSelectors.selectProducts).subscribe((data: IProduct[]) => {
        this.initializeData(data);
      }),
    );

    this.sub.add(
      this.store$
        .select(productSelectors.selectProductsTotalCount)
        .subscribe((count) => (this.totalCount = count)),
    );

    this.sub.add(
      this.actions.pipe(ofType(stockActions.createStockSuccess)).subscribe(() => {
        this.cleanForm();
        this.router.navigate(['items']);
      }),
    );

    this.sub.add(
      this.actions.pipe(ofType(stockActions.createStockFailed)).subscribe(() => {
        this.cleanForm();
        this.router.navigate(['items']);
      }),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    const filters$ = this.filterForm.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((value: IProductQueryFilters) => {
        this.paginator.pageIndex = 0;
        this.filters = value;
      }),
    );

    merge(filters$, this.paginator.page)
      .pipe(
        tap(() => {
          let params: IProductQuery = {
            limit: this.paginator.pageSize,
            offset: this.paginator.pageSize * this.paginator.pageIndex,
            ...this.filters,
          };
          params = this.helperService.clearEmptyFilters(params);
          this.store$.dispatch(productActions.getProducts({ params }));
        }),
      )
      .subscribe();
  }

  createItem() {
    let dto = this.form.getRawValue();
    delete dto.file;
    this.helperService.appendDataFromForm(dto, this.formData);
    dto = this.formData;
    this.store$.dispatch(stockActions.createStock({ dto }));
  }

  cleanForm() {
    this.imagesArr = [];
    this.files = [];
    this.form.reset();
    this.form.get('products').setValue([]);
    this.stockIsActive = false;
    this.filterForm.reset();
    this.formData = new FormData();
  }

  preview(files) {
    files = Array(files)[0];
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      this.formData.append('files', files[i], files[i].name);
    }

    if (files.length === 0) {
      return;
    }
    const isNotValidFiles = Object.keys(files).some((key) => {
      const extension = files[0].name.split('.').pop().toLowerCase();
      const mimeType = files[key].type;
      if (mimeType.match(/image\/*/) == null || extension === 'svg') {
        this.snackBar.open(`Данный формат не поддерживается`, 'Error', {
          duration: 5000,
          panelClass: 'red-snackbar',
        });
        return true;
      }
      return false;
    });

    if (isNotValidFiles) {
      return;
    }

    Object.keys(files).forEach((key) => {
      const reader = new FileReader();
      reader.readAsDataURL(files[key]);
      reader.onload = () => {
        this.imagesArr.push(reader.result);
        this.files.push(files[key]);
      };
    });

    this.form.patchValue({
      file: formData,
    });
  }

  deleteImage(idx) {
    this.imagesArr = this.imagesArr.filter((img, index) => index !== idx);
    this.files = this.files.filter((file, index) => index !== idx);
    this.form.patchValue({
      images: this.imagesArr,
    });

    this.formData.delete('files');

    for (let i = 0; i < this.files.length; i++) {
      this.formData.append('files', this.files[i], this.files[i].name);
    }
  }

  triggerClickInput() {
    this.fileInput.nativeElement.click();
  }

  private initializeData(products): void {
    this.dataSource = new MatTableDataSource(products.length ? products : []);
  }

  toggleProductRelating(id: number) {
    const isProductExist = this.checkIfProductExist(id);
    if (isProductExist) {
      const relatedProducts = this.formProducts.filter((productId) => productId !== id);
      this.form.get('products').setValue(relatedProducts);
      return;
    }

    const relatedProducts = [...this.formProducts, id];
    this.form.get('products').setValue(relatedProducts);
  }

  checkIfProductExist(id: number) {
    return this.formProducts.some((productId) => productId === id);
  }

  toggleStockStatus() {
    this.form.get('isActive').setValue(!this.formIsActive);
  }

  get formProducts() {
    return this.form.get('products').value;
  }

  get formIsActive() {
    return this.form.get('isActive').value;
  }
}
