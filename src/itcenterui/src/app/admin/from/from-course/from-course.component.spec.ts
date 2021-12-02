import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromCourseComponent } from './from-course.component';

describe('FromCourseComponent', () => {
  let component: FromCourseComponent;
  let fixture: ComponentFixture<FromCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FromCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
