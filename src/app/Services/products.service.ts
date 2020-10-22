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
  priceBoolean: boolean;

  constructor(public http: HttpClient, private route: Router) { }

  getProductList(page: number): Observable<Products> {
   
    return this.http.get<Products>(this.apiUrl+`product_listing/?page=`+page+`&size=4`);
  }

  getProductFilter(category: string, page: number) {
  	console.log(category);
  	return this.http.get<Products>(this.apiUrl+
  		`product_listing/filter/?f_cat=`+category+`&page=`+page+`&size=4&f_search&f_asc=true`);
  }

  getProductListFilter(category: string, page: number, price: string) {
    
    if(price === undefined) {
      this.priceBoolean = false;
    }
    else {
      if (price == 'low to high') {
        this.priceBoolean = true;
        
      } 
      else {
        this.priceBoolean = false;
      }
    }
    
    return this.http.get<Products>(this.apiUrl+`demo/?f_cat=`+category+`&page=`+page+`&size=4&f_search&f_asc=`+this.priceBoolean);
  }

}
