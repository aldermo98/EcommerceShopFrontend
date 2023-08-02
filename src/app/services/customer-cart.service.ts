import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomerCart } from '../models/customerCart.model';
import { Product } from '../models/product.model';

const httpOptions = {
  headers: 
    new HttpHeaders({
      'Content-Type': 'application/json',
    }),
};

@Injectable({
  providedIn: 'root'
})
export class CustomerCartService {
  

  customerCart$ = new BehaviorSubject<CustomerCart[]>([]);
  products$ = new BehaviorSubject<Product[]>([]);
  totalPrice$ = new BehaviorSubject<number>(0);
  getCartApi: string;
  deleteProductApi: string;
  addToCartApi: string;
  makePurchaseApi: string;
  id:number;

  constructor(private http: HttpClient) {
    this.id = +localStorage.getItem("id");
    this.getCartApi = environment.serverUrl+'/customer/cart';
    this.deleteProductApi = environment.serverUrl+'/customer/cart/delete'
    this.addToCartApi = environment.serverUrl+'/customer/cart'
    this.makePurchaseApi = environment.serverUrl+'/purchase'
  }

  getCart(): Observable<CustomerCart[]> {
    return this.http.get<CustomerCart[]>(`${this.getCartApi}/${this.id}`);
  }

  deleteProduct(pid: number): Observable<any>{
    return this.http.delete<any>(`${this.deleteProductApi}/${this.id}/${pid}`);
  }

  addToCart(pid:number):Observable<CustomerCart>{
    return this.http.post<CustomerCart>(`${this.addToCartApi}/${this.id}/${pid}`, {});
  }

  makePurchase(cart: CustomerCart[]): Observable<any> {
    return this.http.post<any>(`${this.makePurchaseApi}/${this.id}`, cart);
  }
}
