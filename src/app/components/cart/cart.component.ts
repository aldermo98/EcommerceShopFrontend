import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CustomerCart } from 'src/app/models/customerCart.model';
import { Product } from 'src/app/models/product.model';
import { CustomerCartService } from 'src/app/services/customer-cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  customerCart: CustomerCart[] = [];
  customer: Customer;
  products: Product[];
  price: number;
  message: string;
  role: string;
  totalPrice: number;

  constructor(
    private customerCartService: CustomerCartService,
    private orderService:OrderService
  ) { }

  ngOnInit(): void {
    this.message = '';
    this.totalPrice = 0;
    this.role = localStorage.getItem("role");

    this.customerCartService.getCart().subscribe({
      next: (data) => {
        for (var value of data){
          if (value.customer.id == +localStorage.getItem("id")){
            this.customerCart.push(value);
            this.totalPrice += value.totalPrice;
          }
        }       
      },
      error: (e) => { console.log('couldnt load cart') }
    });
  }

  onDeleteProduct(pid: number) {
    this.customerCartService.deleteProduct(pid).subscribe({
      next: (data) => {
        this.message = 'Product deleted.';
      },
      error: (e) => {console.log("could not delete product")}
    });
  }

  checkout():void{
    let tempCart = this.customerCart;
    let order;
    tempCart.forEach(o=>{
      order = {
        customer: o.customer,
        product: o.product,
        quantity: o.quantity
      }
      this.orderService.addOrder(order).subscribe({
        next: (data)=>{
          this.customerCartService.customerCart$.next([]);
          this.customerCartService.deleteProduct(o.product.id).subscribe({});
        },
        error: (data)=>{
          console.log(data);
        }
      })
    })
  }

}
