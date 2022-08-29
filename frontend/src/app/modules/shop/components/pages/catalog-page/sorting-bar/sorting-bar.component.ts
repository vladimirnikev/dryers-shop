import { PaginationService } from 'src/app/modules/shop/services/pagination.service';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { EViewType } from 'src/app/common/enums/viewType.enum';
import { Store } from '@ngrx/store';
import * as productActions from 'src/app/store/products/products.actions';
import { ESortType } from 'src/app/common/enums/productSortType.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sorting-bar',
  templateUrl: './sorting-bar.component.html',
  styleUrls: ['./sorting-bar.component.scss'],
})
export class SortingBarComponent implements OnInit, OnDestroy {
  sub = new Subscription();

  viewType = EViewType.COLUMN;

  currentSortType = 'CREATEDAT_DESC';

  @Output() viewTypeEvent = new EventEmitter();

  constructor(private paginationService: PaginationService, private store: Store) {}

  ngOnInit(): void {
    this.viewTypeEvent.emit(EViewType.COLUMN);

    this.sub.add(
      this.paginationService.watchProductFilteringParams().subscribe((params) => {
        if (params.sortBy && params.sortDirection) {
          const sortType = `${params.sortBy?.toUpperCase()}_${params.sortDirection?.toUpperCase()}`;
          this.currentSortType = sortType;
          return;
        }
        this.currentSortType = ESortType.NEWEST;
      }),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  changeListView({ viewType }) {
    if (viewType === EViewType.ROW) {
      this.viewType = EViewType.ROW;
      this.viewTypeEvent.emit(EViewType.ROW);
    }
    if (viewType === EViewType.COLUMN) {
      this.viewType = EViewType.COLUMN;
      this.viewTypeEvent.emit(EViewType.COLUMN);
    }
  }

  sortItems(sortBy: string, sortDirection: string) {
    this.paginationService.changeProductFilteringParams({ sortBy, sortDirection, offset: 0 });
    this.store.dispatch(
      productActions.getProducts({ params: this.paginationService.productFilteringParamsValue() }),
    );
  }
}
