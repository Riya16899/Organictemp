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
    return this.http.get<Signup>(this.apiUrl+`signup/`);
  }

  postSignup(formData: any): Observable<Signup> {
    return this.http.post<Signup>(this.apiUrl+`signup/`,
      { email: formData.email, fname: formData.firstname, 
        lname: formData.lastname, pswd1: formData.password, 
        pswd2: formData.confirmpassword });
  }

}
