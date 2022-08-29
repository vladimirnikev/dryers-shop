import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IColor } from 'src/app/common/interfaces/color.interface';
import { createColor } from 'src/app/store/colors/colors.actions';
import { selectAllColors } from '../../../../store/colors/colors.selectors';

@Component({
  selector: 'app-create-color-modal',
  templateUrl: './create-color-modal.component.html',
  styleUrls: ['./create-color-modal.component.scss'],
})
export class CreateColorModalComponent implements OnInit, OnDestroy {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  colors: IColor[];

  sub = new Subscription();

  isSimilarName = false;

  constructor(private store$: Store, private dialogRef: MatDialogRef<CreateColorModalComponent>) {}

  ngOnInit(): void {
    this.sub.add(
      this.store$.select(selectAllColors).subscribe((colors) => {
        this.colors = colors;
      }),
    );
    this.sub.add(
      this.form.get('name').valueChanges.subscribe((value) => {
        if (this.colors.some((color) => color?.name === value)) {
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
    this.store$.dispatch(createColor({ dto: this.form.getRawValue() }));
    this.dialogRef.close();
  }
}
