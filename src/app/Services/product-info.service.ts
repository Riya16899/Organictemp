import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Products } from '../Models/products'; 

@Injectable({
  providedIn: 'root'
})
export class ProductInfoService {
  apiUrl = environment.apiUrl;

  constructor(public http: HttpClient) { }

  getProductInfo(id: number): Observable<Products> {
    return this.http.get<Products>(this.apiUrl+`product_info/`+id+`/`);
  }

}
