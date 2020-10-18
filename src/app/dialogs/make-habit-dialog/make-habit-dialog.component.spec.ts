import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeHabitDialogComponent } from './make-habit-dialog.component';

describe('MakeHabitDialogComponent', () => {
  let component: MakeHabitDialogComponent;
  let fixture: ComponentFixture<MakeHabitDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeHabitDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeHabitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
