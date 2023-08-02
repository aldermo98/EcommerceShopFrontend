import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[];
  page: number;
  size: number;
  subscription: Subscription[];
  constructor(private productService: ProductService) { }
  

  ngOnInit(): void {
    this.subscription = [];
    this.size = 9; 
    this.subscription.push(
      this.productService.page$.subscribe(value=>{
        this.page = value;
        this.productService.getAllProducts(this.page, this.size).subscribe({
          next : (data) => {
            this.products = data;
            this.productService.product$.next(this.products);
            console.log(data);
          },
          error: (e) =>{
              //redirect to error page        
        }
        });
      })
    );
  }
  ngOnDestroy(): void {
   this.subscription.forEach(sub=>sub.unsubscribe());
  }
}
