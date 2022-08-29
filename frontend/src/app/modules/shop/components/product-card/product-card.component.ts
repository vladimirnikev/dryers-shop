import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @ViewChild('buttonWithOwnEvent') buttonWithOwnEvent: ElementRef;

  @Input() item = { id: 1 };

  constructor(private router: Router) {}

  navigateToItem(event) {
    const isIncludeOwnActions = this.buttonWithOwnEvent.nativeElement === event.target;

    if (isIncludeOwnActions) {
      return;
    }
    this.router.navigate(['catalog', 'discounts', 'product', this.item.id]);
  }
}
