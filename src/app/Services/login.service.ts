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
    return this.http.get<Login>(this.apiUrl+`login/`, { observe: 'body' });
  }

  postLogin(formDat: any): Observable<Login> {

    var form = new FormData();
    form.append('email', formDat.email);
    form.append('pswd', formDat.password);
    const auth = localStorage.getItem('token');

    console.log(`Bearer ${localStorage.getItem('token')}`);
    console.log(`Bearer` + localStorage.getItem('token'));
    console.log(localStorage.getItem('token'));
    let pais:string = "Bearer ";
    let codigo:string = localStorage.getItem('token');
    var noQuotes = codigo.split('"').join('');
    let opcionDos:string = pais.concat(noQuotes);
    
    console.log(noQuotes);
    console.log(opcionDos);
    // let headers = new HttpHeaders().set('token', 'hvalue1');
    return this.http.post<Login>(this.apiUrl+`login/`, 
      form, 
      { headers: { 'Authorization': opcionDos, 'Content-type': 'application/form-data; charset=utf-8'} }
      );
  }

}




// riya.patadiya@gmail.com
// Riya@#1234

/// { headers: { 'Content-type': 'application/form-data; charset=utf-8', token: localStorage.getItem('token')}, 