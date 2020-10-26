import { Injectable } from '@angular/core';
import { Resetpwd } from '../Models/resetpwd';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from "@angular/router";
import { AppService } from '../app.service'; 

@Injectable({
  providedIn: 'root'
})
export class ResetpwdService {
  resetValue: Resetpwd;
  apiUrl = environment.apiUrl;

  constructor(public http: HttpClient, private route: ActivatedRoute,
    private appService: AppService ) { }



  getReset(): Observable<Resetpwd> {
    return this.http.get<Resetpwd>(`${this.apiUrl}reset_password/`);
  }

  postReset(formData: any, urlToken: string): Observable<Resetpwd> {
    console.log(urlToken);
    var form = new FormData();
    form.append('pswd1', formData.pwd);
    form.append('pswd2', formData.cnfpwd);
    console.log(`${this.apiUrl}reset_password/${urlToken}`);
    return this.http.post<Resetpwd>(`${this.apiUrl}reset_password/${urlToken}`,
      form
      // { headers: { Token: this.appService.getToken() } }
      );
  }

}

// riya.patadiya@gmail.com
// Riya@1234

   
;