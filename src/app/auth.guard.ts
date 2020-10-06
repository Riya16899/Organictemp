import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	r: boolean = true;
	constructor(private router: Router) { }

  	canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.r) {
    	console.log(state.url);
    	this.router.navigate[state.url];
    	return true;
    } 
    else {
    	console.log(state.url);
    	this.router.navigate['/login'];
    	return false;
    }
    
    return true;
  }
  
}


// https://stackoverflow.com/questions/41922466/redirect-user-with-router-depending-on-logged-in-status
// https://stackoverflow.com/questions/44121164/angular-2-redirect-if-user-is-logged-in/47041200