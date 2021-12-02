import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromQuestionComponent } from './from-question.component';

describe('FromQuestionComponent', () => {
  let component: FromQuestionComponent;
  let fixture: ComponentFixture<FromQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FromQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
