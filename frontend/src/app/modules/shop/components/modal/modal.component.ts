import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { EModalType } from 'src/app/common/enums/modalType.enum';
import * as cartActions from 'src/app/store/cart/cart.actions';
import { HelperService } from 'src/app/shared/services/helper.service';
import * as userActions from 'src/app/store/users/users.action';
import { ModalService } from '../../services/modal.service';
import { IOrderInClickData } from '../../../../common/interfaces/order-in-click-data.interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  sub = new Subscription();

  display$: Observable<'open' | 'close'>;

  modalType$: Observable<EModalType>;

  recallForm: FormGroup;

  existingForm: FormGroup;

  buyInClickForm: FormGroup;

  isInvalidRecallForm: boolean;

  isInvalidExistingForm: boolean;

  isInvalidBuyInClickForm: boolean;

  isFormSent: boolean;

  mobileRegex =
    '^(?:\\+38)?(?:\\(0[0-9][0-9]\\)[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|0[0-9][0-9][ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|0[0-9][0-9][0-9]{7})$';

  constructor(
    private modalService: ModalService,
    fb: FormBuilder,
    private store: Store,
    private helperService: HelperService,
  ) {
    this.recallForm = fb.group({
      phone: ['', [Validators.required, Validators.pattern(this.mobileRegex)]],
      fullName: ['', [Validators.required]],
      message: [''],
    });

    this.existingForm = fb.group({
      phone: ['', [Validators.required, Validators.pattern(this.mobileRegex)]],
      fullName: ['', [Validators.required]],
      email: ['', [Validators.email]],
    });

    this.buyInClickForm = fb.group({
      phone: ['', [Validators.required, Validators.pattern(this.mobileRegex)]],
      fullName: ['', [Validators.required]],
      email: ['', [Validators.email]],
      message: [''],
    });
  }

  ngOnInit(): void {
    this.display$ = this.modalService.watch();
    this.modalType$ = this.modalService.watchModalType();
  }

  close() {
    this.recallForm.reset();
    this.buyInClickForm.reset();
    this.existingForm.reset();
    this.isInvalidRecallForm = false;
    this.isInvalidBuyInClickForm = false;
    this.isInvalidExistingForm = false;
    this.isFormSent = false;
    this.modalService.close();
  }

  sendRecallForm() {
    if (this.recallForm.invalid) {
      this.isInvalidRecallForm = true;
      return;
    }

    const data = this.recallForm.value;
    this.store.dispatch(userActions.makeCallRequest({ data }));
    this.isInvalidRecallForm = false;
    this.recallForm.reset();
    this.isFormSent = true;
  }

  sendExistingForm() {
    if (this.existingForm.invalid) {
      this.isInvalidExistingForm = true;
      return;
    }

    this.isInvalidExistingForm = false;
    this.existingForm.reset();
    this.close();
  }

  sendBuyInClickForm() {
    if (this.buyInClickForm.invalid) {
      this.isInvalidBuyInClickForm = true;
      return;
    }

    const productId = +this.modalService.buyInClickProductIdValue();

    const data = this.helperService.removeEmptyValuesInObject(
      this.buyInClickForm.value,
    ) as unknown as IOrderInClickData;

    if (productId) {
      this.store.dispatch(cartActions.makeOrderInClick({ data: { ...data, productId } }));
      this.isInvalidBuyInClickForm = false;
      this.buyInClickForm.reset();
      this.modalService.resetBuyInClickProductId();
      this.isFormSent = true;
      return;
    }

    this.store.dispatch(cartActions.makeOrderInClick({ data: { ...data } }));
    this.isInvalidBuyInClickForm = false;
    this.buyInClickForm.reset();
    this.modalService.resetBuyInClickProductId();
    this.isFormSent = true;
  }

  get recallFormPhone() {
    return this.recallForm.get('phone');
  }

  get recallFormFullName() {
    return this.recallForm.get('fullName');
  }

  get recallFormMessage() {
    return this.recallForm.get('message');
  }

  get existingFormPhone() {
    return this.existingForm.get('phone');
  }

  get existingFormFullName() {
    return this.existingForm.get('fullName');
  }

  get existingFormEmail() {
    return this.existingForm.get('email');
  }

  get buyInClickFormPhone() {
    return this.buyInClickForm.get('phone');
  }

  get buyInClickFormFullName() {
    return this.buyInClickForm.get('fullName');
  }

  get buyInClickFormEmail() {
    return this.buyInClickForm.get('email');
  }

  get buyInClickFormMessage() {
    return this.buyInClickForm.get('message');
  }
}
