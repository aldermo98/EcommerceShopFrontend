import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { Product } from 'src/app/models/product.model';
import { CustomerService } from 'src/app/services/customer.service';
import { ProductService } from 'src/app/services/product.service';
import { VendorService } from 'src/app/services/vendor.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  


    

  name: string;
  customer: Customer;
  product: Product[];
  page : number; 
  size : number; 
  subscriptions : Subscription[];
  role: string;

  alertMessage : string;

  constructor(private customerService: CustomerService, 
              private productService: ProductService,
              private vendorService: VendorService) { }

  ngOnInit(): void {
    this.role = localStorage.getItem("role");
    this.subscriptions = [];
    this.size = 5;
    localStorage.getItem("role");
    this.subscriptions.push(
      this.productService.page$.subscribe(value => {
        this.page = value;
        this.productService.getAllProducts(this.page, this.size)
          .subscribe({
            next: (data) => {
              this.product = data;
              this.productService.product$.next(this.product);
              // check if the products is being called or not
              console.log(data);
            },
            error: (e) => {
              //redirect to error page
            }
          });
      })
    );

  }
  
}
  
  


