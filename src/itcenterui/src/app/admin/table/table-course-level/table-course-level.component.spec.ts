import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCourseLevelComponent } from './table-course-level.component';

describe('TableCourseLevelComponent', () => {
  let component: TableCourseLevelComponent;
  let fixture: ComponentFixture<TableCourseLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableCourseLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCourseLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
