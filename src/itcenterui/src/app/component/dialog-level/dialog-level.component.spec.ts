import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLevelComponent } from './dialog-level.component';

describe('DialogLevelComponent', () => {
  let component: DialogLevelComponent;
  let fixture: ComponentFixture<DialogLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
