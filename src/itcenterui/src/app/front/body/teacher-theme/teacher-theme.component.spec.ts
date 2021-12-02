import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherThemeComponent } from './teacher-theme.component';

describe('TeacherThemeComponent', () => {
  let component: TeacherThemeComponent;
  let fixture: ComponentFixture<TeacherThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherThemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
