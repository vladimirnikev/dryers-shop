import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-order-items-list',
  templateUrl: './order-items-list.component.html',
  styleUrls: ['./order-items-list.component.scss'],
})
export class OrderItemsListComponent {
  @Input() products: any[] = [
    {
      img: 'assets/images/dryer.jpg',
      name: 'Электрополотенцесушитель Стандарт П5 450х500 LARIS',
      manufacturer: { name: 'Laris' },
      price: 1000,
      priceWithDiscount: 899,
      count: 2,
    },
    {
      img: 'assets/images/dryer.jpg',
      name: 'Электрополотенцесушитель Стандарт П5 450х500 LARIS',
      manufacturer: { name: 'Laris' },
      price: 1000,
      priceWithDiscount: 800,
      count: 2,
    },
  ];
}
