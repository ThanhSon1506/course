import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromLanguageComponent } from './from-language.component';

describe('FromLanguageComponent', () => {
  let component: FromLanguageComponent;
  let fixture: ComponentFixture<FromLanguageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromLanguageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FromLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
