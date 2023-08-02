import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { CustomerCartService } from 'src/app/services/customer-cart.service';
import { CustomerCart } from 'src/app/models/customerCart.model';
import { Customer } from 'src/app/models/customer.model';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit, OnDestroy {


  product: Product[];
  page: number;
  size: number;
  subscriptions: Subscription[];
  customerCart:CustomerCart[];
  singleProduct: Product[];


  constructor(private productService: ProductService,
    private cartService: CustomerCartService,
  ) {

  }

  ngOnInit(): void {
    this.productService.product$.next(null);
    this.subscriptions = [];
    this.size = 6;
    this.subscriptions.push(
      this.productService.page$.subscribe(value => {
        this.page = value;
        this.productService.getAllProducts(this.page, this.size)
          .subscribe({
            next: (data) => {
              this.product = data;
              this.productService.product$.next(this.product);
              // check if the products is being called or not
              //console.log(data);
            },
            error: (e) => {
              //redirect to error page
            }
          });
      })
    );
  }
  getSingle(id: number){
    this.singleProduct =[]
    
      this.productService.getSingleProduct(id).subscribe(data=>{
        
        this.productService.singleProduct$.next(data);
      
        console.log(this.productService.product$.value);
      })

  }
  

  sortPrice(flag: number): void {
    this.productService.sortPrice(this.product, flag);
  }
  sortDefault(flag: number): void {
    this.productService.sortDefault(this.product, flag);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  addToCart(pid:number): void {
    this.cartService.addToCart(pid).subscribe({ 
      next: (data)=>{
        let cartItems:CustomerCart[] = this.cartService.customerCart$.getValue().filter(c => c.id != data.id);
        cartItems.push(data);
        console.log(cartItems)
        this.cartService.customerCart$.next(cartItems);
      },
      error: (data)=>{
        console.log(data);
      }
    });
  }
  prev() {
    //read the value of page from subject

    let page = this.productService.page$.getValue();
    //update the value of page
    if (page > 0) {
      this.page = page - 1;
      //attach the updated value to the subject
      this.productService.page$.next(this.page);
    }
  }

  next() {
    //read the value of page from subject
    let page = this.productService.page$.getValue();
    //update the value of page
    this.page = page + 1;
    //attach the updated value to the subject
    this.productService.page$.next(this.page);
  }
}
