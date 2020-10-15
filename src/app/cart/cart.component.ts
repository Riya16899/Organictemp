import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { CartService } from '../Services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private cartService: CartService) { }

  ngOnInit() {

  }

  Checkout() {
  	this.router.navigate(['/checkout']);
  }

}
