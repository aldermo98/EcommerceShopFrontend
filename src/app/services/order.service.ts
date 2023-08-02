import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Orders } from '../models/orders.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl:string
  constructor(private http: HttpClient) { }

  addOrder(order: Orders):Observable<Orders>{
    this.apiUrl = `${environment.serverUrl}/orders`;
    return this.http.post<Orders>(this.apiUrl, order);
  }
}
