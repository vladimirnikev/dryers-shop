import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as colorActions from 'src/app/store/colors/colors.actions';
import { Component, OnInit } from '@angular/core';
import { deleteColor } from 'src/app/store/colors/colors.actions';
import { ConfirmModalTemplateComponent } from 'src/app/shared/components/confirm-modal-template/confirm-modal-template.component';
import * as colorSelectors from '../../../../store/colors/colors.selectors';
import { UpdateColorModalComponent } from '../update-color-modal/update-color-modal.component';

@Component({
  selector: 'app-colors-list-modal',
  templateUrl: './colors-list-modal.component.html',
  styleUrls: ['./colors-list-modal.component.scss'],
})
export class ColorsListModalComponent implements OnInit {
  colors$ = this.store.select(colorSelectors.selectAllColors);

  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(colorActions.getColors());
  }

  editManufacturer(color) {
    this.dialog.open(UpdateColorModalComponent, {
      data: { color },
      width: '50%',
    });
  }

  openDeleteManufacturerModal(id: number) {
    const dialogRef = this.dialog.open(ConfirmModalTemplateComponent, {
      data: {
        title: 'Удаление цвета',
        text: 'Вы уверены, что хотите удалить этот цвет?',
      },
      width: '60%',
    });

    dialogRef.afterClosed().subscribe((value) => {
      if (value) {
        this.store.dispatch(deleteColor({ colorId: id }));
      }
    });
  }
}
