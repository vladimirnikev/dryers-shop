import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-order-confirm-card',
  templateUrl: './order-confirm-card.component.html',
  styleUrls: ['./order-confirm-card.component.scss'],
})
export class OrderConfirmCardComponent {
  @Input() sum: number;

  @Output() confirmOrderEvent = new EventEmitter();

  confirmOrder() {
    this.confirmOrderEvent.emit(true);
  }
}
