import { Component, Input } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputComponent,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() id: string;

  @Input() inputName: string;

  @Input() inputType: string;

  @Input() label: string;

  @Input() required: boolean;

  @Input() placeholder: string;

  @Input() isTriedSubmit = false;

  control: FormControl;

  onChange: (fullName: string) => void;

  onTouched: () => void;

  constructor(private fb: FormBuilder) {
    this.control = this.fb.control('');
  }

  doInput() {
    this.onChange(this.control.value);
  }

  doBlur() {
    this.onTouched();
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
}
