import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CartService } from './Services/cart.service';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Organictemp';

  constructor(private router: Router, private cartService: CartService,
    private toaster: Toaster
    ) { 
    
  }
  ngOnInit() {
    // this.showToast('Message', 'Toast');
  }

  showToast(heading: string, message: string) {
    this.toaster.open({text: heading, caption: message, duration: 4000, type: 'primary'});
  }

  Cart() {
    // this.cartService.getCart().subscribe((data) => {
      
    //   if(data['error']){
    //     alert(data['error']);
    //   }

    // });
    this.router.navigate(['/cart']);
  }  

  Logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
    
  }

}
