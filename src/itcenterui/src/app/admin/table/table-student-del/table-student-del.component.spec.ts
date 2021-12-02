import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableStudentDelComponent } from './table-student-del.component';

describe('TableStudentDelComponent', () => {
  let component: TableStudentDelComponent;
  let fixture: ComponentFixture<TableStudentDelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableStudentDelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableStudentDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
