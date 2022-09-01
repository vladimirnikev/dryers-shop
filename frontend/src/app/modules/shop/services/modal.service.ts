import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { EModalType } from 'src/app/common/enums/modalType.enum';

@Injectable()
export class ModalService {
  private display: BehaviorSubject<'open' | 'close'> = new BehaviorSubject('close');

  private modalType: Subject<EModalType> = new Subject();

  private buyInClickProductId: BehaviorSubject<number> = new BehaviorSubject(null);

  openRecallModal() {
    this.display.next('open');
    this.modalType.next(EModalType.RECALL);
  }

  openIsExistingModal() {
    this.display.next('open');
    this.modalType.next(EModalType.EXISTING);
  }

  openBuyInClickModal(productId?: number) {
    if (productId) {
      this.buyInClickProductId.next(productId);
    }
    this.display.next('open');
    this.modalType.next(EModalType.BUY_IN_CLICK);
  }

  openSuccessOrderModal() {
    this.display.next('open');
    this.modalType.next(EModalType.SUCCESS_ORDER);
  }

  close() {
    this.display.next('close');
  }

  watch(): Observable<'open' | 'close'> {
    return this.display.asObservable();
  }

  watchModalType(): Observable<EModalType> {
    return this.modalType.asObservable();
  }

  watchBuyInClickProductId(): Observable<number> {
    return this.buyInClickProductId.asObservable();
  }

  buyInClickProductIdValue(): number {
    return this.buyInClickProductId.value;
  }

  resetBuyInClickProductId() {
    this.buyInClickProductId.next(null);
  }
}
