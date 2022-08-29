import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateColorModalComponent } from './update-color-modal.component';

describe('UpdateColorModalComponent', () => {
  let component: UpdateColorModalComponent;
  let fixture: ComponentFixture<UpdateColorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateColorModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateColorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
