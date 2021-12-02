import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableListStudentFalseComponent } from './table-list-student-false.component';

describe('TableListStudentFalseComponent', () => {
  let component: TableListStudentFalseComponent;
  let fixture: ComponentFixture<TableListStudentFalseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableListStudentFalseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableListStudentFalseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
