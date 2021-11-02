import { IProductQueryFilters, IProductQuerySort, IProductQuery } from './../../../../../common/interfaces/product.interface';
import { HelperService } from './../../../../shared/services/helper.service';
import { tap, map } from 'rxjs/operators';
import { selectProductById, selectProductsLoadingStatus, selectProductsTotalCount } from './../../../../store/products/products.selectors';
import { UpdateItemModalComponent } from './../update-item-modal/update-item-modal.component';
import { deleteProduct, getProducts, updateProduct } from './../../../../store/products/products.actions';
import { merge, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { selectProducts } from 'src/app/store/products/products.selectors';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalTemplateComponent } from 'src/app/shared/components/confirm-modal-template/confirm-modal-template.component';
import { IConfirmModalData } from 'src/common/interfaces/confirm-modal-data.interface';
import { IProduct } from 'src/common/interfaces/product.interface';
import { MatSort, Sort } from '@angular/material/sort';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { ESortDirection } from 'src/common/enums/sort.enum';

@Component({
  selector: 'app-items-page',
  templateUrl: './items-page.component.html',
  styleUrls: ['./items-page.component.scss']
})
export class ItemsPageComponent implements OnInit, AfterViewInit {
  tableData = []
  displayedColumns: string[] = ['name', 'availability', 'batch', 'price', 'color', 'edit'];
  dataSource = new MatTableDataSource(this.tableData);
  batches
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    availability: new FormControl(''),
    batch: new FormControl(''),
    price: new FormControl(''),
    color: new FormControl(''),
  })

  filters: IProductQueryFilters
  sortParams: IProductQuerySort
  pageSizeOptions = [5, 10, 20]
  products$: Observable<IProduct[]>

  isLoading: boolean
  totalCount: number

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private store$: Store,
    private dialog: MatDialog,
    private helperService: HelperService
  ) { }


  ngOnInit(): void {
    this.store$.dispatch(getProducts({
      params: {
        limit: this.pageSizeOptions[0]
      }
    }))

    this.store$.select(selectProductsTotalCount)
      .subscribe(count => this.totalCount = count)
    this.store$.select(selectProductsLoadingStatus)
      .subscribe(loading => this.isLoading = loading)
    this.products$ = this.store$.select(selectProducts)
    this.products$.subscribe(data => {
      this.tableData = data
      this.initializeData(data)
    })
  }

  ngAfterViewInit() {
    const filters$ = this.form.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((value: IProductQueryFilters) => {
        this.paginator.pageIndex = 0
        this.filters = value
      })
    )

    const sort$ = this.sort.sortChange.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(({ active, direction }) => {
        this.paginator.pageIndex = 0
        this.sortParams = {
          sortBy: active,
          sortDirection: direction.toUpperCase() as ESortDirection
        }
        if (!direction) {
          delete this.sortParams.sortBy
          delete this.sortParams.sortDirection
        }
      })
    )

    merge(filters$, sort$, this.paginator.page).pipe(
      tap(() => {
        let params: IProductQuery = {
          limit: this.paginator.pageSize,
          offset: this.paginator.pageSize * this.paginator.pageIndex,
          ...this.filters,
          ...this.sortParams
        }
        params = this.helperService.clearEmptyFilters(params)
        this.store$.dispatch(getProducts({ params }))
      })
    ).subscribe()
  }

  private initializeData(products): void {
    this.dataSource = new MatTableDataSource(products.length ? products : []);
  }

  deleteProduct(id: number) {
    const data: IConfirmModalData = {
      title: 'Окно подтверждения',
      text: 'Вы действительно хотите удалить этот продукт?'
    }
    const dialogRef = this.dialog.open(ConfirmModalTemplateComponent, { data })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store$.dispatch(deleteProduct({ id }))
      }
    })
  }

  editProduct(id: number) {
    let product: IProduct
    this.store$.select(selectProductById(id)).subscribe(item => product = item)
    const data = { ...product }

    const dialogRef = this.dialog.open(UpdateItemModalComponent, {
      data,
      width: '80%',
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store$.dispatch(updateProduct({ dto: result.dto, id: result.id }))
      }
    })
  }
}

