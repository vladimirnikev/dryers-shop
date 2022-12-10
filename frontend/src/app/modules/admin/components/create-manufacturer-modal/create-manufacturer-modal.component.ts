import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { createManufacturer } from 'src/app/store/manufacturers/manufacturers.actions';
import { selectAllManufacturers } from 'src/app/store/manufacturers/manufacturers.selectors';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HelperService } from 'src/app/shared/services/helper.service';
import { IManufacturer } from '../../../../common/interfaces/manufacturer.interface';

@Component({
  selector: 'app-create-manufacturer-modal',
  templateUrl: './create-manufacturer-modal.component.html',
  styleUrls: ['./create-manufacturer-modal.component.scss'],
})
export class CreateManufacturerModalComponent implements OnInit, OnDestroy {
  formData: FormData = new FormData();

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    file: new FormControl(this.formData),
  });

  @ViewChild('file') fileInput: ElementRef<HTMLElement>;

  @ViewChild('imgCard') imgCard: ElementRef<HTMLElement>;

  image: string | ArrayBuffer;

  manufacturers: IManufacturer[];

  sub = new Subscription();

  isSimilarName = false;

  constructor(
    private store$: Store,
    private dialogRef: MatDialogRef<CreateManufacturerModalComponent>,
    private snackBar: MatSnackBar,
    private helperService: HelperService,
  ) {}

  ngOnInit(): void {
    this.sub.add(
      this.store$
        .select(selectAllManufacturers)
        .subscribe((manufacturers) => (this.manufacturers = manufacturers)),
    );
    this.sub.add(
      this.form.get('name').valueChanges.subscribe((value) => {
        if (this.manufacturers.some((manufacturer) => manufacturer.name === value)) {
          return (this.isSimilarName = true);
        }
        return (this.isSimilarName = false);
      }),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  createItem() {
    let dto = this.form.getRawValue();
    delete dto.file;
    this.helperService.appendDataFromForm(dto, this.formData);
    dto = this.formData;
    this.store$.dispatch(createManufacturer({ dto }));
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

  deleteImage() {
    this.image = null;
    this.imgCard.nativeElement.innerHTML = '';
    this.form.patchValue({
      image: null,
    });
  }
}
