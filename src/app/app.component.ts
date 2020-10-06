import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Organictemp';
  loggedIn: boolean = false;

  constructor(private router: Router) { 
    console.log(localStorage.getItem('token'));
  }

  Logout() {
    localStorage.clear();
    this.router.navigate(['/home']);
  }

}
