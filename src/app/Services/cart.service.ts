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
  Token: any;

  constructor(public http: HttpClient, private appService: AppService) { }

  getCart(): Observable<Cart>{
    
    this.Token = this.appService.getToken();
    return this.http.get<Cart>(this.apiUrl+`cart/`, 
      { headers: { Authorization: this.Token } } );
  }

  postCart(formDat: any): Observable<Cart> {
  	var form = new FormData();
    form.append('quantity', formDat.quantity);
    form.append('product_id', formDat.pro_id);
    console.log(formDat, form);

    this.Token = this.appService.getToken();
    
    return this.http.post<Cart>(this.apiUrl+`cart/`, form,
      { headers: { Authorization: this.Token } } );
  }


  deleteCart(id: number): Observable<Cart> {

    this.Token = this.appService.getToken();

    return this.http.delete<Cart>(this.apiUrl+`cart/`+id+`/`,
    { headers: { Authorization: this.Token } } );
  }

  buyFromCart(): Observable<Cart> {
    this.Token = this.appService.getToken();
    return this.http.post<Cart>(this.apiUrl+ `buy_cart/`, {},
      { headers: { Authorization: this.Token } }
      )
  }

}

// bad
// function sayHi(name) {
//   return 'How are you, ' + name + '?';
// }
// // good
// function sayHi(name) {
//   return `How are you, ${name}?`;
// }


// riya.patadiya@gmail.com
// Riya@1234