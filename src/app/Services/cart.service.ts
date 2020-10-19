import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Cart } from '../Models/cart'; 
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  apiUrl = environment.apiUrl;
  // mainToken: any;
  tt: any;

  constructor(public http: HttpClient, private appService: AppService) { }



  getCart(): Observable<Cart>{
    
    if(localStorage.getItem('token')) {
      let bearer: string = "Bearer ";
      let token: string = localStorage.getItem('token');
      var noQuotes = token.split('"').join('');
      var mainToken: string = bearer.concat(noQuotes);
    }
    this.tt = this.appService.getToken();
    return this.http.get<Cart>(this.apiUrl+`cart/`, 
      { headers: { Authorization: this.tt } } );
  }

  postCart(formDat: any): Observable<Cart> {
  	var form = new FormData();
    form.append('quantity', formDat.quantity);
    form.append('product_id', formDat.pro_id);
    console.log(formDat, form);
    if(localStorage.getItem('token')) {
      let bearer: string = "Bearer ";
      let token: string = localStorage.getItem('token');
      var noQuotes = token.split('"').join('');
      var mainToken = bearer.concat(noQuotes);
      
    }
    
    
    return this.http.post<Cart>(this.apiUrl+`cart/`, form,
      { headers: { Authorization: mainToken } } );
  }


  deleteCart(id: number) {

    if(localStorage.getItem('token')) {
      let bearer: string = "Bearer ";
      let token: string = localStorage.getItem('token');
      var noQuotes = token.split('"').join('');
      var mainToken: string = bearer.concat(noQuotes);
      
    }
    return this.http.delete<Cart>(this.apiUrl+`cart/`+id+`/`,
    { headers: { Authorization: mainToken } } );
  }


  buyFromCart() {
    this.tt = this.appService.getToken();
    return this.http.post<Cart>(this.apiUrl+ `buy_cart/`, {},
      { headers: { Authorization: this.tt } }
      )
  }

}


// riya.patadiya@gmail.com
// Riya@1234