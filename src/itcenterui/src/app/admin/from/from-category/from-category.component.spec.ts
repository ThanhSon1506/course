import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromCategoryComponent } from './from-category.component';

describe('FromCategoryComponent', () => {
  let component: FromCategoryComponent;
  let fixture: ComponentFixture<FromCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FromCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
