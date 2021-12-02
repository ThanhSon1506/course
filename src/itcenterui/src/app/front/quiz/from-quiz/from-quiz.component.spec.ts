import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromQuizComponent } from './from-quiz.component';

describe('FromQuizComponent', () => {
  let component: FromQuizComponent;
  let fixture: ComponentFixture<FromQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FromQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
