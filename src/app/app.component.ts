import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CartService } from './Services/cart.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Organictemp';

  constructor(private router: Router, private cartService: CartService) { 
    
  }

  Cart() {
    this.cartService.getCart().subscribe((data) => {
      console.log(data);
      if(data['error']){
        alert(data['error']);
      }

    });
    this.router.navigate(['/cart']);
  }  

  Logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
