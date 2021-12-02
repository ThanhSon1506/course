import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCheckedComponent } from './dialog-checked.component';

describe('DialogCheckedComponent', () => {
  let component: DialogCheckedComponent;
  let fixture: ComponentFixture<DialogCheckedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCheckedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCheckedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
