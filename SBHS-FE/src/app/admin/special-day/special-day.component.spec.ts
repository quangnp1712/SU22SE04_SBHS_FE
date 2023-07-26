import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialDayComponent } from './special-day.component';

describe('SpecialDayComponent', () => {
  let component: SpecialDayComponent;
  let fixture: ComponentFixture<SpecialDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialDayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
