import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCourseCategoryComponent } from './table-course-category.component';

describe('TableCourseCategoryComponent', () => {
  let component: TableCourseCategoryComponent;
  let fixture: ComponentFixture<TableCourseCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableCourseCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCourseCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
