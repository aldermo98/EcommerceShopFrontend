import { Component, Injectable, NgModule, OnInit } from '@angular/core';
import { ɵ$localize } from '@angular/localize';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { Subject, Subscription } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';


@Component({
  selector: 'app-admin-dashboard-customers',
  templateUrl: './admin-dashboard-customers.component.html',
  styleUrls: ['./admin-dashboard-customers.component.css']
})
export class AdminDashboardCustomersComponent implements OnInit {
  customer: Customer [];
  subscriptions: Subscription[];
  page : number; 
  size : number; 
  name: String;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.customer$.subscribe(data=>{
      this.customerService.getAllCustomers().subscribe(data=>{
        this.customer = data;
        console.log(data)
      })
    })
  }
  
}
  
  
 
