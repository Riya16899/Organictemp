import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Products } from '../Models/products'; 
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class ProductInfoService {
  apiUrl = environment.apiUrl;
  token: any;

  constructor(public http: HttpClient,  private appService: AppService) { }

  getProductInfo(id: number): Observable<Products> {
    return this.http.get<Products>(this.apiUrl+`product_info/`+id+`/`);
  }
  
  postBuyProduct(formDat: any): Observable<Products> {
  	// var form = new FormData();
   //  form.append('quantity', formDat.quantity);
   //  form.append('product_id', formDat.pro_id);
   console.log(formDat);
    this.token = this.appService.getToken();
  	return this.http.post<Products>(this.apiUrl+`buy_product`+`/`, formDat,
  	{ headers: { Authorization: this.token } } );

  }


  postReview(pro_id, review) {
    console.log(pro_id, review);
    var form = new FormData();
    form.append('review', review);
    this.token = this.appService.getToken();

      return this.http.post(this.apiUrl+`review/`+pro_id+`/`, form, 
        { headers: { Authorization: this.token } } );
  }

}
