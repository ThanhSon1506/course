import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableListStudentComponent } from './table-list-student.component';

describe('TableListStudentComponent', () => {
  let component: TableListStudentComponent;
  let fixture: ComponentFixture<TableListStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableListStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableListStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
