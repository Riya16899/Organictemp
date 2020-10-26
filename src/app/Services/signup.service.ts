import { Injectable } from '@angular/core';
import { Signup } from '../Models/signup';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  signupValue: Signup;
  apiUrl = environment.apiUrl;

  constructor(public http: HttpClient) { }

  getSignup(): Observable<Signup> {
    return this.http.get<Signup>(`${this.apiUrl}signup/`);
  }

  postSignup(formData: any): Observable<Signup> {

    var form = new FormData();
    form.append('email', formData.email);
    form.append('fname', formData.firstname);
    form.append('lname', formData.lastname);
    form.append('pswd1', formData.password);
    form.append('pswd2', formData.confirmpassword);
    return this.http.post<Signup>(`${this.apiUrl}signup/`, form
      );
  }
  

}

// { headers: { 'Content-type': 'application/form-data; charset=utf-8'} }