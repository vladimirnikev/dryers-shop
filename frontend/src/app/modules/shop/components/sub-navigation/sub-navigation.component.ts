import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as cartSelectors from 'src/app/store/cart/cart.selectors';
import { MobileService } from '../../services/mobile.service';

@Component({
  selector: 'app-sub-navigation',
  templateUrl: './sub-navigation.component.html',
  styleUrls: ['./sub-navigation.component.scss'],
})
export class SubNavigationComponent {
  @Input() isNav = false;

  @Input() isOpened: boolean;

  @Output() closeSubMenuEvent = new EventEmitter();

  @Output() closeSearchBarEvent = new EventEmitter();

  isMobile$: Observable<boolean>;

  cartProductsCount$: Observable<number>;

  constructor(private mobileService: MobileService, private store: Store) {
    this.isMobile$ = mobileService.isMobile$;
    this.cartProductsCount$ = this.store.select(cartSelectors.selectCartProductsCount);
  }

  closeSubMenu() {
    this.closeSubMenuEvent.emit(true);
  }

  closeSearchBar(event) {
    this.closeSearchBarEvent.emit(event);
  }
}
