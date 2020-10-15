import { Injectable } from '@angular/core';
import { Products } from '../Models/products'; 
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  apiUrl = environment.apiUrl;

  constructor(public http: HttpClient, private route: Router) { }

  getProductList(): Observable<Products> {
    return this.http.get<Products>(this.apiUrl+`product_listing/`);
  }

  getProductFilter(category: string) {
  	console.log(category);
  	return this.http.get<Products>(this.apiUrl+
  		`product_listing/filter/?f_cat=`+category+`&page=1&size=2&f_search&f_asc=true`);
  }

}
