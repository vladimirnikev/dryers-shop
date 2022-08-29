import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { createManufacturer } from 'src/app/store/manufacturers/manufacturers.actions';
import { selectAllManufacturers } from 'src/app/store/manufacturers/manufacturers.selectors';
import { Subscription } from 'rxjs';
import { IManufacturer } from '../../../../common/interfaces/manufacturer.interface';

@Component({
  selector: 'app-create-manufacturer-modal',
  templateUrl: './create-manufacturer-modal.component.html',
  styleUrls: ['./create-manufacturer-modal.component.scss'],
})
export class CreateManufacturerModalComponent implements OnInit, OnDestroy {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  manufacturers: IManufacturer[];

  sub = new Subscription();

  isSimilarName = false;

  constructor(
    private store$: Store,
    private dialogRef: MatDialogRef<CreateManufacturerModalComponent>,
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
    this.store$.dispatch(createManufacturer({ dto: this.form.getRawValue() }));
    this.dialogRef.close();
  }
}
