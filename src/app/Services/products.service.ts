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
    return this.http.get<Products>(this.apiUrl+`product_listing/?page=1&size=4`);
  }

  // getProductPagination(offset: number): Observable<Products> {
  //   offset = offset - 10;
  //   let url = this.apiUrl+`product_listing/`+offset;
  //   return this.http.get<Products>(url).pipe(map((data) => 
  //     (JSON.parse(JSON.stringify(data) )).map((user: Products) => new Products().deserialize(user) ) ));
  // }

  getProductFilter(category: string) {
  	console.log(category);
  	return this.http.get<Products>(this.apiUrl+
  		`product_listing/filter/?f_cat=`+category+`&page=1&size=2&f_search&f_asc=true`);
  }



}




// get totallength of daata from service. then after calculation of page size
// and all send to api. 