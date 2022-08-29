import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStockPageComponent } from './update-stock-page.component';

describe('UpdateStockPageComponent', () => {
  let component: UpdateStockPageComponent;
  let fixture: ComponentFixture<UpdateStockPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateStockPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateStockPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
