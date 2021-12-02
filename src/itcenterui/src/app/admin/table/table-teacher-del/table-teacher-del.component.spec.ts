import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTeacherDelComponent } from './table-teacher-del.component';

describe('TableTeacherDelComponent', () => {
  let component: TableTeacherDelComponent;
  let fixture: ComponentFixture<TableTeacherDelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableTeacherDelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTeacherDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
