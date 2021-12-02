import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromStudentComponent } from './from-student.component';

describe('FromStudentComponent', () => {
  let component: FromStudentComponent;
  let fixture: ComponentFixture<FromStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FromStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
