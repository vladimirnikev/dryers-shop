import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockListModalComponent } from './stock-list-modal.component';

describe('StockListModalComponent', () => {
  let component: StockListModalComponent;
  let fixture: ComponentFixture<StockListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockListModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
