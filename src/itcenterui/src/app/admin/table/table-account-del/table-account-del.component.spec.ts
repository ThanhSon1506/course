import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAccountDelComponent } from './table-account-del.component';

describe('TableAccountDelComponent', () => {
  let component: TableAccountDelComponent;
  let fixture: ComponentFixture<TableAccountDelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableAccountDelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableAccountDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
