import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IColor } from 'src/app/common/interfaces/color.interface';
import { updateColor } from 'src/app/store/colors/colors.actions';
import { selectAllColors } from '../../../../store/colors/colors.selectors';

@Component({
  selector: 'app-update-color-modal',
  templateUrl: './update-color-modal.component.html',
  styleUrls: ['./update-color-modal.component.scss'],
})
export class UpdateColorModalComponent implements OnInit, OnDestroy {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    nameUa: new FormControl('', Validators.required),
    code: new FormControl('#000000', [
      Validators.required,
      Validators.pattern(/^#[a-zA-Z0-9]{6,6}$/),
    ]),
  });

  colors: IColor[];

  sub = new Subscription();

  isSimilarName = true;

  constructor(
    private store$: Store,
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<UpdateColorModalComponent>,
  ) { }

  ngOnInit(): void {
    this.form.setValue({
      name: this.data.color.name,
      nameUa: this.data.color.nameUa,
      code: this.data.color.code,
    });
    this.sub.add(this.store$.select(selectAllColors).subscribe((colors) => (this.colors = colors)));
    this.sub.add(
      this.form.get('name').valueChanges.subscribe((value) => {
        if (this.colors.some((color) => color.name === value)) {
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
    this.store$.dispatch(updateColor({ dto: this.form.getRawValue(), id: this.data.color.id }));
    this.dialogRef.close();
  }
}
