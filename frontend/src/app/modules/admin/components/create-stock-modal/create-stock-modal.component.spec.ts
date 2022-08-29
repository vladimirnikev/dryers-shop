import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStockModalComponent } from './create-stock-modal.component';

describe('CreateStockModalComponent', () => {
  let component: CreateStockModalComponent;
  let fixture: ComponentFixture<CreateStockModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateStockModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStockModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
