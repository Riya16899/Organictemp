import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  mainToken: string;

  constructor() { }

  getToken() {
  	  if(localStorage.getItem('token')) {
	      let bearer: string = "Bearer ";
	      let token: string = localStorage.getItem('token');
	      var noQuotes = token.split('"').join('');
	      this.mainToken = bearer.concat(noQuotes);   
	  }
	  return this.mainToken;
  }


}
