import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherCourseFalseComponent } from './teacher-course-false.component';

describe('TeacherCourseFalseComponent', () => {
  let component: TeacherCourseFalseComponent;
  let fixture: ComponentFixture<TeacherCourseFalseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherCourseFalseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherCourseFalseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
