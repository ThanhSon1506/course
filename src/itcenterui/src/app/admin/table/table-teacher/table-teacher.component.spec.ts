import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTeacherComponent } from './table-teacher.component';

describe('TableTeacherComponent', () => {
  let component: TableTeacherComponent;
  let fixture: ComponentFixture<TableTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
