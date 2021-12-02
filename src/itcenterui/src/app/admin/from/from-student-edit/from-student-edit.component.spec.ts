import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromStudentEditComponent } from './from-student-edit.component';

describe('FromStudentEditComponent', () => {
  let component: FromStudentEditComponent;
  let fixture: ComponentFixture<FromStudentEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromStudentEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FromStudentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
