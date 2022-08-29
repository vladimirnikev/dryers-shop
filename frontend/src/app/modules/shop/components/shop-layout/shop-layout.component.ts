import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-shop-layout',
  templateUrl: './shop-layout.component.html',
  styleUrls: ['./shop-layout.component.scss'],
})
export class ShopLayoutComponent implements OnDestroy {
  sub = new Subscription();

  constructor(
    private modalService: ModalService,
    private store: Store,
    private cookieService: CookieService,
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  openRecallModal() {
    this.modalService.openRecallModal();
  }
}
