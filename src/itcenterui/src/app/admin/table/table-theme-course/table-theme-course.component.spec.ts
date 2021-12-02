import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableThemeCourseComponent } from './table-theme-course.component';

describe('TableThemeCourseComponent', () => {
  let component: TableThemeCourseComponent;
  let fixture: ComponentFixture<TableThemeCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableThemeCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableThemeCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
