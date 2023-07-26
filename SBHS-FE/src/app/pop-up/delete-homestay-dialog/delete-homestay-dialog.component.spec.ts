import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteHomestayDialogComponent } from './delete-homestay-dialog.component';

describe('DeleteHomestayDialogComponent', () => {
  let component: DeleteHomestayDialogComponent;
  let fixture: ComponentFixture<DeleteHomestayDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteHomestayDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteHomestayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
