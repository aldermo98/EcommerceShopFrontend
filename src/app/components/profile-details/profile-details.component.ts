import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { VendorService } from 'src/app/services/vendor.service';
import { Vendor } from 'src/app/models/vendor.model';
import { AuthService } from 'src/app/services/auth.service';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import { NgIfContext } from '@angular/common';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {

  vendor: Vendor;
  customer: Customer;
  role: string;
  constructor(private vendorService: VendorService,
    private customerService: CustomerService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.role = localStorage.getItem("role");
    console.log(this.role) 
    if (this.role == 'vendor') {
      this.vendorService.getVendorById(+localStorage.getItem("id")!).subscribe((data) => {
        this.vendor = {
          vendorName: data.vendorName,
          password: data.password,
          balance: data.balance
        }
        $('#name').val(data.vendorName);
        $('#username').val(data.vendorName);
        $('#password').val(data.password);
        $('#balance').val(data.balance);
      })
    }
    else {
      this.customerService.getOneCustomer(+localStorage.getItem("id")).subscribe({
        next: (data) => {
          this.customer = {
            name: data.name,
            password: data.password,
            balance: data.balance
          }
          $('#name').val(data.name);
          $('#username').val(data.username);
          $('#password').val(data.password);
          $('#balance').val(data.balance);
        }
      })
    }
  }

  updateAccount(): void {
    if (this.role == "vendor") {
      this.vendor = {
        id: +localStorage.getItem("vendorId")!,
        vendorName: <string>$('#name').val(),
        password: <string>$('#password').val(),
        balance: <number>$('#balance').val()
      }
      this.vendorService.updateVendor(this.vendor).subscribe(() => { })
    }
    else {
      this.customer = {
        id: +localStorage.getItem("id")!,
        name: <string>$('#name').val(),
        password: <string>$('#password').val(),
        balance: <number>$('#balance').val()
      }
      this.customerService.updateCustomer(this.customer).subscribe({
        next: (data) => {

        }
      })
    }
  }

}
