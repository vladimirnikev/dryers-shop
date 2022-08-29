import { MatDialog } from '@angular/material/dialog';
import { IStock } from 'src/app/common/interfaces/stock.interface';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as stockActions from 'src/app/store/stocks/stocks.actions';
import * as stockSelectors from 'src/app/store/stocks/stocks.selectors';
import { MatTableDataSource } from '@angular/material/table';
import { IConfirmModalData } from 'src/app/common/interfaces/confirm-modal-data.interface';
import { ConfirmModalTemplateComponent } from 'src/app/shared/components/confirm-modal-template/confirm-modal-template.component';

@Component({
  selector: 'app-stock-list-modal',
  templateUrl: './stock-list-modal.component.html',
  styleUrls: ['./stock-list-modal.component.scss'],
})
export class StockListModalComponent implements OnInit, OnDestroy {
  sub = new Subscription();

  displayedColumns: string[] = ['name', 'isActive', 'edit'];

  dataSource: MatTableDataSource<IStock[]>;

  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(stockActions.getStocks({}));

    this.sub.add(
      this.store.select(stockSelectors.selectStocks).subscribe((data) => {
        this.initializeData(data);
      }),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  closeModal() {
    this.dialog.closeAll();
  }

  openDeleteStockModal(id: number) {
    const data: IConfirmModalData = {
      title: 'Окно подтверждения',
      text: 'Вы действительно хотите удалить эту акцию?',
    };
    const dialogRef = this.dialog.open(ConfirmModalTemplateComponent, { data });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(stockActions.deleteStock({ id }));
      }
    });
  }

  initializeData(stocks): void {
    this.dataSource = new MatTableDataSource(stocks.length ? stocks : []);
  }
}
