import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromPositionComponent } from './from-position.component';

describe('FromPositionComponent', () => {
  let component: FromPositionComponent;
  let fixture: ComponentFixture<FromPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromPositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FromPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
