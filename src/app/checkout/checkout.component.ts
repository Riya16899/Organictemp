import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { CheckoutService } from '../Services/checkout.service';
import { CartService } from '../Services/cart.service';
import { ProductInfoService } from '../Services/product-info.service';
import { StripeService, Elements, Element as StripeElement, ElementsOptions } from 'ngx-stripe';
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
  stripeToken: string;
  totalPrice: number;
  Addresses: any;
  Cards: any;

  public stripeForm = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    currency: new FormControl('', [Validators.required]),
    addr1: new FormControl('', [Validators.required]),
    addr2: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    postal_code: new FormControl('', [Validators.required]),
  });

  public checkoutForm = this.formBuilder.group({
    currency: new FormControl('', [Validators.required]),
    order_id: new FormControl('', [Validators.required]),
    token: new FormControl('', [Validators.required])
  } );

  constructor(private checkoutService: CheckoutService, 
  	private cartService: CartService,
  	private productInfoService : ProductInfoService,
  	private route: ActivatedRoute,
   private formBuilder: FormBuilder,
   private stripeService: StripeService,
   private router: Router,
   ) { }

  ngOnInit() {
    console.log(this.route.snapshot.queryParams);
    this.orderId = this.route.snapshot.queryParams['order_id'];
  	this.checkBoolean = this.route.snapshot.queryParams['buy_from_cart'];

  	if(this.checkBoolean == 'true') {
  		this.cartService.buyFromCart().subscribe((data) => {
        console.log(data);
          if(data['error']) {
            alert(data['error']);
          }
          else {
            this.orderId = data['data']['order_id'];
            this.Total = data['data']['total_pay'];
            this.checkoutService.getCheckout(this.orderId).subscribe((data) => {
             console.log(data);
             this.Addresses = data['data']['address'];
             this.Cards = data['data']['card'];
             this.OrderSummery = data['data']['products'];
             this.Total = data['data']['total_price'];
            }); 
          }
  	    });
      //this.orderId = undefined;
  	}

  	else {
      this.checkoutService.getCheckout(this.orderId).subscribe((data) => {
        console.log(data);
        if(data['error']) {
          alert(data['error']);
        }
        else {
             alert(data['meta']['success']);
             this.Addresses = data['data']['address'];
             this.Cards = data['data']['card'];
             this.OrderSummery = data['data']['products'];
             this.Total = data['data']['total_price'];
        }
      });
    }
  }

  Submit() {
    this.checkoutForm.controls['order_id'].setValue(this.orderId);
    this.stripeToken = this.route.snapshot.queryParams['token'];
    this.checkoutForm.controls['token'].setValue(this.stripeToken);
    console.log(this.checkoutForm.value);
    this.checkoutService.postCheckout(this.checkoutForm.value).subscribe((data) => {
      if(data['error']) {
        alert(data['error']);
      }
      else {
        alert(data['meta']['success']);
        this.router.navigate(['products']);
      }
    });
    this.checkoutForm.reset();
  }

  addrBtn() {
    if(this.route.snapshot.queryParams['buy_from_cart'] == 'true') {
      console.log('send from true');
       this.router.navigate(['/details'],  { queryParams: { address: 'true', 
      'buy_from_cart': this.route.snapshot.queryParams['buy_from_cart'],
     'token': this.route.snapshot.queryParams['token'], 
     'order_id': this.route.snapshot.queryParams['order_id'] } });
    }
    else {
      console.log('send from false');
      this.router.navigate(['/details'],  { queryParams: { address: 'true', 
      'buy_from_cart': this.route.snapshot.queryParams['buy_from_cart'],
      'token': this.route.snapshot.queryParams['token'],
      'order_id': this.route.snapshot.queryParams['order_id'] } });
    }
  }

}

// implemented from here : https://medium.com/@saikiran1298/integrating-stripe-payments-into-angular-and-nodejs-applications-10f40dcc21f5





