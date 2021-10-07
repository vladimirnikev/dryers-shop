import { createProduct } from './../../../../store/products/products.actions';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-create-item-page',
  templateUrl: './create-item-page.component.html',
  styleUrls: ['./create-item-page.component.scss']
})
export class CreateItemPageComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    power: new FormControl('', Validators.required),
    avaibility: new FormControl('true'),
    description: new FormControl('', Validators.required),
    // colors: new FormControl('', Validators.required)
  })

  isDisable = false
  constructor(
    private store$: Store
  ) { }

  ngOnInit(): void {
    console.log(this.form.valid)
  }

  loadImage() {

  }

  createItem() {
    this.isDisable = true
    // request
    this.store$.dispatch(createProduct(this.form.getRawValue()))
    this.isDisable = false
    // console.log(this.form.getRawValue())
  }

  imagesArr = []
  preview(files) {
    files = Array(files)[0]

    if (files.length === 0)
      return;

    const isNotValidFiles = Object.keys(files).some(key => {
      var mimeType = files[key].type;
      if (mimeType.match(/image\/*/) == null) {
        // this.message = "Only images are supported.";
        return;
      }
    })

    if (isNotValidFiles) {
      return
    }

    Object.keys(files).forEach(async key => {
      var reader = new FileReader();
      reader.readAsDataURL(files[key]);
      reader.onload = () => {
        this.imagesArr.push(reader.result)
      }
    })
  }
}
