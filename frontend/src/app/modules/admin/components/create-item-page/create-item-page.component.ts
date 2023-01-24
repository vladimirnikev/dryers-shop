import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { HelperService } from 'src/app/shared/services/helper.service';
import { Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { selectAllManufacturers } from 'src/app/store/manufacturers/manufacturers.selectors';
import { IColor } from 'src/app/common/interfaces/color.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { createProduct } from '../../../../store/products/products.actions';
import { selectAllColors } from '../../../../store/colors/colors.selectors';

@Component({
  selector: 'app-create-item-page',
  templateUrl: './create-item-page.component.html',
  styleUrls: ['./create-item-page.component.scss'],
})
export class CreateItemPageComponent implements OnInit, OnDestroy {
  @ViewChild('file') fileInput: ElementRef<HTMLElement>;

  formData: FormData = new FormData();

  imagesArr = [];

  files: File[] = [];

  manufacturers$ = this.store$.select(selectAllManufacturers);

  colors: IColor[];

  isDisable = false;

  sub: Subscription = new Subscription();

  isNotValidColors = true;

  form;

  constructor(
    private store$: Store,
    private helperService: HelperService,
    private dialogRef: MatDialogRef<CreateItemPageComponent>,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.sub.add(
      this.store$.select(selectAllColors).subscribe((colors) => {
        this.colors = colors;
        this.form = new FormGroup({
          name: new FormControl('', Validators.required),
          nameUa: new FormControl('', Validators.required),
          price: new FormControl('', Validators.required),
          priceWithDiscount: new FormControl(''),
          power: new FormControl('', Validators.required),
          availability: new FormControl(true, Validators.required),
          description: new FormControl('', Validators.required),
          descriptionUa: new FormControl('', Validators.required),
          file: new FormControl(this.formData),
          colors: new FormGroup({
            ...(<any>Object).fromEntries(colors.map((c) => [c.name, new FormControl(false)])),
          }),
          manufacturer: new FormControl('', Validators.required),
          mainImg: new FormControl(0, Validators.required),
        });
      }),
    );
    this.sub.add(
      this.form.get('colors').valueChanges.subscribe((colors) => {
        this.isNotValidColors = Object.values(colors).every((value) => value === false);
      }),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  triggerClickInput() {
    this.fileInput.nativeElement.click();
  }

  deleteImage(idx) {
    this.imagesArr = this.imagesArr.filter((img, index) => index !== idx);
    this.files = this.files.filter((file, index) => index !== idx);
    this.form.patchValue({
      images: this.imagesArr,
    });

    this.formData.delete('files');

    for (let i = 0; i < this.files.length; i++) {
      this.formData.append('files', this.files[i], this.files[i].name);
    }

    if (this.form.value.mainImg === idx) {
      if (this.imagesArr.length) {
        this.form.patchValue({ mainImg: 0 });
      }
    }
  }

  createItem() {
    let dto = this.form.getRawValue();
    const selectedColors = Object.keys(dto.colors).filter((color) => !!dto.colors[color]);

    dto.colors = this.colors
      .filter((color) => selectedColors.indexOf(color.name) > -1)
      .map((color) => color.id);

    if (dto.priceWithDiscount) {
      dto = { ...dto, price: dto.priceWithDiscount, oldPrice: dto.price };
    } else {
      delete dto.priceWithDiscount;
    }

    delete dto.file;

    this.helperService.appendDataFromForm(dto, this.formData);
    dto = this.formData;
    this.store$.dispatch(createProduct({ dto }));
    this.dialogRef.close();
  }

  preview(files) {
    files = Array(files)[0];
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      this.formData.append('files', files[i], files[i].name);
    }

    if (files.length === 0) {
      return;
    }
    const isNotValidFiles = Object.keys(files).some((key) => {
      const extension = files[0].name.split('.').pop().toLowerCase();
      const mimeType = files[key].type;
      if (mimeType.match(/image\/*/) == null || extension === 'svg') {
        this.snackBar.open(`Данный формат не поддерживается`, 'Error', {
          duration: 5000,
          panelClass: 'red-snackbar',
        });
        return true;
      }
      return false;
    });

    if (isNotValidFiles) {
      return;
    }

    Object.keys(files).forEach((key) => {
      const reader = new FileReader();
      reader.readAsDataURL(files[key]);
      reader.onload = () => {
        this.imagesArr.push(reader.result);
        this.files.push(files[key]);
      };
    });

    this.form.patchValue({
      file: formData,
    });
  }
}
