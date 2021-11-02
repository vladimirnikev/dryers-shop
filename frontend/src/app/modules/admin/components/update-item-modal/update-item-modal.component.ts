import { updateProduct } from './../../../../store/products/products.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { IProduct } from 'src/common/interfaces/product.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-update-item-modal',
  templateUrl: './update-item-modal.component.html',
  styleUrls: ['./update-item-modal.component.scss']
})
export class UpdateItemModalComponent implements OnInit {
  @ViewChild('file') fileInput: ElementRef<HTMLElement>;

  imagesArr = this.data.images
  batches = ['Mario', 'Laris']
  isDisable = false

  form = new FormGroup({
    name: new FormControl(this.data.name, Validators.required),
    price: new FormControl(this.data.price, Validators.required),
    power: new FormControl(this.data.power, Validators.required),
    availability: new FormControl(this.data.availability, Validators.required),
    description: new FormControl(this.data.description, Validators.required),
    images: new FormControl(this.data.images),
    colors: new FormGroup({
      white: new FormControl(!!this.data.color.find(color => color === 'white')),
      black: new FormControl(!!this.data.color.find(color => color === 'black')),
      chromium: new FormControl(!!this.data.color.find(color => color === 'chromium')),
      gold: new FormControl(!!this.data.color.find(color => color === 'gold'))
    }),
    batch: new FormControl(this.data.batch, Validators.required)
  })
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IProduct,
    private store$: Store,
    private dialogRef: MatDialogRef<UpdateItemModalComponent>
  ) { }

  ngOnInit(): void {
  }

  updateItem() {
    const dto = this.form.getRawValue()
    const selectedColors = Object.keys(dto.colors).filter(color => !!dto.colors[color])
    dto.color = selectedColors
    delete dto.colors
    this.dialogRef.close({ dto, id: this.data.id })
  }

  deleteImage(idx) { }
  triggerClickInput() { }
  preview(file) { }

}
