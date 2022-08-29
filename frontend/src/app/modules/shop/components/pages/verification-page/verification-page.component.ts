import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HelperService } from 'src/app/shared/services/helper.service';

@Component({
  selector: 'app-verification-page',
  templateUrl: './verification-page.component.html',
  styleUrls: ['./verification-page.component.scss'],
})
export class VerificationPageComponent {
  sum = 10000;

  orderForm: FormGroup;

  isTriedSubmit = false;

  constructor(private helperService: HelperService) {}

  setFormData(event) {
    this.orderForm = event;
  }

  makeOrder() {
    if (this.orderForm.invalid) {
      this.isTriedSubmit = true;
      return;
    }

    console.log(this.helperService.removeEmptyValuesInObject(this.orderForm.value));
  }
}
