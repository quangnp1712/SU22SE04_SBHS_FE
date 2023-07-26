import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHomestayComponent } from './update-homestay.component';

describe('UpdateHomestayComponent', () => {
  let component: UpdateHomestayComponent;
  let fixture: ComponentFixture<UpdateHomestayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateHomestayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateHomestayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
