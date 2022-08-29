import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingProductsToStockModalComponent } from './adding-products-to-stock-modal.component';

describe('AddingProductsToStockModalComponent', () => {
  let component: AddingProductsToStockModalComponent;
  let fixture: ComponentFixture<AddingProductsToStockModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddingProductsToStockModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddingProductsToStockModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
