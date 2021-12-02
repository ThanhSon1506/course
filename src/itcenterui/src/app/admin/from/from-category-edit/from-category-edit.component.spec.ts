import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromCategoryEditComponent } from './from-category-edit.component';

describe('FromCategoryEditComponent', () => {
  let component: FromCategoryEditComponent;
  let fixture: ComponentFixture<FromCategoryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromCategoryEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FromCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
