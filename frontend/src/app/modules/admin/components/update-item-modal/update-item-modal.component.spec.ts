import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateItemModalComponent } from './update-item-modal.component';

describe('UpdateItemModalComponent', () => {
  let component: UpdateItemModalComponent;
  let fixture: ComponentFixture<UpdateItemModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateItemModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
