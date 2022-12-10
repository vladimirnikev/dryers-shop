import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-shop-layout',
  templateUrl: './shop-layout.component.html',
  styleUrls: ['./shop-layout.component.scss'],
})
export class ShopLayoutComponent {
  constructor(private modalService: ModalService) {}

  openRecallModal() {
    this.modalService.openRecallModal();
  }
}
