import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromThemeEditComponent } from './from-theme-edit.component';

describe('FromThemeEditComponent', () => {
  let component: FromThemeEditComponent;
  let fixture: ComponentFixture<FromThemeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromThemeEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FromThemeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
