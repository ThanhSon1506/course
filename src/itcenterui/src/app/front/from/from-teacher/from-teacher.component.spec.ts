import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromTeacherComponent } from './from-teacher.component';

describe('FromTeacherComponent', () => {
  let component: FromTeacherComponent;
  let fixture: ComponentFixture<FromTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FromTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
