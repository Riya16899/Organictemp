import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { CartService } from '../Services/cart.service';
import { FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartData: any;
  buyFromCart: boolean;

  public productForm = this.formBuilder.group({
    quantity: new FormControl('', [Validators.required]),
    pro_id: new FormControl('', [Validators.required])
  } );


  constructor(private route: ActivatedRoute, private router: Router,
   private cartService: CartService, private formBuilder: FormBuilder) { }

  ngOnInit() {
  	console.log(' in cart page route params');
  	console.log(this.route.snapshot.queryParams);
  	 // this.route.queryParams.subscribe(
    //   params => {
    //   	console.log(params);
    //      let data = JSON.parse(params['profile'][0]);
    //      console.log('Got param: ', data.longitude);

    //   }
    // )
  	this.productForm.controls['quantity'].setValue(this.route.snapshot.params['quantity']);
  	this.productForm.controls['pro_id'].setValue(this.route.snapshot.params['pro_id']);
  	this.cartService.postCart(this.productForm.value).subscribe((data) => {
		// console.log(data);
		if(data['error']) {
  			alert(data['error']);
  		}
  		else {
  			this.cartData = data['data']['cart_product'];
  		}
		
	});

  }

  Checkout() {
    this.cartService.buyFromCart().subscribe((data) => {
       console.log(data);
       this.buyFromCart = data['data']['buy_from_cart'];
       console.log(this.buyFromCart);
       
    });
  	this.router.navigate(['/checkout'], { queryParams: { buy : this.buyFromCart } });
  }

  Remove(event, item) {
  	console.log(event, item);
  	this.cartService.deleteCart(item).subscribe((data) => {
  		console.log(data);

  		if(data['error']) {
  			alert(data['error']);
  		}
  		else {
  			this.cartData = data['data']['cart_product'];
  		}
  	});
  }

}
