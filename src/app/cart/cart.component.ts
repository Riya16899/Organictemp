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
  Total: number;

  public productForm = this.formBuilder.group({
    quantity: new FormControl('', [Validators.required]),
    pro_id: new FormControl('', [Validators.required])
  } );


  constructor(private route: ActivatedRoute, private router: Router,
   private cartService: CartService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    console.log(this.route.snapshot.params);
    if (JSON.stringify(this.route.snapshot.params) == '{}') {
      
  	  this.cartService.getCart().subscribe((data) => {
        // console.log(data['data']['cart_product']);
        if(data['error']) {
          console.log(data['error']);
          alert(data['error']);
        }
        else {
          this.cartData = data['data']['cart_product'];
          this.Total = data['data']['total_price'];
        }
      });
    }
    else {
      console.log(this.route.snapshot.queryParams);
      this.productForm.controls['quantity'].setValue(this.route.snapshot.params['quantity']);
      this.productForm.controls['pro_id'].setValue(this.route.snapshot.params['pro_id']);
      this.cartService.postCart(this.productForm.value).subscribe((data) => {
        console.log(data);
      
        if(data['error']) {
          console.log(data['error']);
          alert(data['error']);
        }
        else {
          this.cartData = data['data']['cart_product'];
          this.Total = data['data']['total_price'];
        }
      
      });
    }


  }

  Checkout() {
    this.cartService.buyFromCart().subscribe((data) => {
       console.log(data);
        if(data['error']) {
          alert(data['error']);
        }
        else {
          this.buyFromCart = data['data']['buy_from_cart'];
        }
        
    });
    
    if(this.buyFromCart = true) {
      this.router.navigate(['/checkout'], { queryParams: { buy_from_cart : true } });
    }
    else {
      this.router.navigate(['/checkout'], { queryParams: { buy_from_cart : false } });
    }
  	
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



// alert box when no ony product in cart. 