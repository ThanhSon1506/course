import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromLessonEditComponent } from './from-lesson-edit.component';

describe('FromLessonEditComponent', () => {
  let component: FromLessonEditComponent;
  let fixture: ComponentFixture<FromLessonEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromLessonEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FromLessonEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
