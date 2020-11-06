import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import { StripeService, Elements, Element as StripeElement, ElementsOptions } from 'ngx-stripe';
import { Router, ActivatedRoute } from "@angular/router";
import { DetailsService } from '../Services/details.service'; 
import { CheckoutService } from '../Services/checkout.service';
import { CartService } from '../Services/cart.service';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit {

  addressFlagg: boolean;
  cardFlagg: boolean;

  checkSub: boolean;
  elements: Elements;
  card: StripeElement;
  submitted: any;
  loading: any;
  OrderId: string;
  Addresses: any;
  Cards: any;
  stripeToken: string;
  alertVerify: boolean;
  addrAvailable: string;
  cardAvailable: string;
 

  public addressForm = this.formBuilder.group({
    addr1: new FormControl('', [Validators.required, Validators.minLength(5)]),
    addr2: new FormControl('', [Validators.required, Validators.minLength(5)]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    city: new FormControl('', [Validators.required, Validators.minLength(3)]),
    state: new FormControl('', [Validators.required, Validators.minLength(3)]),
    country: new FormControl('', [Validators.required, Validators.minLength(2)]),
    postal_code: new FormControl('', [Validators.required, Validators.minLength(5)]),
    defaultAddress: new FormControl('', [Validators.required])
  });

  public cardDetailsForm = this.formBuilder.group({
  	name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  	cardnumber: new FormControl('', [Validators.required]),
  	cvv: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]),
  	exdate: new FormControl('', [Validators.required]),
    defaultCard: new FormControl('', []),
    order_id: new FormControl('', [])
  });	

  public verifyForm = this.formBuilder.group({
    cvv: new FormControl('', [Validators.required]),
    last4: new FormControl('', [Validators.required]),
    card_id: new FormControl('', [Validators.required]),
    order_id: new FormControl('', [Validators.required])
  })

  constructor(private formBuilder: FormBuilder,
  	private stripeService: StripeService,
    private route: ActivatedRoute,
    private detailsService: DetailsService,
    private router: Router,
    private checkoutService: CheckoutService,
    private cartService: CartService ) { }

  ngOnInit() {
    console.log(this.route.snapshot.queryParams);
    this.addrAvailable = this.route.snapshot.queryParams['addressFlag'];
    this.cardAvailable = this.route.snapshot.queryParams['cardFlag'];
    console.log(this.addrAvailable, this.cardAvailable);
    if(this.addrAvailable && this.cardAvailable) {

        if(this.addrAvailable == 'true' && this.cardAvailable == 'false') {
            this.addressFlagg = false;
            this.cardFlagg = true;
            this.fetchAddress();
        }
        else if(this.addrAvailable == 'true' && this.cardAvailable == 'true') {
            this.addressFlagg = false;
            this.cardFlagg = true;
            // this.fetchAddress();
            this.fetchCard();
        }
        else if(this.addrAvailable == 'false' && this.cardAvailable == 'true') {
            this.addressFlagg = true;
            this.cardFlagg = false;   
            this.fetchCard();
        }
        else {
          // console.log(this.route.snapshot.queryParams['addressFlag'], this.route.snapshot.queryParams['cardFlag']);
          this.addressFlagg = true;
        }
        this.OrderId = this.route.snapshot.queryParams['order_id'];
    }
    else {
      if(this.route.snapshot.queryParams['address'] == 'true') {
        this.addressFlagg = true;
        this.fetchAddress();
      }
    }

  }

  onAddrChange(value: any) {
    console.log(value);
    this.addressForm.controls['defaultAddress'].setValue(value);
  }

  onCardChange(value: any) {
    console.log(value);
    this.cardDetailsForm.controls['defaultCard'].setValue(value);
  }

  get f(){
    return this.addressForm.controls;
  }

  fetchAddress() {
      this.checkoutService.getAddressDetails().subscribe((data) => {
        console.log(data);
        if(data['error']) {
          alert(data['error'])
        }
        else {
          this.Addresses = data['data']['address'];
        }
      });
  }

  fetchCard() {
    this.checkoutService.getCardDetails().subscribe((data) => {
      console.log(data);
      if(data['error']) {
          alert(data['error'])
      }
      else {
          this.Cards = data['data']['card'];
      }
    });
  }

  submitAddress() {
  	console.log(this.addressForm.value);
    if(!this.addressForm.value.defaultAddress) {
      this.addressForm.controls['defaultAddress'].setValue("false");
    }
  	// this.addressFlagg = false;
  	// this.cardFlagg = true;	
    this.detailsService.postAddress(this.addressForm.value).subscribe((data) => {
      console.log(data);
      if(data['error']) {
        alert(data['error']);
        this.alertVerify = false;
      }
      else {
        alert(data['meta']['success']);
        this.Addresses = data['data']['address'];
      }

    });


  }

  get c() {
  	return this.cardDetailsForm.controls;
  }

  submitCard() {
 
  	console.log(this.cardDetailsForm.value, this.OrderId);
    if(!this.cardDetailsForm.controls['defaultCard']) {
      this.cardDetailsForm.controls['defaultCard'].setValue("false");
    }
    this.cardDetailsForm.controls['order_id'].setValue(this.route.snapshot.queryParams['order_id']);

    this.detailsService.postCardDetails(this.cardDetailsForm.value).subscribe((data) => {
      console.log(data);
      
     
      if(data['error']) {
        alert(data['error']);
        this.alertVerify = false;
      }
      else {
        alert(data['meta']['success']);
        this.fetchCard();
        this.stripeToken = data['data']['token'];
      }
    });
    this.checkSub = true;
 
   
  }

  changeDefault(id: any) {
    console.log(typeof id);
    this.detailsService.changeDefAddr(id).subscribe((data) => {
      console.log(data);
      if(data['error']) {
        alert(data['error']);
      }
      else {
       alert(data['meta']['success']);
      }
    });

    this.fetchAddress();
  }

  sendCardId(id) {
    console.log(id);
    this.verifyForm.controls['card_id'].setValue(id);
  }

  verifyCvv() {

    this.verifyForm.controls['order_id'].setValue(this.route.snapshot.queryParams['order_id']);
    console.log(this.verifyForm.value);
    this.detailsService.postCvvVerify(this.verifyForm.value).subscribe((data) => {
      console.log(data);
      if(data['error']) {
        alert(data['error']);
        this.alertVerify = false;
      }
      else {
        alert(data['meta']['success']);
        this.stripeToken = data['data']['token'];
      }
    });
     this.checkSub = true;
    this.verifyForm.reset();
  }

  close() {
      let buy = this.route.snapshot.queryParams['buy_from_cart'];
      let order_id = this.route.snapshot.queryParams['order_id'];
      let quantity = this.route.snapshot.queryParams['quantity'];
      if(this.checkSub) {
        if(buy == 'true') {
          this.router.navigate(['/checkout'], { queryParams: { buy_from_cart : true, 
          'order_id': order_id, 'token': this.stripeToken  } });
        }
        else {
          this.router.navigate(['/checkout'], { queryParams: { buy_from_cart : false,
          'order_id': order_id, 'token': this.stripeToken  } });
        }
      }
      else {
        if(buy == 'true') {
          this.router.navigate(['/checkout'], { queryParams: { buy_from_cart : true, 
          'order_id': order_id, 'token': this.route.snapshot.queryParams['token']  } });
        }
        else {
          this.router.navigate(['/checkout'], { queryParams: { buy_from_cart : false,
          'order_id': order_id, 'token': this.route.snapshot.queryParams['token']  } });
        }
      }  
  }

}

// need to change checkSub condition for addr and card .  must do
// riya.patadiya@gmail.com
// Riya@1234


