import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTeacherCourseComponent } from './dialog-teacher-course.component';

describe('DialogTeacherCourseComponent', () => {
  let component: DialogTeacherCourseComponent;
  let fixture: ComponentFixture<DialogTeacherCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTeacherCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTeacherCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
