import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromPositionEditComponent } from './from-position-edit.component';

describe('FromPositionEditComponent', () => {
  let component: FromPositionEditComponent;
  let fixture: ComponentFixture<FromPositionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromPositionEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FromPositionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
