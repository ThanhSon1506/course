import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromLanguageEditComponent } from './from-language-edit.component';

describe('FromLanguageEditComponent', () => {
  let component: FromLanguageEditComponent;
  let fixture: ComponentFixture<FromLanguageEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromLanguageEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FromLanguageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
