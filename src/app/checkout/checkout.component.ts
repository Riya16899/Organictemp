import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { CheckoutService } from '../Services/checkout.service';
import { CartService } from '../Services/cart.service';
import { ProductInfoService } from '../Services/product-info.service';

import { FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  OrderSummery: any;
  orderId: number;
  checkBoolean: string;
  Total: any;
  handler:any = null;

  public checkoutForm = this.formBuilder.group({
    shipping_addr: new FormControl('', [Validators.required]),
    order_id: new FormControl('', [Validators.required])
  } );

  constructor(private checkoutService: CheckoutService, 
  	private cartService: CartService,
  	private productInfoService : ProductInfoService,
  	private route: ActivatedRoute,
   private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.loadStripe();
  	
  	this.checkBoolean = this.route.snapshot.queryParams['buy_from_cart'];
  	if(this.checkBoolean == 'true') {
  		this.cartService.buyFromCart().subscribe((data) => {
          if(data['error']) {
            alert(data['error']);
          }
          else {
            this.orderId = data['data']['order_id'];
            this.OrderSummery = data['data']['buy_products'];
            this.Total = data['data']['total_pay'];
          }
  		    
  	    });
  	}
  	else {
      var form = new FormData();
      form.append('quantity', this.route.snapshot.queryParams['quantity']);
      form.append('product_id', this.route.snapshot.queryParams['id']);
  		this.productInfoService.postBuyProduct(form).subscribe((data) => {
            if(data['error']) {
              alert(data['error']);
            }
            else {
              this.OrderSummery = data['data']['buy_product'];
              this.orderId = data['data']['order_id'];
              this.Total = data['data']['total_pay'];
            }	
      	});
  	}
  }


  Submit() {
  	this.checkoutForm.controls['order_id'].setValue(this.orderId);
  	this.checkoutService.postCheckout(this.checkoutForm.value).subscribe((data) => {
  		if(data['error']) {
  			alert(data['error']);
  		}
  		else {
  			alert(data['meta']['success']);
  		}
  	});
    this.checkoutForm.reset();
  }

  loadStripe() {

    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      
      window.document.body.appendChild(s);
      
    }
  }

  payy(amount) {    
 
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token);
        alert('Token Created!!');
      }
    });
 
    handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: amount * 100
    });
    console.log(handler);
 
}

}
