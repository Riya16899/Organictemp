import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Cart } from '../Models/cart'; 

@Injectable({
  providedIn: 'root'
})
export class CartService {

  apiUrl = environment.apiUrl;

  constructor(public http: HttpClient) { }

  postCart(formDat: any): Observable<Cart> {
  	var form = new FormData();
    form.append('quantity', formDat.quantity);
    form.append('product_id', formDat.pro_id);
    console.log(formDat, form);

    if(localStorage.getItem('token')) {
      let bearer: string = "Bearer ";
      let token: string = localStorage.getItem('token');
      var noQuotes = token.split('"').join('');
      var mainToken: string = bearer.concat(noQuotes);
      console.log(mainToken);
    }

    console.log(mainToken);
    return this.http.post<Cart>(this.apiUrl+`cart/`, form,
      { headers: { Authorization: mainToken } } );
  }

}
