import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCourseClassComponent } from './dialog-course-class.component';

describe('DialogCourseClassComponent', () => {
  let component: DialogCourseClassComponent;
  let fixture: ComponentFixture<DialogCourseClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCourseClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCourseClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
