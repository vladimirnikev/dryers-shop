import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-payment-selector',
  templateUrl: './payment-selector.component.html',
  styleUrls: ['./payment-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PaymentSelectorComponent,
      multi: true,
    },
  ],
})
export class PaymentSelectorComponent implements ControlValueAccessor {
  paymentTypes = [
    { type: 'CASH', text: 'Оплата наличными при получении' },
    { type: 'CARD', text: 'Оплата картой при получении (Visa/MasterCard)' },
    { type: 'CARD-ONLINE', text: 'Оплата картой онлайн (Visa/MasterCard)' },
  ];

  selected: string;

  disabled = false;

  private onTouched: Function;

  private onChanged: Function;

  selectType(type: string) {
    this.onTouched(); // <-- mark as touched
    this.selected = type;
    this.onChanged(type); // <-- call function to let know of a change
  }

  writeValue(value: string): void {
    this.selected = value;
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
