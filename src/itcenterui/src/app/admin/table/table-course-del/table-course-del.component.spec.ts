import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCourseDelComponent } from './table-course-del.component';

describe('TableCourseDelComponent', () => {
  let component: TableCourseDelComponent;
  let fixture: ComponentFixture<TableCourseDelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableCourseDelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCourseDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
