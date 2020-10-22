import { Injectable } from '@angular/core';
import { Forgetpwd } from '../Models/forgetpwd';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgetpwdService {
  apiUrl = environment.apiUrl;

  constructor(public http: HttpClient) { }

  getForget(): Observable<Forgetpwd> {
    return this.http.get<Forgetpwd>(this.apiUrl+`forgot_password/`);
  }

  postForget(formData: any): Observable<Forgetpwd> {
    var form = new FormData();
    form.append('email', formData.email);

    return this.http.post<Forgetpwd>(this.apiUrl+`forgot_password/`, 
    	form );
  }
}

