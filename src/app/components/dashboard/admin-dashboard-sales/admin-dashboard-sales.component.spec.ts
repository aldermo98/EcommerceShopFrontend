import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardSalesComponent } from './admin-dashboard-sales.component';

describe('AdminDashboardSalesComponent', () => {
  let component: AdminDashboardSalesComponent;
  let fixture: ComponentFixture<AdminDashboardSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDashboardSalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashboardSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
