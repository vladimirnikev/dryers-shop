import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Injectable()
export class DialogService {
  private dialogColorsRef: BehaviorSubject<MatDialogRef<any>> = new BehaviorSubject(null);

  private dialogColorsRefSubject = this.dialogColorsRef.asObservable();

  setDialogRef(dialogRef: MatDialogRef<any>) {
    this.dialogColorsRef.next(dialogRef);
  }

  getColorsDialogRef(): Observable<MatDialogRef<any>> {
    return this.dialogColorsRefSubject;
  }
}
