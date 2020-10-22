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
  	console.log(this.route.snapshot.queryParams);
  	this.checkBoolean = this.route.snapshot.queryParams['buy_from_cart'];
  	
  	if(this.checkBoolean == 'true') {
  		this.cartService.buyFromCart().subscribe((data) => {
  		    console.log(data);
          if(data['error']) {
            alert(data['error']);
          }
          else {
            this.orderId = data['data']['order_id'];
            this.OrderSummery = data['data']['buy_products'];
            this.Total = data['data']['total_pay'];
            console.log(this.Total);
          }
  		    //console.log(data['data']['buy_from_cart']);
  		    
  	    });
  	}
  	else {
      var form = new FormData();
      form.append('quantity', this.route.snapshot.queryParams['quantity']);
      form.append('product_id', this.route.snapshot.queryParams['id']);
  		this.productInfoService.postBuyProduct(form).subscribe((data) => {
  	      	console.log(data);
            if(data['error']) {
              alert(data['error']);
            }
            else {
              this.OrderSummery = data['data']['buy_product'];
              this.orderId = data['data']['order_id'];
              this.Total = data['data']['total_pay'];
              console.log(this.Total);
            }
  	      	
      	});
  	}

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
    this.checkoutForm.reset();
  	// this.checkoutService.postCheckout(this.checkoutForm.value).subscribe((data) => {
  	// 	console.log(data);
  	// });
  }

}
