import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromExamComponent } from './from-exam.component';

describe('FromExamComponent', () => {
  let component: FromExamComponent;
  let fixture: ComponentFixture<FromExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromExamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FromExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
