import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardVendorsComponent } from './admin-dashboard-vendors.component';

describe('AdminDashboardVendorsComponent', () => {
  let component: AdminDashboardVendorsComponent;
  let fixture: ComponentFixture<AdminDashboardVendorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDashboardVendorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashboardVendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
