import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { updateManufacturer } from 'src/app/store/manufacturers/manufacturers.actions';
import { selectAllManufacturers } from 'src/app/store/manufacturers/manufacturers.selectors';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HelperService } from 'src/app/shared/services/helper.service';
import { IManufacturer } from '../../../../common/interfaces/manufacturer.interface';

@Component({
  selector: 'app-update-manufacturer-modal',
  templateUrl: './update-manufacturer-modal.component.html',
  styleUrls: ['./update-manufacturer-modal.component.scss'],
})
export class UpdateManufacturerModalComponent implements OnInit, OnDestroy {
  @ViewChild('file') fileInput: ElementRef<HTMLElement>;

  @ViewChild('imgCard') imgCard: ElementRef<HTMLElement>;

  image: string | ArrayBuffer;

  manufacturers: IManufacturer[];

  sub = new Subscription();

  isSimilarName = true;

  isImgChanged: boolean = false;

  formData: FormData = new FormData();

  form: FormGroup;

  constructor(
    private store$: Store,
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<UpdateManufacturerModalComponent>,
    private snackBar: MatSnackBar,
    private helperService: HelperService,
  ) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      file: new FormControl([this.formData]),
    });
  }

  ngOnInit(): void {
    this.image = this.data.manufacturer.img;
    this.sub.add(
      this.store$
        .select(selectAllManufacturers)
        .subscribe((manufacturers) => (this.manufacturers = manufacturers)),
    );
    this.sub.add(
      this.form.get('name').valueChanges.subscribe((value) => {
        if (
          this.manufacturers.some((manufacturer) => manufacturer.name === value) &&
          value !== this.data.manufacturer.name
        ) {
          return (this.isSimilarName = true);
        }
        return (this.isSimilarName = false);
      }),
    );

    this.form.get('name').setValue(this.data.manufacturer.name);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  updateItem() {
    let dto = this.form.getRawValue();
    delete dto.file;
    this.helperService.appendDataFromForm(dto, this.formData);
    dto = this.formData;
    this.store$.dispatch(updateManufacturer({ dto, id: this.data.manufacturer.id }));
    this.dialogRef.close();
  }

  triggerClickInput() {
    this.fileInput.nativeElement.click();
  }

  preview(files) {
    if (!files.length) {
      return;
    }

    this.formData = new FormData();

    if (this.image?.toString().includes('svg')) {
      this.imgCard.nativeElement.innerHTML = '';
    }

    files = Array(files)[0];
    const formData = new FormData();
    this.formData.append('file', files[0], files[0].name);

    if (files.length === 0) {
      return;
    }

    const isNotValidFiles = Object.keys(files).some((key) => {
      const mimeType = files[key].type;

      if (mimeType.match(/image\/*/) == null) {
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

    const extension = files[0].name.split('.').pop().toLowerCase();
    const fileKey = files[Object.keys(files)[0]];
    const reader = new FileReader();
    this.isImgChanged = true;
    if (extension === 'svg') {
      reader.readAsText(fileKey);
      reader.onload = () => {
        this.image = reader.result;
        this.imgCard.nativeElement.innerHTML = this.image.toString();
      };

      this.form.patchValue({
        file: formData,
      });
    } else {
      reader.readAsDataURL(fileKey);
      reader.onload = () => {
        this.image = reader.result;
      };

      this.form.patchValue({
        file: formData,
      });
    }
  }
}
