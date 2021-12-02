import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromTeacherEditComponent } from './from-teacher-edit.component';

describe('FromTeacherEditComponent', () => {
  let component: FromTeacherEditComponent;
  let fixture: ComponentFixture<FromTeacherEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromTeacherEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FromTeacherEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
