import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardInventoryComponent } from './admin-dashboard-inventory.component';

describe('AdminDashboardInventoryComponent', () => {
  let component: AdminDashboardInventoryComponent;
  let fixture: ComponentFixture<AdminDashboardInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDashboardInventoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashboardInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
