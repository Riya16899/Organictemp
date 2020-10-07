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


  constructor(private router: Router) { 
  }

  Logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
