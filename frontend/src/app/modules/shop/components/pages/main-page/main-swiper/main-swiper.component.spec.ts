import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSwiperComponent } from './main-swiper.component';

describe('MainSwiperComponent', () => {
  let component: MainSwiperComponent;
  let fixture: ComponentFixture<MainSwiperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainSwiperComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
