import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { LoginService } from './Services/login.service';
import { Login } from './Models/login';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public login: LoginService) {
    
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`Bearer ${localStorage.getItem('token')}`);
    // request = request.clone({

    //   headers: request.headers.set('Authorization', localStorage.getItem('token') ),
      

    //   // setHeaders: {
    //   //   'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
    //   //   Authorization: `Bearer ${localStorage.getItem('token')}`
    //   // }
    // });
    request = request.clone({

      headers: request.headers.set('Content-type', 'application/x-www-form-urlencoded; charset=utf-8'),
      
      // setHeaders: {
      //   'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      //   Authorization: `Bearer ${localStorage.getItem('token')}`
      // }
    });
    console.log(request);
    return next.handle(request);
  }

}  


// https://rollbar.com/blog/error-handling-with-angular-8-tips-and-best-practices/