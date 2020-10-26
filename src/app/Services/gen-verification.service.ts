import { Injectable } from '@angular/core';
import { GenVerification } from '../Models/gen-verification';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenVerificationService {
  apiUrl = environment.apiUrl;

  constructor(public http: HttpClient) { }

  getVerify(): Observable<GenVerification> {
    return this.http.get<GenVerification>(`${this.apiUrl}generate_verification/`);
  }

  postVerify(formData: any): Observable<GenVerification> {
    var form = new FormData();
    form.append('email', formData.email);

    return this.http.post<GenVerification>(`${this.apiUrl}generate_verification/`, 
    	form );
  }

}
