import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromLevelEditComponent } from './from-level-edit.component';

describe('FromLevelEditComponent', () => {
  let component: FromLevelEditComponent;
  let fixture: ComponentFixture<FromLevelEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromLevelEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FromLevelEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
