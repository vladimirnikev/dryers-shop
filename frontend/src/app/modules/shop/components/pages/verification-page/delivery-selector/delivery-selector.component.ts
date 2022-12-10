import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { Subscription } from 'rxjs';
import { HelperService } from 'src/app/shared/services/helper.service';

@Component({
  selector: 'app-delivery-selector',
  templateUrl: './delivery-selector.component.html',
  styleUrls: ['./delivery-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DeliverySelectorComponent,
      multi: true,
    },
  ],
})
export class DeliverySelectorComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() isTriedSubmit = false;

  sub = new Subscription();

  deliveryTypes: { type: string; text?: string }[] = [
    {
      type: 'SHOP',
    },
    {
      type: 'POST',
    },
  ];

  postTypeSelectors: { type: string; text?: string }[] = [
    {
      type: 'OFFICE',
    },
    {
      type: 'COURIER',
    },
  ];

  selectedDelivery: string;

  selectedPost: string;

  disabled = false;

  deliveryForm: FormGroup;

  private onTouched: Function;

  private onChanged: Function;

  constructor(
    private fb: FormBuilder,
    private helperService: HelperService,
    private translocoService: TranslocoService,
  ) {
    this.deliveryForm = this.fb.group({
      city: [''],
      courier: this.fb.group({
        street: [''],
        houseNumber: [''],
        apartmentNumber: [''],
        entrance: [''],
        floor: [''],
      }),
      office: [''],
    });
  }

  ngOnInit(): void {
    this.sub.add(
      this.deliveryForm.valueChanges.subscribe((v) => {
        const clearForm = this.helperService.removeEmptyValuesInObject(v);
        this.onChanged({
          deliveryType: 'POST',
          postType: this.selectedPost,
          address: { ...clearForm },
        });
      }),
    );

    this.sub.add(
      this.translocoService.selectTranslation().subscribe((translate) => {
        this.deliveryTypes = [
          {
            type: 'SHOP',
            text: translate['VERIFICATION_PAGE.PICKUP'],
          },
          {
            type: 'POST',
            text: translate['VERIFICATION_PAGE.DELIVERY_NEW_POST'],
          },
        ];

        this.postTypeSelectors = [
          {
            type: 'OFFICE',
            text: translate['VERIFICATION_PAGE.DELIVERY_TO_POST_OFFICE'],
          },
          {
            type: 'COURIER',
            text: translate['VERIFICATION_PAGE.DELIVERY_COURIER'],
          },
        ];
      }),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  selectType(type: string) {
    this.formCourier.reset();
    this.formOffice.reset();
    if (type === 'POST') {
      this.formCity.setValidators([Validators.required]);
      this.formOffice.setValidators([Validators.required]);
      this.onTouched(); // <-- mark as touched
      this.selectedDelivery = type;
      this.onChanged({ deliveryType: type, postType: this.postTypeSelectors[0].type }); // <-- call function to let know of a change
      return;
    }
    this.formCity.reset();
    this.formCity.clearValidators();
    this.formOffice.clearValidators();
    this.onTouched(); // <-- mark as touched
    this.selectedDelivery = type;
    this.onChanged({ deliveryType: type }); // <-- call function to let know of a change
  }

  selectPostType(type: string) {
    this.formCourier.reset();
    this.formOffice.reset();
    if (type === 'COURIER') {
      this.formCourierStreet.setValidators([Validators.required]);
      this.formCourierHouseNumber.setValidators([Validators.required]);
      this.onTouched(); // <-- mark as touched
      this.selectedPost = type;
      this.onChanged({ deliveryType: this.selectedDelivery, postType: type }); // <-- call function to let know of a change
      return;
    }
    this.formCourierStreet.clearValidators();
    this.formCourierHouseNumber.clearValidators();
    this.onTouched(); // <-- mark as touched
    this.selectedPost = type;
    this.onChanged({ deliveryType: this.selectedDelivery, postType: type }); // <-- call function to let know of a change
  }

  writeValue(value: any): void {
    this.selectedDelivery = value.deliveryType;
    this.selectedPost = this.postTypeSelectors[0].type;
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

  get formCourier() {
    return this.deliveryForm.get('courier');
  }

  get formOffice() {
    return this.deliveryForm.get('office');
  }

  get formCity() {
    return this.deliveryForm.get('city');
  }

  get formCourierStreet() {
    return this.formCourier.get('street');
  }

  get formCourierHouseNumber() {
    return this.formCourier.get('houseNumber');
  }

  get formCourierApartmentNumber() {
    return this.formCourier.get('apartmentNumber');
  }

  get formCourierEntrance() {
    return this.formCourier.get('entrance');
  }

  get formCourierFloor() {
    return this.formCourier.get('floor');
  }
}
