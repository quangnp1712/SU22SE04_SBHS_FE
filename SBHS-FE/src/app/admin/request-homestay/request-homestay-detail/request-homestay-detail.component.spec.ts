import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestHomestayDetailComponent } from './request-homestay-detail.component';

describe('RequestHomestayDetailComponent', () => {
  let component: RequestHomestayDetailComponent;
  let fixture: ComponentFixture<RequestHomestayDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestHomestayDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestHomestayDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
