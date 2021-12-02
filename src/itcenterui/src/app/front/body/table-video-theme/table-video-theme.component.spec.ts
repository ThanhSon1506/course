import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableVideoThemeComponent } from './table-video-theme.component';

describe('TableVideoThemeComponent', () => {
  let component: TableVideoThemeComponent;
  let fixture: ComponentFixture<TableVideoThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableVideoThemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableVideoThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
