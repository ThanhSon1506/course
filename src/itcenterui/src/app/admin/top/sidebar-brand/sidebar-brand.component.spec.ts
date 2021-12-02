import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarBrandComponent } from './sidebar-brand.component';

describe('SidebarBrandComponent', () => {
  let component: SidebarBrandComponent;
  let fixture: ComponentFixture<SidebarBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarBrandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
