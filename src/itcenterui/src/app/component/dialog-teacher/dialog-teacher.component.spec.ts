import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTeacherComponent } from './dialog-teacher.component';

describe('DialogTeacherComponent', () => {
  let component: DialogTeacherComponent;
  let fixture: ComponentFixture<DialogTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
