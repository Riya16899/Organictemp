import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { CheckoutService } from '../Services/checkout.service';
import { CartService } from '../Services/cart.service';
import { FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  OrderSummery: any;
  orderId: number;

  public checkoutForm = this.formBuilder.group({
    shipping_addr: new FormControl('', [Validators.required]),
    order_id: new FormControl('', [Validators.required])
  } );

  constructor(private checkoutService: CheckoutService, 
  	private cartService: CartService,
  	private route: ActivatedRoute,
   private formBuilder: FormBuilder) { }

  ngOnInit() {
  	console.log(this.route.snapshot);
  	this.cartService.buyFromCart().subscribe((data) => {
       console.log(data);
       //console.log(data['data']['buy_from_cart']);
       this.orderId = data['data']['order_id'];
       this.OrderSummery = data['data']['buy_products'];
    });
  }


  Submit() {
  	this.checkoutForm.controls['order_id'].setValue(this.orderId);
  	console.log(this.checkoutForm.value);
  	console.log('ok sent');
  	this.checkoutService.postCheckout(this.checkoutForm.value).subscribe((data) => {
  		console.log(data);
  		if(data['error']) {
  			alert(data['error']);
  		}
  		else {
  			alert(data['meta']['success']);
  		}
  	});
  	// this.checkoutService.postCheckout(this.checkoutForm.value).subscribe((data) => {
  	// 	console.log(data);
  	// });
  }

}
