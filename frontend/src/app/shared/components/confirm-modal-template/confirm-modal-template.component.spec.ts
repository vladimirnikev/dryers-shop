import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmModalTemplateComponent } from './confirm-modal-template.component';

describe('ConfirmModalTemplateComponent', () => {
  let component: ConfirmModalTemplateComponent;
  let fixture: ComponentFixture<ConfirmModalTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmModalTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmModalTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
