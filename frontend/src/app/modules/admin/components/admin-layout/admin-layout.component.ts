import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { selectCurrentUser } from 'src/app/store/users/users.selectors';
import { getCurrentUser } from 'src/app/store/users/users.action';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { IUser } from 'src/app/common/interfaces/user.interface';
import { ColorsListModalComponent } from '../colors-list-modal/colors-list-modal.component';
import { ManufacturersListModalComponent } from '../manufacturers-list-modal/manufacturers-list-modal.component';
import { CreateManufacturerModalComponent } from '../create-manufacturer-modal/create-manufacturer-modal.component';
import { CreateItemPageComponent } from '../create-item-page/create-item-page.component';
import { CreateColorModalComponent } from '../create-color-modal/create-color-modal.component';
import { StockListModalComponent } from '../stock-list-modal/stock-list-modal.component';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
  sub = new Subscription();

  constructor(private dialog: MatDialog, private store$: Store, private router: Router) {}

  currentUser: IUser;

  ngOnInit(): void {
    this.sub.add(
      this.store$.select(selectCurrentUser).subscribe((user) => {
        this.currentUser = user;
        if (!user) {
          this.store$.dispatch(getCurrentUser());
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  openCreateProductModal() {
    this.dialog.open(CreateItemPageComponent, {
      width: '80%',
    });
  }

  openCreateManufacturerModal() {
    this.dialog.open(CreateManufacturerModalComponent);
  }

  openManufacturersListModal() {
    this.dialog.open(ManufacturersListModalComponent, {
      width: '40%',
    });
  }

  openCreateColorModal() {
    this.dialog.open(CreateColorModalComponent);
  }

  openColorsListModal() {
    this.dialog.open(ColorsListModalComponent, {
      width: '40%',
    });
  }

  // openCreateStockModal() {
  // this.dialog.open(CreateStockModalComponent)
  // }

  openStocksListModal() {
    this.dialog.open(StockListModalComponent, { width: '70%' });
  }
}
