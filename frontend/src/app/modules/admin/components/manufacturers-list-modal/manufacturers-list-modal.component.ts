import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as manufacturerSelectors from 'src/app/store/manufacturers/manufacturers.selectors';
import * as manufacturerActions from 'src/app/store/manufacturers/manufacturers.actions';
import { deleteManufacturer } from 'src/app/store/manufacturers/manufacturers.actions';
import { ConfirmModalTemplateComponent } from '../../../../shared/components/confirm-modal-template/confirm-modal-template.component';
import { UpdateManufacturerModalComponent } from '../update-manufacturer-modal/update-manufacturer-modal.component';

@Component({
  selector: 'app-manufacturers-list-modal',
  templateUrl: './manufacturers-list-modal.component.html',
  styleUrls: ['./manufacturers-list-modal.component.scss'],
})
export class ManufacturersListModalComponent implements OnInit {
  manufacturers$ = this.store.select(manufacturerSelectors.selectAllManufacturers);

  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(manufacturerActions.getManufacturers());
  }

  editManufacturer(manufacturer) {
    this.dialog.open(UpdateManufacturerModalComponent, {
      data: { manufacturer },
      width: '50%',
    });
  }

  openDeleteManufacturerModal(id: number) {
    const dialogRef = this.dialog.open(ConfirmModalTemplateComponent, {
      data: {
        title: 'Удаление производителя',
        text: 'Вы уверены, что хотите удалить этого производителя? Вместе с ним удалятся все его продукты!',
      },
      width: '60%',
    });

    dialogRef.afterClosed().subscribe((value) => {
      if (value) {
        this.store.dispatch(deleteManufacturer({ id }));
      }
    });
  }
}
