import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePositionComponent } from './table-position.component';

describe('TablePositionComponent', () => {
  let component: TablePositionComponent;
  let fixture: ComponentFixture<TablePositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablePositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
