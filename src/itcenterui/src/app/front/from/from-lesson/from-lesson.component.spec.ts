import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromLessonComponent } from './from-lesson.component';

describe('FromLessonComponent', () => {
  let component: FromLessonComponent;
  let fixture: ComponentFixture<FromLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromLessonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FromLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
