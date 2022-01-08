import { CreateColorModalComponent } from './../create-color-modal/create-color-modal.component';
import { CreateItemPageComponent } from './../create-item-page/create-item-page.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { CreateManufacturerModalComponent } from '../create-manufacturer-modal/create-manufacturer-modal.component';
import { ManufacturersListModalComponent } from '../manufacturers-list-modal/manufacturers-list-modal.component';
import { ColorsListModalComponent } from '../colors-list-modal/colors-list-modal.component';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openCreateProductModal() {
    this.dialog.open(CreateItemPageComponent, {
      width: '80%'
    })
  }

  openCreateManufacturerModal() {
    this.dialog.open(CreateManufacturerModalComponent)
  }

  openManufacturersListModal() {
    this.dialog.open(ManufacturersListModalComponent, {
      width: '40%'
    })
  }

  openCreateColorModal() {
    this.dialog.open(CreateColorModalComponent)
  }

  openColorsListModal() {
    this.dialog.open(ColorsListModalComponent, {
      width: '40%'
    })
  }
}
