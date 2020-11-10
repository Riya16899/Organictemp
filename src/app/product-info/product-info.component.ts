import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ProductInfoService } from '../Services/product-info.service';
import { CartService } from '../Services/cart.service';
import { AppComponent } from '../app.component';

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
  toast: any;

  @ViewChild('quantity', { static: false } ) quantity:ElementRef;
  @ViewChild('review', { static: false } ) review:ElementRef;
 
  public productForm = this.formBuilder.group({
    quantity: new FormControl('', [Validators.required]),
    pro_id: new FormControl('', [Validators.required])
  } );

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private productInfoService: ProductInfoService, private cartService: CartService,
    private router: Router,
    private appComponent: AppComponent ) { }

  ngOnInit() {

    const pro_id = this.route.snapshot.params['id'];
    this.productInfoService.getProductInfo(pro_id).subscribe((data) => {
      console.log(data);
      if(data['error']) { 
        // alert(data['error']);
        this.appComponent.showToast('Error', data['error']);
        //this.toast = {title: 'error', type: 'error', 
        // body: data['error'], delay: 1000}
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
      var form = new FormData();
      form.append('quantity', this.productForm.value.quantity);
      form.append('product_id', this.productForm.value.pro_id);
      this.productInfoService.postBuyProduct(form).subscribe((data) => {
        console.log(data);
        if(data['error']) {
          alert(data['error']);
          this.toast = {title: 'error', type: 'error', 
          body: data['error'], delay: 1000}
        }
        else {
          this.buyFromCart = data['data']['buy_from_cart'];

          this.router.navigate(['/details'], { queryParams: { buy_from_cart : data['data']['buy_from_cart'], 
             'order_id': data['data']['order_id'], 'addressFlag': data['data']['address_available'], 
             'cardFlag': data['data']['card_available'] } });

        
         }
        
      });


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

  start: number = 0
  end: number = 2
  loadIndex: number = 2;

  more() {
    this.start = this.loadIndex;
    if (this.loadIndex < this.reviews.length) {
      this.loadIndex += 2;
    }
    this.end = this.loadIndex;
  }
  less() {
    this.end = this.loadIndex;
    if (this.loadIndex > 2) {
      this.loadIndex -= 2;
    }
    this.start = this.loadIndex;
  }

 
}


// for css change disable : https://stackoverflow.com/questions/45256076/angular-2-attr-disabled-is-not-working-for-div-when-i-try-to-iterate-ngfor-loop 
// https://stackoverflow.com/questions/38326865/implementing-a-load-more-button-to-load-more-elements-when-its-clicked
// https://jsfiddle.net/jaredwilli/xP48C/

