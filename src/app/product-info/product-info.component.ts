import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ProductInfoService } from '../Services/product-info.service';
import { CartService } from '../Services/cart.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {

  product_data: any;
  valueQuantity: number;
  reviews: any;
  buyFromCart: boolean;
  showInput: boolean = false;

  isDisabledContent: boolean;

  @ViewChild('quantity', { static: false } ) quantity:ElementRef;
  @ViewChild('review', { static: false } ) review:ElementRef;
 
  public productForm = this.formBuilder.group({
    quantity: new FormControl('', [Validators.required]),
    pro_id: new FormControl('', [Validators.required])
  } );

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private productInfoService: ProductInfoService, private cartService: CartService,
    private router: Router) { }

  ngOnInit() {
    
    // this.showFirstTwo(this.offers, this.offer);

    const pro_id = this.route.snapshot.params['id'];
    this.productInfoService.getProductInfo(pro_id).subscribe((data) => {
      if(data['error']) { 
        alert(data['error']);
      }
      else {
        this.product_data = data['data']['product'];
        this.reviews  = data['data']['review'];
      }
    });
  }
  
  Submit() {
  	this.valueQuantity = this.quantity.nativeElement.value;
  	this.productForm.controls['quantity'].setValue(this.valueQuantity);
    this.productForm.controls['pro_id'].setValue(this.route.snapshot.params['id']);
  }  

  Cart(event: any) {
    if(!this.valueQuantity) {
      this.productForm.controls['quantity'].setValue(1);
    }
    this.productForm.controls['pro_id'].setValue(this.route.snapshot.params['id']);
    this.router.navigate(['/cart', this.productForm.value.quantity, this.productForm.value.pro_id]);
  }
  
  Buy() {
    if(!this.valueQuantity) {
      this.productForm.controls['quantity'].setValue(1);
    }
    this.productForm.controls['pro_id'].setValue(this.route.snapshot.params['id']);
    if(this.buyFromCart === true) {
      this.router.navigate(['/checkout'], { queryParams: { buy_from_cart : true } });
    }
    else {
      this.router.navigate(['/checkout'], { queryParams: { buy_from_cart : false, id: this.productForm.value.pro_id, quantity: this.productForm.value.quantity } });
    }
    
  }

  Rate() {
    if(localStorage.getItem('token')) {
        this.showInput = true;
    }
    else {
      alert('Please Login ');
    }
    
  }
  ReviewSubmit() {
    this.productForm.controls['pro_id'].setValue(this.route.snapshot.params['id']);
    this.productInfoService.postReview(this.productForm.value['pro_id'], 
      this.review.nativeElement.value).subscribe((data) => {
        if(data['error']) { 
            alert(data['error']);
        }
        else {
          this.reviews = data['data']['product_review'];
        }
      });
      this.review.nativeElement.value = ''; 
  }

 
}


// for css change disable : https://stackoverflow.com/questions/45256076/angular-2-attr-disabled-is-not-working-for-div-when-i-try-to-iterate-ngfor-loop 
// https://stackoverflow.com/questions/38326865/implementing-a-load-more-button-to-load-more-elements-when-its-clicked
// https://jsfiddle.net/jaredwilli/xP48C/

