import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { LoginService } from './Services/login.service';
import { Login } from './Models/login';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {
    
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // request = request.clone({
    //   setHeaders: {
    //     Header: localStorage.getItem('token'),
    //   }
    // });
    const token =  localStorage.getItem('token');
    let newHeaders = request.headers;
    if (token) {
      newHeaders = newHeaders.append('authtoken', token);
    }
    const authReq = request.clone({headers: newHeaders});
    return next.handle(authReq);
    // return next.handle(request);
  }

}  


// https://rollbar.com/blog/error-handling-with-angular-8-tips-and-best-practices/