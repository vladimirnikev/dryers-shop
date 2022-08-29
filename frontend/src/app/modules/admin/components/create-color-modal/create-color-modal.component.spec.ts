import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateColorModalComponent } from './create-color-modal.component';

describe('CreateColorModalComponent', () => {
  let component: CreateColorModalComponent;
  let fixture: ComponentFixture<CreateColorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateColorModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateColorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
