import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromAccountStudentComponent } from './from-account-student.component';

describe('FromAccountStudentComponent', () => {
  let component: FromAccountStudentComponent;
  let fixture: ComponentFixture<FromAccountStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromAccountStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FromAccountStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
