import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherCourseClassComponent } from './teacher-course-class.component';

describe('TeacherCourseClassComponent', () => {
  let component: TeacherCourseClassComponent;
  let fixture: ComponentFixture<TeacherCourseClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherCourseClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherCourseClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
