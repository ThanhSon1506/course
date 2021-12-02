import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingFromComponent } from './loading-from.component';

describe('LoadingFromComponent', () => {
  let component: LoadingFromComponent;
  let fixture: ComponentFixture<LoadingFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingFromComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
