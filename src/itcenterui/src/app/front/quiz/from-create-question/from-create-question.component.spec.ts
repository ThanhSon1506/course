import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromCreateQuestionComponent } from './from-create-question.component';

describe('FromCreateQuestionComponent', () => {
  let component: FromCreateQuestionComponent;
  let fixture: ComponentFixture<FromCreateQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromCreateQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FromCreateQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
