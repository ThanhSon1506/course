import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCourseFalseComponent } from './table-course-false.component';

describe('TableCourseFalseComponent', () => {
  let component: TableCourseFalseComponent;
  let fixture: ComponentFixture<TableCourseFalseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableCourseFalseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCourseFalseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
