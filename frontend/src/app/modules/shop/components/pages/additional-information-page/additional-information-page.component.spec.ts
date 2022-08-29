import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalInformationPageComponent } from './additional-information-page.component';

describe('AdditionalInformationPageComponent', () => {
  let component: AdditionalInformationPageComponent;
  let fixture: ComponentFixture<AdditionalInformationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdditionalInformationPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalInformationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
