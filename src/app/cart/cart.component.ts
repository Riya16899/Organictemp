import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { CartService } from '../Services/cart.service';
import { FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartData: any;
  buyFromCart: boolean;
  Total: number;
  totalItems: number;
  emptyCart: boolean = false;
  heavyCart: boolean = false;
  OrderId: number;

  public productForm = this.formBuilder.group({
    quantity: new FormControl('', [Validators.required]),
    pro_id: new FormControl('', [Validators.required])
  } );

  constructor(private route: ActivatedRoute, private router: Router,
   private cartService: CartService, private formBuilder: FormBuilder,
   private appComponent: AppComponent) { }

  ngOnInit() {
    
    if (JSON.stringify(this.route.snapshot.params) == '{}') {
  	  this.cartService.getCart().subscribe((data) => {
        console.log(data);
        if(data['status_code'] == 404) {
          this.emptyCart = true;
        }
        if(data['error']) {
          this.appComponent.showToast('Error',data['error'])
        }
        else {
          this.heavyCart = true;
          this.cartData = data['data']['cart_product'];
          this.Total = data['data']['total_price'];
          this.totalItems = this.cartData.length;
        }
      });
    }
    else {
      this.productForm.controls['quantity'].setValue(this.route.snapshot.params['quantity']);
      this.productForm.controls['pro_id'].setValue(this.route.snapshot.params['pro_id']);
      this.cartService.postCart(this.productForm.value).subscribe((data) => {
        console.log(data);
        if(data['status_code'] == 404) {
          this.emptyCart = true;
        }
        if(data['error']) {
          this.appComponent.showToast('Error',data['error']);
        }
        else {
          this.heavyCart = true;
          this.cartData = data['data']['cart_product'];
          this.Total = data['data']['total_price'];
          this.totalItems = this.cartData.length;
        }
      });
    }
  }

  Checkout() {
    this.cartService.buyFromCart().subscribe((data) => {
      console.log(data);
        if(data['error']) {
          this.appComponent.showToast('Error',data['error']);
        }
        else {
          this.OrderId = data['data']['order_id'];
          this.buyFromCart = data['data']['buy_from_cart'];
          this.router.navigate(['/details'], { queryParams: { 'buy_from_cart' : data['data']['buy_from_cart'], 
           'order_id':this.OrderId, 'addressFlag': data['data']['address_available'], 
           'cardFlag': data['data']['card_available'] } });  
        } 
    });	
  }

  Remove(event, item) {
  	this.cartService.deleteCart(item).subscribe((data) => {
      console.log(data);
      if(data['status_code'] == 404) {
        this.heavyCart = false;
        this.emptyCart = true;
      }
  		if(data['error']) {
  			// alert(data['error']);
        this.appComponent.showToast('Error',data['error']);
  		}
  		else {
        this.appComponent.showToast('Success','Item removed successfully');
  			this.cartData = data['data']['cart_product'];
        this.totalItems = this.cartData.length;
  		}
  	});
  }

  addItems() {
    this.router.navigate(['/products']);
  }

}

// riya.patadiya@gmail.com
// Riya@1234