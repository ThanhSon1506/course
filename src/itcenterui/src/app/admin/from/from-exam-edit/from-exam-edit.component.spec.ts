import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromExamEditComponent } from './from-exam-edit.component';

describe('FromExamEditComponent', () => {
  let component: FromExamEditComponent;
  let fixture: ComponentFixture<FromExamEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromExamEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FromExamEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
