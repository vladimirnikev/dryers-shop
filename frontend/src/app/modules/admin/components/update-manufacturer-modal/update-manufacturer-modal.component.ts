import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { updateManufacturer } from 'src/app/store/manufacturers/manufacturers.actions';
import { selectAllManufacturers } from 'src/app/store/manufacturers/manufacturers.selectors';
import { IManufacturer } from '../../../../common/interfaces/manufacturer.interface';

@Component({
  selector: 'app-update-manufacturer-modal',
  templateUrl: './update-manufacturer-modal.component.html',
  styleUrls: ['./update-manufacturer-modal.component.scss'],
})
export class UpdateManufacturerModalComponent implements OnInit, OnDestroy {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  manufacturers: IManufacturer[];

  sub = new Subscription();

  isSimilarName = true;

  constructor(
    private store$: Store,
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<UpdateManufacturerModalComponent>,
  ) {}

  ngOnInit(): void {
    this.form.get('name').setValue(this.data.manufacturer.name);
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

  updateItem() {
    this.store$.dispatch(
      updateManufacturer({ dto: this.form.getRawValue(), id: this.data.manufacturer.id }),
    );
    this.dialogRef.close();
  }
}
