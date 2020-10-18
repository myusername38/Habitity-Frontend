import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitInterfaceComponent } from './habit-interface.component';

describe('HabitInterfaceComponent', () => {
  let component: HabitInterfaceComponent;
  let fixture: ComponentFixture<HabitInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HabitInterfaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
