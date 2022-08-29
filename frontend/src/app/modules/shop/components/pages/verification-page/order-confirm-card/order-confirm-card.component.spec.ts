import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderConfirmCardComponent } from './order-confirm-card.component';

describe('OrderConfirmCardComponent', () => {
  let component: OrderConfirmCardComponent;
  let fixture: ComponentFixture<OrderConfirmCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderConfirmCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderConfirmCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
