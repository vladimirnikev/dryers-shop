import { selectAllColors } from './../../../../store/colors/colors.selectors';
import { createProduct } from './../../../../store/products/products.actions';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { HelperService } from 'src/app/shared/services/helper.service';
import { Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { selectAllManufacturers } from 'src/app/store/manufacturers/manufacturers.selectors';
import { IColor } from 'src/common/interfaces/color.interface';

@Component({
  selector: 'app-create-item-page',
  templateUrl: './create-item-page.component.html',
  styleUrls: ['./create-item-page.component.scss']
})
export class CreateItemPageComponent implements OnInit {
  @ViewChild('file') fileInput: ElementRef<HTMLElement>;
  formData: FormData = new FormData()
  imagesArr = []
  manufacturers$ = this.store$.select(selectAllManufacturers)
  colors: IColor[]
  isDisable = false
  sub: Subscription = new Subscription()
  isNotValidColors = true
  form

  constructor(
    private store$: Store,
    private helperService: HelperService,
    private dialogRef: MatDialogRef<CreateItemPageComponent>
  ) { }

  ngOnInit(): void {
    this.sub.add(this.store$.select(selectAllColors)
      .subscribe(colors => {
        this.colors = colors
        this.form = new FormGroup({
          name: new FormControl('', Validators.required),
          price: new FormControl('', Validators.required),
          power: new FormControl('', Validators.required),
          availability: new FormControl(true, Validators.required),
          description: new FormControl('', Validators.required),
          file: new FormControl(this.formData),
          colors: new FormGroup({
            ...(<any>Object)
              .fromEntries(colors.map(c =>
                [c.name, new FormControl(false)]
              ))
          }),
          manufacturer: new FormControl('', Validators.required)
        })
      }))
    this.sub.add(this.form.get('colors').valueChanges
      .subscribe(colors => {
        this.isNotValidColors = Object.values(colors).every(value => value === false)
      }))
  }

  triggerClickInput() {
    this.fileInput.nativeElement.click()
  }

  deleteImage(idx) {
    this.imagesArr = this.imagesArr.filter((img, index) => index !== idx)
    this.form.patchValue({
      images: this.imagesArr
    });
  }

  createItem() {
    let dto = this.form.getRawValue()
    const selectedColors = Object.keys(dto.colors)
      .filter(color => !!dto.colors[color])

    dto.colors = this.colors.filter(color => selectedColors.indexOf(color.name) > -1)
      .map(color => color.id)

    delete dto.file

    this.helperService.appendDataFromForm(dto, this.formData)
    dto = this.formData
    this.store$.dispatch(createProduct({ dto }))
    this.dialogRef.close()
  }

  preview(files) {
    files = Array(files)[0]
    const formData = new FormData()
    for (let i = 0; i < files.length; i++) {
      this.formData.append('files', files[i], files[i].name)
    }

    if (files.length === 0) {
      return
    }
    const isNotValidFiles = Object.keys(files).some(key => {
      var mimeType = files[key].type
      if (mimeType.match(/image\/*/) == null) {
        // this.message = "Only images are supported.";
        return
      }
    })

    if (isNotValidFiles) {
      return
    }

    Object.keys(files).forEach(key => {
      var reader = new FileReader();
      reader.readAsDataURL(files[key]);
      reader.onload = () => {
        this.imagesArr.push(reader.result)
      }
    })

    this.form.patchValue({
      file: formData
    })
  }
}
