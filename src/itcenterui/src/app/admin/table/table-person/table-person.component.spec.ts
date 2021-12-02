import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePersonComponent } from './table-person.component';

describe('TablePersonComponent', () => {
  let component: TablePersonComponent;
  let fixture: ComponentFixture<TablePersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablePersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
