import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Checkout } from '../Models/checkout';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  apiUrl = environment.apiUrl;
  token: any;

  constructor(public http: HttpClient, private appService: AppService) { }

  postCheckout(formDat: any): Observable<Checkout> {
  	var form = new FormData();
    form.append('order_id', formDat.order_id);
    form.append('shipping_addr', formDat.shipping_addr);
    
    this.token = this.appService.getToken();
    
    return this.http.post<Checkout>(`${this.apiUrl}checkout/`, form,
      { headers: { Authorization: this.token } } );
  }
}
