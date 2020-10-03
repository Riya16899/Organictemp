import { Injectable } from '@angular/core';
import { Login } from '../Models/login';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginValue: Login;
  apiUrl = environment.apiUrl;
  headers: any = {
    Accept: 'text/plain; charset=utf-8',
    'Content-Type': 'text/plain; charset=utf-8',
  };

  constructor(public http: HttpClient) { }

  getLogin(): Observable<Login> {
    return this.http.get<Login>(this.apiUrl+`login/`);
  }

  postLogin(e: string, p: string): Observable<Login> {
    // console.log(formData.email, formData.password);
    console.log(e, p);
    // let headers = new HttpHeaders().set('token', 'hvalue1');
    return this.http.post<Login>(this.apiUrl+`login/`, 
    	{ email: e, pswd: p });
  }

}
