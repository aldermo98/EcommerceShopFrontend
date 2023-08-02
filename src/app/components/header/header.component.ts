import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CustomerCart } from 'src/app/models/customerCart.model';
import { CustomerCartService } from 'src/app/services/customer-cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string;
  role: string;
  categories:Category[] = [];
  cart:CustomerCart[] = [];
  cartTotal:number;
  constructor(
    private cartService:CustomerCartService,
    private authService: AuthService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.role='';
    this.authService.username$.subscribe(data=>{
      this.username = data;
      console.log(this.username);
    })
    this.role = localStorage.getItem("role");
    this.cartService.getCart().subscribe({
      next: (data)=>{
        this.cartService.customerCart$.next(data);
        this.cart = this.cartService.customerCart$.getValue();
        this.cartTotal = 0.0;
        this.cart.forEach(c=>{
          this.cartTotal += c.totalPrice;
        })
      },
      error: (data)=>{
        console.log(data);
      }
    })
    this.cartService.customerCart$.subscribe({
      next: (data)=>{
        this.cart = data;
        this.cartTotal = 0.0;
        this.cart.forEach(c => {
          this.cartTotal += c.totalPrice;
        })
      }
    });
  }

  removeItem(pid:number):void{
    this.cartService.deleteProduct(pid).subscribe({
      next: (data)=>{
        this.cart = this.cart.filter(c => c.id != data.id);
        this.cartService.customerCart$.next(this.cart);
      },
      error: (data)=>{
        console.log(data);
      }
    });
  }

  checkout():void{
    let tempCart = this.cart;
    let order;
    tempCart.forEach(o=>{
      order = {
        customer: o.customer,
        product: o.product,
        quantity: o.quantity
      }
      this.orderService.addOrder(order).subscribe({
        next: (data)=>{
          this.cartService.customerCart$.next([]);
          this.cartService.deleteProduct(o.product.id).subscribe({});
        },
        error: (data)=>{
          console.log(data);
        }
      })
    })
    
  } 

}
