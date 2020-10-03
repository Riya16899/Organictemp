import { Injectable } from '@angular/core';
import { Resetpwd } from '../Models/resetpwd';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResetpwdService {
  resetValue: Resetpwd;
  apiUrl = environment.apiUrl;

  constructor(public http: HttpClient) { }



  getReset(): Observable<Resetpwd> {
    return this.http.get<Resetpwd>(this.apiUrl+`reset_password/`);
  }

  postReset(formData: any): Observable<Resetpwd> {
  	console.log(formData);
    return this.http.post<Resetpwd>(this.apiUrl+`reset_password/RGSMMH/`,
      { pswd1: formData.pwd, pswd2: formData.cnfpwd });
  }

}
