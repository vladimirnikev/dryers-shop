import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { EModalType } from 'src/app/common/enums/modalType.enum';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  display$: Observable<'open' | 'close'>;

  modalType$: Observable<EModalType>;

  recallForm: FormGroup;

  existingForm: FormGroup;

  buyInClickForm: FormGroup;

  isInvalidRecallForm: boolean;

  isInvalidExistingForm: boolean;

  isInvalidBuyInClickForm: boolean;

  constructor(private modalService: ModalService, fb: FormBuilder) {
    this.recallForm = fb.group({
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?:\+38)?(?:\(0[0-9][0-9]\)[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|0[0-9][0-9][ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|0[0-9][0-9][0-9]{7})$/gm,
          ),
        ],
      ],
      fullName: ['', [Validators.required]],
      message: [''],
    });

    this.existingForm = fb.group({
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?:\+38)?(?:\(0[0-9][0-9]\)[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|0[0-9][0-9][ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|0[0-9][0-9][0-9]{7})$/gm,
          ),
        ],
      ],
      fullName: ['', [Validators.required]],
      email: ['', [Validators.email]],
    });

    this.buyInClickForm = fb.group({
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?:\+38)?(?:\(0[0-9][0-9]\)[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|0[0-9][0-9][ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|0[0-9][0-9][0-9]{7})$/gm,
          ),
        ],
      ],
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
    this.modalService.close();
  }

  sendRecallForm() {
    if (this.recallForm.invalid) {
      this.isInvalidRecallForm = true;
      return;
    }

    console.log(this.recallForm.value);
    this.isInvalidRecallForm = false;
    this.recallForm.reset();
    this.close();
  }

  sendExistingForm() {
    if (this.existingForm.invalid) {
      this.isInvalidExistingForm = true;
      return;
    }

    console.log(this.existingForm.value);
    this.isInvalidExistingForm = false;
    this.existingForm.reset();
    this.close();
  }

  sendBuyInClickForm() {
    if (this.buyInClickForm.invalid) {
      this.isInvalidBuyInClickForm = true;
      return;
    }

    console.log(this.buyInClickForm.value);
    this.isInvalidBuyInClickForm = false;
    this.buyInClickForm.reset();
    this.close();
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
