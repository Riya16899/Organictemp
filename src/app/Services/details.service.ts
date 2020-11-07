import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { Checkout } from '../Models/checkout';
import { CardDetails } from '../Models/card-details';
import { Address } from '../Models/address';
@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  apiUrl = environment.apiUrl;
  token: any;

  constructor(public http: HttpClient, private appService: AppService) { }

  postAddress(formDat: any): Observable<Address> {

  	var form = new FormData();
    form.append('addr_line1', formDat.addr1);
    form.append('addr_line2', formDat.addr2);
    form.append('phone', formDat.phone);
    form.append('city', formDat.city);
    form.append('state', formDat.state);
    form.append('country', formDat.country);
    form.append('postal_code', formDat.postal_code);
    form.append('default_addr', formDat.defaultAddress)
    console.log(formDat);
    this.token = this.appService.getToken();
    
    return this.http.post<Address>(`${this.apiUrl}address/`, form,
      { headers: { Authorization: this.token } } );
  }

  getAddress():  Observable<Address> {
    this.token = this.appService.getToken();
    return this.http.get<Address>(`${this.apiUrl}address/`,
      { headers: { Authorization: this.token } } );
  }

  postCardDetails(formDat: any) {
    console.log(formDat);
    let sp = formDat.exdate.split("-");
  	var form = new FormData();
    form.append('card_name', formDat.name);
    form.append('card_number', formDat.cardnumber);
    form.append('card_cvc', formDat.cvv);
    form.append('card_exp_month', sp[1]);
    form.append('card_exp_year', sp[0]);
    form.append('order_id', formDat.order_id);
    form.append('default_card', formDat.defaultCard)
    console.log(form);
    this.token = this.appService.getToken();
    return this.http.post(`${this.apiUrl}card_detail/`, form,
    { headers: { Authorization: this.token } } );
  }

  changeDefAddr(id) {
    console.log(id);
    var form = new FormData();
    form.append('address_id', id);
    this.token = this.appService.getToken();
    return this.http.post(`${this.apiUrl}change_address/`, form,
    { headers: { Authorization: this.token } }  );
  }

  postCvvVerify(formDat: any) {
    this.token = this.appService.getToken();
    var form = new FormData();
    form.append('cvc',formDat.cvv);
    form.append('last4',formDat.last4);
    form.append('card_id',formDat.card_id);
    form.append('order_id', formDat.order_id);
    return this.http.post(`${this.apiUrl}cvv_verification/`, form, 
     { headers: { Authorization: this.token } } );
  }

  deleteAddress(id): Observable<Address> {
    console.log(id);
    this.token = this.appService.getToken();
    return this.http.delete<Address>(`${this.apiUrl}delete_address/${id}/`,
      { headers: { Authorization: this.token } });
  }

  deleteCard(id) {
    this.token = this.appService.getToken();
    return this.http.delete(`${this.apiUrl}delete_card/${id}/`,
      { headers: { Authorization: this.token } });
  }

}
