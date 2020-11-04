import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import { StripeService, Elements, Element as StripeElement, ElementsOptions } from 'ngx-stripe';
import { Router, ActivatedRoute } from "@angular/router";
import { DetailsService } from '../Services/details.service'; 

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit {

  addressFlagg: boolean;
  cardFlagg: boolean;

  elements: Elements;
  card: StripeElement;
  paymentStatus: any;
  stripeData: any;
  submitted: any;
  loading: any;
  OrderId: string;

  elementsOptions:  ElementsOptions = {
    locale: "en"
  }

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
  	cardnumber: new FormControl('', [Validators.required
  		]),
  	cvv: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]),
  	exdate: new FormControl('', [Validators.required]),
    defaultCard: new FormControl('', [Validators.required])
  });	

  constructor(private formBuilder: FormBuilder,
  	private stripeService: StripeService,
    private route: ActivatedRoute,
    private detailsService: DetailsService,
    private router: Router ) { }

  ngOnInit() {
    console.log(this.route.snapshot.queryParams);
    console.log(`address`, this.route.snapshot.queryParams['addressFlag']);
    console.log(`card` , this.route.snapshot.queryParams['cardFlag']);


    // if(this.route.snapshot.queryParams['addressFlag'] && !this.route.snapshot.queryParams['cardFlag']) {
    //     console.log(this.route.snapshot.queryParams['addressFlag'] && !this.route.snapshot.queryParams['cardFlag']);
    //     this.addressFlagg = false;
    //     this.cardFlagg = true;
    //     console.log(this.route.snapshot.queryParams['addressFlag'], this.route.snapshot.queryParams['cardFlag']);
    // }
    // else if(!this.route.snapshot.queryParams['addressFlag'] && this.route.snapshot.queryParams['cardFlag']) {
    //     this.addressFlagg = true;
    //     this.cardFlagg = false;
    //     console.log(!this.route.snapshot.queryParams['addressFlag'] && !this.route.snapshot.queryParams['cardFlag']);
    //     console.log(this.route.snapshot.queryParams['addressFlag'], this.route.snapshot.queryParams['cardFlag']);
    // }
    // else {
    //   console.log(this.route.snapshot.queryParams['addressFlag'], this.route.snapshot.queryParams['cardFlag']);
    //   this.addressFlagg = true;
    // }
    this.OrderId = this.route.snapshot.queryParams['order_id'];


  }

  onAddrChange(value: any) {
    console.log(value);
    this.addressForm.controls['defaultAddress'].setValue(value);
  }

  onCardChange(value: any) {
    console.log(value);
    this.cardDetailsForm.controls['defaultCard'].setValue(value);
  }

  cardPaymentEle() {
  	
	  if (!this.card) {
	    this.card = this.elements.create('card', {
	      iconStyle: 'solid',
	      style: {
	        base: {
	          iconColor: '#666EE8',
	          color: '#31325F',
	          lineHeight: '40px',
	          fontWeight: 300,
	          fontFamily: 'Helvetica',
	          fontSize: '18px',
	        }
	      }
	    });
	   this.card.mount('#card-element');
	  }
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

  get f(){
    return this.addressForm.controls;
  }

  submitAddress() {
  	console.log(this.addressForm.value);
  	this.addressFlagg = false;
  	this.cardFlagg = true;	
    this.detailsService.postAddress(this.addressForm.value).subscribe((data) => {
      if(data['error']) {
        alert(data['error']);
      }
      else {
        alert(data['meta']['success']);
        console.log(data);
      }
    });
  }

  get c() {
  	return this.cardDetailsForm.controls;
  }

  submitCard() {
  	console.log(this.cardDetailsForm.value);
    this.detailsService.postCardDetails(this.cardDetailsForm.value, this.OrderId).subscribe((data) => {
      if(data['error']) {
        alert(data['error']);
      }
      else {
        alert(data['meta']['success']);
        console.log(data);
      }
    });
    this.router.navigate(['/checkout']);
  }

}


// riya.patadiya@gmail.com
// Riya@1234

  


