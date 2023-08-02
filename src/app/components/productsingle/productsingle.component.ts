import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { Subscription } from 'rxjs';
import { CustomerCart } from 'src/app/models/customerCart.model';
import { Product, SingleProduct } from 'src/app/models/product.model';
import { CustomerCartService } from 'src/app/services/customer-cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-productsingle',
  templateUrl: './productsingle.component.html',
  styleUrls: ['./productsingle.component.css']
})
export class ProductsingleComponent implements OnInit {

  product : Product;
  singleProduct: SingleProduct[];
  customerCart:CustomerCart[];
  page: number;
  size: number;
  id: number;
  

  subscriptions: Subscription[];
  
  
  constructor(private productService: ProductService, 
              private cartService: CustomerCartService) { }

  ngOnInit(): void {
        this.productService.singleProduct$.subscribe(data=>{
          this.product = data;
          console.log(this.product);
        })  
  }
  addToCart(pid:number): void {
    this.cartService.addToCart(pid).subscribe({ 
      next: (data)=>{
        let cartItems:CustomerCart[] = this.cartService.customerCart$.getValue().filter(c => c.id != data.id);
        cartItems.push(data);
        //console.log(cartItems)
        this.cartService.customerCart$.next(cartItems);
      },
      error: (data)=>{
        //console.log(data);
      }
    });
  }
    
}

