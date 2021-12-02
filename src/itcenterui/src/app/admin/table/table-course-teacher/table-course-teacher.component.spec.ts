import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCourseTeacherComponent } from './table-course-teacher.component';

describe('TableCourseTeacherComponent', () => {
  let component: TableCourseTeacherComponent;
  let fixture: ComponentFixture<TableCourseTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableCourseTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCourseTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
