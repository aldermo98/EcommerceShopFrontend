import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Vendor } from 'src/app/models/vendor.model';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'app-admin-dashboard-vendors',
  templateUrl: './admin-dashboard-vendors.component.html',
  styleUrls: ['./admin-dashboard-vendors.component.css']
})
export class AdminDashboardVendorsComponent implements OnInit {

  vendor: Vendor[];
  subscriptions: Subscription[];
  
  constructor(private vendorService: VendorService) { }

  ngOnInit(): void {
    this.vendorService.vendor$.subscribe(data=>{
      this.vendorService.getAllVendors().subscribe(data=>{
        this.vendor = data;
        console.log(data);
      })
    })
  }

}
