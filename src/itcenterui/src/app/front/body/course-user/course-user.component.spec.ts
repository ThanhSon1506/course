import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseUserComponent } from './course-user.component';

describe('CourseUserComponent', () => {
  let component: CourseUserComponent;
  let fixture: ComponentFixture<CourseUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
