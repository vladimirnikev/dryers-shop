import { IManufacturer } from './../../../../../common/interfaces/manufacturer.interface';
import { IProductQueryFilters, IProductQuerySort, IProductQuery } from './../../../../../common/interfaces/product.interface';
import { HelperService } from './../../../../shared/services/helper.service';
import { tap, map } from 'rxjs/operators';
import { selectProductById, selectProductsLoadingStatus, selectProductsTotalCount } from './../../../../store/products/products.selectors';
import { UpdateItemModalComponent } from './../update-item-modal/update-item-modal.component';
import { deleteProduct, getProducts } from './../../../../store/products/products.actions';
import { merge, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { selectProducts } from 'src/app/store/products/products.selectors';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalTemplateComponent } from 'src/app/shared/components/confirm-modal-template/confirm-modal-template.component';
import { IConfirmModalData } from 'src/common/interfaces/confirm-modal-data.interface';
import { IProduct } from 'src/common/interfaces/product.interface';
import { MatSort } from '@angular/material/sort';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { ESortDirection } from 'src/common/enums/sort.enum';
import { getManufacturers } from 'src/app/store/manufacturers/manufacturers.actions';
import { selectAllManufacturers } from 'src/app/store/manufacturers/manufacturers.selectors';
import { getColors } from 'src/app/store/colors/colors.actions';
import { selectAllColors } from 'src/app/store/colors/colors.selectors';
import { IColor } from 'src/common/interfaces/color.interface';

@Component({
  selector: 'app-items-page',
  templateUrl: './items-page.component.html',
  styleUrls: ['./items-page.component.scss']
})
export class ItemsPageComponent implements OnInit, OnDestroy, AfterViewInit {
  tableData = []
  displayedColumns: string[] = ['name', 'availability', 'manufacturer', 'price', 'colors', 'edit'];
  dataSource = new MatTableDataSource(this.tableData);
  manufacturers: IManufacturer[]
  colors: IColor[]

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    availability: new FormControl(''),
    manufacturer: new FormControl(''),
    price: new FormControl(''),
    colors: new FormControl(''),
  })

  filters: IProductQueryFilters
  sortParams: IProductQuerySort
  pageSizeOptions = [5, 10, 20]
  sub: Subscription = new Subscription()
  isLoading: boolean
  totalCount: number

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private store$: Store,
    private dialog: MatDialog,
    private helperService: HelperService,
  ) { }

  ngOnInit(): void {
    this.store$.dispatch(getProducts({
      params: {
        limit: this.pageSizeOptions[0]
      }
    }))

    this.store$.dispatch(getManufacturers())
    this.store$.dispatch(getColors())

    this.sub.add(this.store$.select(selectAllColors)
      .subscribe(colors => this.colors = colors))
    this.sub.add(this.store$.select(selectAllManufacturers)
      .subscribe(manufacturers => this.manufacturers = manufacturers))
    this.sub.add(
      this.store$.select(selectProductsTotalCount)
        .subscribe(count => this.totalCount = count))
    this.sub.add(
      this.store$.select(selectProductsLoadingStatus)
        .subscribe(loading => this.isLoading = loading))
    this.sub.add(
      this.store$.select(selectProducts).pipe(
        map((products) =>
          products.map(p => ({
            ...p,
            colors: p.colors.map(c => c.name).join(', ')
          }))
        ))
        .subscribe(data => {
          this.tableData = data
          this.initializeData(data)
        }))
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
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

    this.dialog.open(UpdateItemModalComponent, {
      data,
      width: '80%',
    })
  }
}

