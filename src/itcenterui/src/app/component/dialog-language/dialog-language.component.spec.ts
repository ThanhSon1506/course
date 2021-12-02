import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLanguageComponent } from './dialog-language.component';

describe('DialogLanguageComponent', () => {
  let component: DialogLanguageComponent;
  let fixture: ComponentFixture<DialogLanguageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogLanguageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
