import { ModalService } from 'src/app/modules/shop/services/modal.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { HelperService } from 'src/app/shared/services/helper.service';
import * as cartSelectors from 'src/app/store/cart/cart.selectors';
import * as cartActions from 'src/app/store/cart/cart.actions';
import { IOrderFormData } from 'src/app/common/interfaces/order-form-data.interface';
import { Actions, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification-page',
  templateUrl: './verification-page.component.html',
  styleUrls: ['./verification-page.component.scss'],
})
export class VerificationPageComponent implements OnInit, OnDestroy {
  sub = new Subscription();

  orderForm: FormGroup;

  isTriedSubmit = false;

  isLoading$: Observable<boolean>;

  constructor(
    private helperService: HelperService,
    private store: Store,
    private storeActions$: Actions,
    private modalService: ModalService,
    private router: Router,
  ) {
    this.isLoading$ = this.store.select(cartSelectors.selectIsLoading);
  }

  ngOnInit(): void {
    this.sub.add(
      this.storeActions$.pipe(ofType(cartActions.makeOrderSuccess)).subscribe(() => {
        this.modalService.openSuccessOrderModal();
        this.router.navigate(['']);
      }),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  setFormData(event) {
    this.orderForm = event;
  }

  makeOrder() {
    if (this.orderForm.invalid) {
      this.isTriedSubmit = true;
      return;
    }

    const data: IOrderFormData = this.helperService.removeEmptyValuesInObject(
      this.orderForm.value,
    ) as unknown as IOrderFormData;

    this.store.dispatch(cartActions.makeOrder({ data }));
  }
}
