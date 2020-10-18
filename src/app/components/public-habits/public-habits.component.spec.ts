import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicHabitsComponent } from './public-habits.component';

describe('PublicHabitsComponent', () => {
  let component: PublicHabitsComponent;
  let fixture: ComponentFixture<PublicHabitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicHabitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicHabitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
