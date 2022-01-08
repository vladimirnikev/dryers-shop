import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturersListModalComponent } from './manufacturers-list-modal.component';

describe('ManufacturersListModalComponent', () => {
  let component: ManufacturersListModalComponent;
  let fixture: ComponentFixture<ManufacturersListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufacturersListModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturersListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
