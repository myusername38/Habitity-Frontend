import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameGroupDialogComponent } from './name-group-dialog.component';

describe('NameGroupDialogComponent', () => {
  let component: NameGroupDialogComponent;
  let fixture: ComponentFixture<NameGroupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NameGroupDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NameGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
