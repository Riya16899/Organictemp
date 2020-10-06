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

    var form = new FormData();
    form.append('pswd1', formData.pwd);
    form.append('pswd2', formData.cnfpwd);
    return this.http.post<Resetpwd>(this.apiUrl+`reset_password/RGSMMH/`,
      form
      );
  }

}
