import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromListStudentComponent } from './from-list-student.component';

describe('FromListStudentComponent', () => {
  let component: FromListStudentComponent;
  let fixture: ComponentFixture<FromListStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromListStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FromListStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
