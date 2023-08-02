import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '../models/product.model';
import { FormGroup } from '@angular/forms';
import { Orders } from '../models/orders.model';
import { Vendor } from '../models/vendor.model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

const httpOptions = {
  headers: 
    new HttpHeaders({
      'Content-Type': 'application/json',
    }),
};

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  getAllVendorsApi : string;
  vendor$ = new BehaviorSubject<Vendor[]>([]);

  constructor(private http: HttpClient) { 
    this.getAllVendorsApi = environment.serverUrl + '/vendor/all';
  }

  updateVendor(vendor:Vendor):Observable<void>{
    return this.http.put<void>(`${environment.serverUrl}/vendor/${vendor.id}`, vendor, httpOptions);
  }

  getAllVendors(): Observable<Vendor[]>{
    return this.http.get<Vendor[]>(this.getAllVendorsApi);
  }

  getVendorById(vendorId:number):Observable<Vendor>{
    return this.http.get<Vendor>(`${environment.serverUrl}/vendor/${vendorId}`);
  }

  getInventory(vendorId:number, filterBy?:string, queryParam?:string): Observable<Product[]>{
    let url:string = (filterBy != undefined && queryParam != undefined) ? `${environment.serverUrl}/vendor/${vendorId}/inventory?filterBy=${filterBy}&queryParam=${queryParam}`
      : `${environment.serverUrl}/vendor/${vendorId}/inventory`;
    return this.http.get<Product[]>(url);
  }

  getOrderHistory(vendorId:number): Observable<Orders[]>{
    return this.http.get<Orders[]>(`${environment.serverUrl}/orders/vendor/${vendorId}`);
  }

  addProduct(product:Product): Observable<Product>{

    return this.http.post<Product>(`${environment.serverUrl}/product/${product.category.id == undefined ? -1 : product.category.id}/${product.vendorId}`, product, httpOptions);
  }

  editProduct(product:Product): Observable<Product>{
    return this.http.put<Product>(`${environment.serverUrl}/products/${product.id}`, product, httpOptions);
  }

  deleteProduct(productId:number): Observable<Product>{
    return this.http.delete<Product>(`${environment.serverUrl}/products/${productId}`);
  }
}
