import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromThemeComponent } from './from-theme.component';

describe('FromThemeComponent', () => {
  let component: FromThemeComponent;
  let fixture: ComponentFixture<FromThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromThemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FromThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
