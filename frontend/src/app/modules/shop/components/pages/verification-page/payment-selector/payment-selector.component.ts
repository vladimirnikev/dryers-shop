import { Component, OnInit, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { Subscription } from 'rxjs';

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
export class PaymentSelectorComponent implements OnInit, OnDestroy, ControlValueAccessor {
  sub = new Subscription();

  paymentTypes: { type: string; text: string }[];

  selected: string;

  disabled = false;

  private onTouched: Function;

  private onChanged: Function;

  constructor(private translocoService: TranslocoService) {}

  ngOnInit(): void {
    this.sub.add(
      this.translocoService.selectTranslation().subscribe((translate) => {
        this.paymentTypes = [
          { type: 'CASH', text: translate['VERIFICATION_PAGE.CASH'] },
          { type: 'CARD', text: translate['VERIFICATION_PAGE.CARD'] },
          { type: 'CARD-ONLINE', text: translate['VERIFICATION_PAGE.CARD_ONLINE'] },
        ];
      }),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

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
