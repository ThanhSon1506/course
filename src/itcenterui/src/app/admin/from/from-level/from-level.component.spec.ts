import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromLevelComponent } from './from-level.component';

describe('FromLevelComponent', () => {
  let component: FromLevelComponent;
  let fixture: ComponentFixture<FromLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FromLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
