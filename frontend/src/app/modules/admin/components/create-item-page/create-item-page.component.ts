import { createProduct } from './../../../../store/products/products.actions';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-create-item-page',
  templateUrl: './create-item-page.component.html',
  styleUrls: ['./create-item-page.component.scss']
})
export class CreateItemPageComponent implements OnInit {
  @ViewChild('file') fileInput: ElementRef<HTMLElement>;
  formData: FormData = new FormData()
  imagesArr = []
  batches = ['Mario', 'Laris']
  isDisable = false

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    power: new FormControl('', Validators.required),
    availability: new FormControl(true, Validators.required),
    description: new FormControl('', Validators.required),
    file: new FormControl(this.formData),
    colors: new FormGroup({
      white: new FormControl(false),
      black: new FormControl(false),
      chromium: new FormControl(false)
    }),
    batch: new FormControl('', Validators.required)
  })

  constructor(
    private store$: Store,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  triggerClickInput() {
    this.fileInput.nativeElement.click()
  }

  deleteImage(value) {
    this.imagesArr = this.imagesArr.filter((img, index) => index !== value)
    this.form.patchValue({
      images: this.imagesArr
    });
  }

  createItem() {
    // this.isDisable = true
    // Заменить на loading в store

    const dto = this.form.getRawValue()
    const selectedColors = Object.keys(dto.colors).filter(color => !!dto.colors[color])
    dto.color = selectedColors
    delete dto.colors
    //
    const files = dto.file
    delete dto.file
    //
    this.store$.dispatch(createProduct({ dto, files }))

    // this.isDisable = false
    // Заменить на loading в store
    this.router.navigate(['items'])
  }

  preview(files) {
    files = Array(files)[0]
    const formData = new FormData()
    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i], files[i].name)
    }
    // this.formData = formData

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
    // this.store$.dispatch(createProduct({ dto: formData })) // Временно
  }
}
