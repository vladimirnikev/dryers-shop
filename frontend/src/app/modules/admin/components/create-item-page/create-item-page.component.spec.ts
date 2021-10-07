import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateItemPageComponent } from './create-item-page.component';

describe('CreateItemPageComponent', () => {
  let component: CreateItemPageComponent;
  let fixture: ComponentFixture<CreateItemPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateItemPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateItemPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
