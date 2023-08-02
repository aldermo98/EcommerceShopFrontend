import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Orders } from 'src/app/models/orders.model';
import { OrderService } from 'src/app/services/order.service';
import { VendorService } from 'src/app/services/vendor.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  apiUrl:string;
  orders: Orders[] = [];
  constructor(
    private vendorService: VendorService,
    private orderService: OrderService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    //get inventory
    this.vendorService.getOrderHistory(parseInt(localStorage.getItem("id")!)).subscribe((orders) => {
      this.orders = orders;
    });

  }

}
