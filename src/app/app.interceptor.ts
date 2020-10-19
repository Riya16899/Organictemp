import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ResetpwdService } from './Services/resetpwd.service';
import { Login } from './Models/login';
import { Router, ActivatedRoute } from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public reset: ResetpwdService, private route: ActivatedRoute) {
    
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`Bearer ${localStorage.getItem('token')}`);
    let urlToken = this.route.snapshot.paramMap.get('str');
    console.log(urlToken);

    // request = request.clone({
    //    setHeaders: {
    //      Token: this.route.snapshot.paramMap.get('str')
    //    }
    // });
    request = request.clone({

      headers: request.headers.set( 'Token', 'TYUIop' )
    });
    // console.log(request);
    return next.handle(request);
  }

}  
