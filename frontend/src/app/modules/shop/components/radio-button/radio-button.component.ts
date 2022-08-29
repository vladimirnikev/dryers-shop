import { Component, Input } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: PaymentSelectorComponent,
    },
  ],
})
export class PaymentSelectorComponent implements ControlValueAccessor {
  @Input() value: any;

  /* eslint-disable-next-line */
  onChange = (value: any) => { };

  onTouched: () => void;

  control: FormControl;

  constructor(private fb: FormBuilder) {
    this.control = this.fb.control('');
  }

  writeValue(obj: any): void {
    this.control.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

  select() {
    this.control.setValue(this.value);
    this.onChange(this.control.value);
  }
}
