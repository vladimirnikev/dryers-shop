import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { EModalType } from 'src/app/common/enums/modalType.enum';

@Injectable()
export class ModalService {
  private display: BehaviorSubject<'open' | 'close'> = new BehaviorSubject('close');

  private modalType: Subject<EModalType> = new Subject();

  openRecallModal() {
    this.display.next('open');
    this.modalType.next(EModalType.RECALL);
  }

  openIsExistingModal() {
    this.display.next('open');
    this.modalType.next(EModalType.EXISTING);
  }

  openBuyInClickModal() {
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
}
