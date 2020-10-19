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

  @ViewChild('qua', { static: false } ) qua:ElementRef;
  @Output() getFormValue = new EventEmitter<any>(true);
 
  public productForm = this.formBuilder.group({
    quantity: new FormControl('', [Validators.required]),
    pro_id: new FormControl('', [Validators.required])
  } );

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private productInfoService: ProductInfoService, private cartService: CartService,
    private router: Router) { }

  ngOnInit() {
    this.cartService.getCart().subscribe((data) => {
      console.log(data);
    });
    
    const pro_id = this.route.snapshot.params['id'];
    this.productInfoService.getProductInfo(pro_id).subscribe((data) => {
      console.log(data);
      this.product_data = data['data']['product'];
      this.reviews  = data['data']['review'];
      console.log(this.reviews);
      
      if(data['error']) { 
        alert(data['error']);
      }
    });

  }
  
  Submit() {
  	this.valueQuantity = this.qua.nativeElement.value;
  	this.productForm.controls['quantity'].setValue(this.valueQuantity);
    this.productForm.controls['pro_id'].setValue(this.route.snapshot.params['id']);
  }  

  Cart(event: any) {
    console.log(event);
    if(!this.valueQuantity) {
      this.productForm.controls['quantity'].setValue(1);
    }
  
    this.productForm.controls['pro_id'].setValue(this.route.snapshot.params['id']);

    console.log(this.productForm.value);
    this.router.navigate(['/cart', this.productForm.value.quantity, this.productForm.value.pro_id]);
  }
  
  Buy() {
    if(!this.valueQuantity) {
      this.productForm.controls['quantity'].setValue(1);
    }
    this.productForm.controls['pro_id'].setValue(this.route.snapshot.params['id']);
    console.log(this.productForm.value);
    this.productInfoService.postBuyProduct(this.productForm.value).subscribe((data) => {
      console.log(data);
    });
    this.router.navigate(['/checkout']);
  }

}
