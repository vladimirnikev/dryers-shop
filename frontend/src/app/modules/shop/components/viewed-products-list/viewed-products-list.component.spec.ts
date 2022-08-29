import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewedProductsListComponent } from './viewed-products-list.component';

describe('ViewedProductsListComponent', () => {
  let component: ViewedProductsListComponent;
  let fixture: ComponentFixture<ViewedProductsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewedProductsListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewedProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
