import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTeacherCourseComponent } from './main-teacher-course.component';

describe('MainTeacherCourseComponent', () => {
  let component: MainTeacherCourseComponent;
  let fixture: ComponentFixture<MainTeacherCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainTeacherCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainTeacherCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
