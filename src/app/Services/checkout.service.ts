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
    form.append('currency', formDat.currency);
    form.append('token', formDat.token);

    this.token = this.appService.getToken();
    
    return this.http.post<Checkout>(`${this.apiUrl}checkout/`, form,
      { headers: { Authorization: this.token } } );
  }

  stripePayment(formDat: any): Observable<Checkout> {
    var form = new FormData();
    
    form.append('name', formDat.name);
    form.append('addr_line1', formDat.addr1);
    form.append('addr_line2', formDat.addr2);
    form.append('city', formDat.city);
    form.append('state', formDat.state);
    form.append('country', formDat.country);
    form.append('phone', formDat.phone);
    form.append('postal_code', formDat.postal_code)
    form.append('amount', formDat.amount);
    form.append('currency', formDat.currency);
    form.append('token', formDat.token['id']);

    return this.http.post<Checkout>(`${this.apiUrl}stripe/`, form);
  }

  getCheckout(id: number): Observable<Checkout> {
    console.log(id);
    this.token = this.appService.getToken();
    return this.http.get<Checkout>(`${this.apiUrl}checkout/?order_id=${id}`,
      { headers: { Authorization: this.token } }  );
  }

}
