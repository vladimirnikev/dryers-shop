import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketBarCardComponent } from './basket-bar-card.component';

describe('BasketBarCardComponent', () => {
  let component: BasketBarCardComponent;
  let fixture: ComponentFixture<BasketBarCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasketBarCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketBarCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
