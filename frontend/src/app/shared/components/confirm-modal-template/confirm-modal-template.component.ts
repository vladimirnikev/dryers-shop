import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IConfirmModalData } from 'src/app/common/interfaces/confirm-modal-data.interface';

@Component({
  selector: 'app-confirm-modal-template',
  templateUrl: './confirm-modal-template.component.html',
  styleUrls: ['./confirm-modal-template.component.scss'],
})
export class ConfirmModalTemplateComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: IConfirmModalData) {}
}
