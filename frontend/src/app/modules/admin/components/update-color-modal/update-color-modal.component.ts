import { selectAllColors } from './../../../../store/colors/colors.selectors';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IColor } from 'src/common/interfaces/color.interface';
import { updateColor } from 'src/app/store/colors/colors.actions';

@Component({
  selector: 'app-update-color-modal',
  templateUrl: './update-color-modal.component.html',
  styleUrls: ['./update-color-modal.component.scss']
})
export class UpdateColorModalComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', Validators.required)
  })
  colors: IColor[]
  sub = new Subscription()
  isSimilarName = true

  constructor(
    private store$: Store,
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<UpdateColorModalComponent>
  ) { }

  ngOnInit(): void {
    this.form.get('name').setValue(this.data.color.name)
    this.sub.add(this.store$.select(selectAllColors)
      .subscribe(colors => this.colors = colors))
    this.sub.add(this.form.get('name').valueChanges.subscribe(value => {
      if (this.colors.some(color => color.name === value)) {
        return this.isSimilarName = true
      }
      return this.isSimilarName = false
    }))
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  updateItem() {
    this.store$.dispatch(updateColor({ dto: this.form.getRawValue(), id: this.data.color.id }))
    this.dialogRef.close()
  }
}