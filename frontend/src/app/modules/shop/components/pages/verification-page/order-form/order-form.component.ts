import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { createDeliveryValidator } from 'src/app/validators/delivery-validator';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent implements OnInit, OnDestroy {
  sub = new Subscription();

  orderForm: FormGroup;

  @Input() isTriedSubmit: boolean;

  @Output() formEvent = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      fullName: ['', [Validators.required]],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?:\+38)?(?:\(0[0-9][0-9]\)[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|0[0-9][0-9][ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|0[0-9][0-9][0-9]{7})$/gm,
          ),
        ],
      ],
      email: [''],
      paymentType: ['cash', [Validators.required]],
      delivery: [{ deliveryType: 'shop' }, [createDeliveryValidator()]],
    });
  }

  ngOnInit(): void {
    this.formEvent.emit(this.orderForm);

    this.sub.add(this.orderForm.valueChanges.subscribe(() => this.formEvent.emit(this.orderForm)));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  get orderFormFullName() {
    return this.orderForm.get('fullName');
  }

  get orderFormPhone() {
    return this.orderForm.get('phone');
  }

  get orderFormEmail() {
    return this.orderForm.get('email');
  }

  get orderFormPaymentType() {
    return this.orderForm.get('paymentType');
  }
}
