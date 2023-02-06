import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IProduct } from 'src/app/common/interfaces/product.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import {
  selectProductById,
  selectProductsLoadingStatus,
} from 'src/app/store/products/products.selectors';
import { Subscription, zip } from 'rxjs';
import { HelperService } from 'src/app/shared/services/helper.service';
import { selectAllManufacturers } from 'src/app/store/manufacturers/manufacturers.selectors';
import { IColor } from 'src/app/common/interfaces/color.interface';
import { environment } from 'src/environments/environment';
import { deleteImage, updateProduct } from '../../../../store/products/products.actions';
import { selectAllColors } from '../../../../store/colors/colors.selectors';

@Component({
  selector: 'app-update-item-modal',
  templateUrl: './update-item-modal.component.html',
  styleUrls: ['./update-item-modal.component.scss'],
})
export class UpdateItemModalComponent implements OnInit, OnDestroy {
  @ViewChild('file') fileInput: ElementRef<HTMLElement>;

  imagesApi = environment.serverImagesUrl;

  formData: FormData = new FormData();

  isLoading$;

  imagesArr: string[] = [];

  newImages = [];

  files: File[] = [];

  sub: Subscription = new Subscription();

  isNotValidColors;

  colors: IColor[];

  manufacturers$ = this.store$.select(selectAllManufacturers);

  form = new FormGroup({
    name: new FormControl(null, Validators.required),
    nameUa: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),
    priceWithDiscount: new FormControl(null),
    power: new FormControl(null, Validators.required),
    availability: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    descriptionUa: new FormControl(null, Validators.required),
    colors: new FormGroup({}),
    manufacturer: new FormControl(null, Validators.required),
    mainImg: new FormControl(null, Validators.required),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IProduct,
    private store$: Store,
    private dialogRef: MatDialogRef<UpdateItemModalComponent>,
    private helperService: HelperService,
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store$.select(selectProductsLoadingStatus);
    const product$ = this.store$.select(selectProductById(Number(this.data.id)));
    const colors$ = this.store$.select(selectAllColors);
    this.sub.add(
      zip(product$, colors$).subscribe(([product, colors]: [IProduct, IColor[]]) => {
        this.colors = colors;
        this.form.setControl(
          'colors',
          new FormGroup({
            ...(<any>Object).fromEntries(
              colors.map((c) => [
                c.name,
                new FormControl(product.colors.some((color) => color.name === c.name)),
              ]),
            ),
          }),
        );
        this.form.patchValue({
          name: product.name,
          nameUa: product.nameUa,
          price: product.oldPrice ? product.oldPrice : product.price,
          priceWithDiscount: product.oldPrice ? product.price : null,
          power: product.power,
          availability: product.availability,
          description: product.description,
          descriptionUa: product.descriptionUa,
          manufacturer: product.manufacturer?.id,
          mainImg: product.mainImg,
        });
        this.imagesArr = product.imageUrls;
        this.isNotValidColors = Object.values(this.form.get('colors').value).every(
          (color) => color === false,
        );
      }),
    );
    this.sub.add(
      this.form.get('colors').valueChanges.subscribe((colors) => {
        this.isNotValidColors = Object.values(colors).every((color) => color === false);
      }),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  updateItem() {
    let dto = this.form.getRawValue();
    const selectedColors = Object.keys(dto.colors).filter((color) => !!dto.colors[color]);
    dto.colors = this.colors
      .filter((color) => selectedColors.indexOf(color.name) > -1)
      .map((color) => color.id);
    delete dto.file;

    if (dto.priceWithDiscount) {
      dto = { ...dto, price: dto.priceWithDiscount, oldPrice: dto.price };
    } else {
      delete dto.priceWithDiscount;
    }

    this.helperService.appendDataFromForm(dto, this.formData);
    dto = this.formData;

    this.store$.dispatch(updateProduct({ dto, id: this.data.id }));

    this.dialogRef.close();
  }

  deleteImage(imageUrl: string) {
    this.store$.dispatch(
      deleteImage({
        productId: this.data.id,
        dto: { imageUrl },
      }),
    );

    this.imagesArr = this.imagesArr.filter((img) => img !== imageUrl);

    if (this.form.value.mainImg === imageUrl) {
      this.form.patchValue({ mainImg: this.imagesArr[0] || 0 });
    }
  }

  deleteImageForUpload(idx) {
    this.newImages = this.newImages.filter((img, index) => index !== idx);
    this.files = this.files.filter((file, index) => index !== idx);
    this.formData.delete('files');

    for (let i = 0; i < this.files.length; i++) {
      this.formData.append('files', this.files[i], this.files[i].name);
    }

    this.form.patchValue({
      images: this.newImages,
    });

    if (+this.form.value.mainImg === +idx) {
      this.form.patchValue({ mainImg: this.imagesArr[0] || 0 });
    }
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
      const mimeType = files[key].type;
      if (mimeType.match(/image\/*/) == null) {
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
        this.newImages.push(reader.result);
        this.files.push(files[key]);
      };
    });

    this.form.patchValue({
      file: formData,
    });
  }

  triggerClickInput() {
    this.fileInput.nativeElement.click();
  }
}
