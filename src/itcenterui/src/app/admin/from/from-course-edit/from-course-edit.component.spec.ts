import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromCourseEditComponent } from './from-course-edit.component';

describe('FromCourseEditComponent', () => {
  let component: FromCourseEditComponent;
  let fixture: ComponentFixture<FromCourseEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromCourseEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FromCourseEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
