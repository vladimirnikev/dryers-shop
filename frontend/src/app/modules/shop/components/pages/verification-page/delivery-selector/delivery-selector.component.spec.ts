import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverySelectorComponent } from './delivery-selector.component';

describe('DeliverySelectorComponent', () => {
  let component: DeliverySelectorComponent;
  let fixture: ComponentFixture<DeliverySelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeliverySelectorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
