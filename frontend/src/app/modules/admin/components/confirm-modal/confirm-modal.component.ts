import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmModalComponent>, private dialog: MatDialog) {}

  closeAllModals() {
    this.dialog.closeAll();
  }
}
