import { NavigationEnd, Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { filter } from 'rxjs/operators';
import * as cartSelectors from 'src/app/store/cart/cart.selectors';
import * as cartActions from 'src/app/store/cart/cart.actions';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ModalService } from '../../services/modal.service';
import { MobileService } from '../../services/mobile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('collapse', [
      state(
        'false',
        style({
          maxHeight: window.innerWidth <= 768 ? '1000px' : '200px',
        }),
      ),
      state(
        'true',
        style({
          maxHeight: '0',
        }),
      ),
      transition('false => true', animate('50ms ease-in')),
      transition('true => false', animate('300ms ease-out')),
    ]),
    trigger('collapseBasketCard', [
      state(
        'false',
        style({
          maxHeight: '400px',
        }),
      ),
      state(
        'true',
        style({
          maxHeight: '0',
        }),
      ),
      transition('false => true', animate('50ms ease-in')),
      transition('true => false', animate('300ms ease-out')),
    ]),
  ],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('burgerButton') burgerButton: ElementRef;

  @ViewChild('nav') nav: ElementRef;

  sub = new Subscription();

  isCollapsed = true;

  isCollapsedSearchBar = true;

  isCollapsedBasketCard = true;

  cartProductsCount$: Observable<number>;

  isMobile$: Observable<boolean>;

  constructor(
    private modalService: ModalService,
    private route: Router,
    private store: Store,
    private mobileService: MobileService,
  ) {
    this.cartProductsCount$ = this.store.select(cartSelectors.selectCartProductsCount);
    this.isMobile$ = mobileService.isMobile$;
  }

  ngOnInit(): void {
    this.sub.add(
      this.route.events
        .pipe(filter((e) => e instanceof NavigationEnd))
        .subscribe(() => this.closeSubMenu()),
    );

    this.store.dispatch(cartActions.getCart());
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  toggleCollapse() {
    if (!this.isCollapsedSearchBar || !this.isCollapsedBasketCard) {
      this.isCollapsedSearchBar = true;
      this.isCollapsedBasketCard = true;
    }
    const isOpened = this.burgerButton.nativeElement.classList.contains('is-active');
    this.isCollapsed = !this.isCollapsed;
    if (isOpened) {
      this.burgerButton.nativeElement.classList.remove('is-active');
      return;
    }
    this.burgerButton.nativeElement.classList.add('is-active');
  }

  toggleCollapseSearchBar() {
    if (!this.isCollapsed || !this.isCollapsedBasketCard) {
      this.isCollapsedBasketCard = true;
      this.isCollapsed = true;
      this.burgerButton.nativeElement.classList.remove('is-active');
    }
    this.isCollapsedSearchBar = !this.isCollapsedSearchBar;
  }

  toggleCollapseBasketCard() {
    if (!this.isCollapsed || !this.isCollapsedSearchBar) {
      this.isCollapsedSearchBar = true;
      this.isCollapsed = true;
      this.burgerButton.nativeElement.classList.remove('is-active');
    }
    this.isCollapsedBasketCard = !this.isCollapsedBasketCard;
  }

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement) {
    const clickedInside = this.nav.nativeElement.contains(targetElement);
    if (!clickedInside) {
      if (!this.isCollapsed || !this.isCollapsedSearchBar || !this.isCollapsedBasketCard) {
        this.closeSubMenu();
      }
    }
  }

  openRecallForm() {
    this.modalService.openRecallModal();
  }

  closeSubMenu() {
    this.isCollapsed = true;
    this.isCollapsedBasketCard = true;
    this.isCollapsedSearchBar = true;
    this.burgerButton.nativeElement.classList.remove('is-active');
  }
}
