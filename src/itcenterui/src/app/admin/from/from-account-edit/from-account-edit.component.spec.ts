import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromAccountEditComponent } from './from-account-edit.component';

describe('FromAccountEditComponent', () => {
  let component: FromAccountEditComponent;
  let fixture: ComponentFixture<FromAccountEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromAccountEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FromAccountEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
