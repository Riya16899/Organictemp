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

  // elements: Elements;
  // card: StripeElement;
  // paymentStatus: any;
  // stripeData: any;
  // submitted: any;
  // loading: any;

  // elementsOptions:  ElementsOptions = {
  //   locale: "en"
  // }

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
   ) { }

  ngOnInit() {
   // this.loadStripe();

   console.log(this.route.snapshot.queryParams['buy_from_cart']);
  	this.checkBoolean = this.route.snapshot.queryParams['buy_from_cart'];
  	if(this.checkBoolean == 'true') {

  		this.cartService.buyFromCart().subscribe((data) => {
        console.log(data);
       
          if(data['error']) {
            alert(data['error']);
          }
          else {
            this.orderId = data['data']['order_id'];
           // this.OrderSummery = data['data']['buy_products'];
            this.Total = data['data']['total_pay'];
            this.stripeToken = data['data']['token'];
            console.log(this.orderId);
            this.checkoutService.getCheckout(this.orderId).subscribe((data) => {
             console.log(data);
             this.OrderSummery = data['data']['products'];
             this.Total = data['data']['total_price'];
            }); 
          }
  	    });
      this.orderId = undefined;
  	}
  	else {
      console.log(this.route.snapshot.queryParams['buy_from_cart']);
      var form = new FormData();
      form.append('quantity', this.route.snapshot.queryParams['quantity']);
      form.append('product_id', this.route.snapshot.queryParams['id']);
  		this.productInfoService.postBuyProduct(form).subscribe((data) => {
        console.log(data);

        if(data['error']) {
          alert(data['error']);
        }
        else {
            console.log(data['data']['order_id']);
            console.log(data['data']['token']);
            this.OrderSummery = data['data']['buy_product'];
            this.orderId = data['data']['order_id'];
            this.Total = data['data']['total_pay'];
            this.stripeToken = data['data']['token'];
            console.log(this.orderId);
            this.checkoutService.getCheckout(this.orderId).subscribe((data) => {
             console.log(data['data']['products']);
             this.OrderSummery = data['data']['products'];
             this.Total = data['data']['total_price'];
            });
        }
      });

    }


  }

    Submit() {
    this.checkoutForm.controls['order_id'].setValue(this.orderId);
    this.checkoutForm.controls['token'].setValue(this.stripeToken);
    console.log(this.checkoutForm.value);
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


    // this.stripeService.elements(this.elementsOptions)
    // .subscribe(elements => {
    //   this.elements = elements;
    //   if (!this.card) {
    //     this.card = this.elements.create('card', {
    //       iconStyle: 'solid',
    //       style: {
    //         base: {
    //           iconColor: '#666EE8',
    //           color: '#31325F',
    //           lineHeight: '40px',
    //           fontWeight: 300,
    //           fontFamily: 'Helvetica',
    //           fontSize: '18px',
    //         }
    //       }
    //     });
    //     this.card.mount('#card-element');
    //   }
    // });
  }

  // loadStripe() {

  //   if(!window.document.getElementById('stripe-script')) {
  //     var s = window.document.createElement("script");
  //     s.id = "stripe-script";
  //     s.type = "text/javascript";
  //     s.src = "https://checkout.stripe.com/checkout.js";
      
  //     window.document.body.appendChild(s);
      
  //   }
  // }

  // payy(amount) {    
 
  //   var handler = (<any>window).StripeCheckout.configure({
  //     // key: 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI',
  //     key: 'pk_test_51HgUIAE6HZ2spzZbur7T9XS40mmCNzq1n7yqzzKEvhFmiS8FgKQJlYBC5Xlcfllkg1yCGvWeGXFnZ6EfzLX41qQx00gRzx7ZmM',
  //     locale: 'auto',
  //     token: function (token: any) {
  //       // You can access the token ID with `token.id`.
  //       // Get the token ID to your server-side code for use.
  //       console.log(token);
  //       alert('Token Created!!');
  //     }
  //   });
 
  //   handler.open({
  //     name: 'Demo Site',
  //     description: '2 widgets',
  //     amount: amount * 100
  //   });
  //   console.log(handler);
 
  // }

  // buy() {
  //   this.submitted = true;
  //   this.loading = true;
  //   this.stripeData = this.stripeForm.value
  //   this.stripeService.createToken(this.card, {})
  //   .subscribe(result => {
  //     if(result.token) {
  //       this.stripeData['token']=result.token
  //       console.log(this.stripeData);
  //       console.log(this.stripeForm.value);
  //       this.checkoutService.stripePayment(this.stripeForm.value)
  //       .subscribe((res) => {
  //         console.log(res);
  //       });
  //     }
  //     else {
  //       this.paymentStatus = result.error.message;
  //       console.log(this.paymentStatus);
  //     }
  //   });
  // }

// implemented from here : https://medium.com/@saikiran1298/integrating-stripe-payments-into-angular-and-nodejs-applications-10f40dcc21f5




