import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardCustomersComponent } from './admin-dashboard-customers.component';

describe('AdminDashboardCustomersComponent', () => {
  let component: AdminDashboardCustomersComponent;
  let fixture: ComponentFixture<AdminDashboardCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDashboardCustomersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashboardCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
