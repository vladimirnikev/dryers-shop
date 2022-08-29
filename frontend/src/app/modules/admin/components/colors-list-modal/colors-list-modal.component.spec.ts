import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorsListModalComponent } from './colors-list-modal.component';

describe('ColorsListModalComponent', () => {
  let component: ColorsListModalComponent;
  let fixture: ComponentFixture<ColorsListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColorsListModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorsListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
