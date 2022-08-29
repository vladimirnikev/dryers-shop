import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateManufacturerModalComponent } from './update-manufacturer-modal.component';

describe('UpdateManufacturerModalComponent', () => {
  let component: UpdateManufacturerModalComponent;
  let fixture: ComponentFixture<UpdateManufacturerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateManufacturerModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateManufacturerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
