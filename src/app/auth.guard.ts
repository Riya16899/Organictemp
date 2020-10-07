import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { LoginService } from './Services/login.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


	constructor(private router: Router, private loginService: LoginService) { }

  	canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // if(localStorage.getItem('token')) {
    // 	console.log(state.url);
    // 	alert('Please Log In.')
    // 	this.router.navigate[state.url];
    // 	return true;
    // } 
    // else {
    // 	console.log(state.url);
    // 	this.router.navigate['/login'];
    // 	return false;
    // }
    // return true;
    let url: string = state.url;
    return this.loggedIn(url);

  }
  
  loggedIn(url: string): boolean {
    // if(localStorage.getItem('token')) {
      if(localStorage.getItem('token') !== null && localStorage.getItem('token') !== 'undefined') {
        console.log('token exist');
        this.loginService.IsLogIn = true;
      }
      else {
        console.log('token not exist');
        this.loginService.IsLogIn = false;
      }
    // }

  	// else if (localStorage.getItem('token') == 'undefined'){
   //    console.log('else if token does not exist');
  	// 	this.loginService.IsLogIn = false;
  	// }
    // else {
    //   console.log('token does not exist');
    //   this.loginService.IsLogIn = false;
    // }
  	
  	if(this.loginService.IsLogIn) {
  		return true;
  	}
  	this.loginService.redirect = url;
  	this.router.navigate(['/login']);
  	return false;
  }
}


