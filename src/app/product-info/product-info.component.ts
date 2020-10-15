import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild('qua', { static: false } ) qua:ElementRef;
 
  public productForm = this.formBuilder.group({
    quantity: new FormControl('', [Validators.required]),
    pro_id: new FormControl('', [Validators.required])
  } );

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private productInfoService: ProductInfoService, private cartService: CartService,
    private router: Router) { }

  ngOnInit() {
    const pro_id = this.route.snapshot.params['id'];
    this.productInfoService.getProductInfo(pro_id).subscribe((data) => {
      console.log(data);
      this.product_data = data['data']['product'];
      
      if(data['error']) { 
        alert(data['error']);
      }
    });

  }
  
  Submit() {
  	const value = this.qua.nativeElement.value;
  	this.productForm.controls['quantity'].setValue(value);
    this.productForm.controls['pro_id'].setValue(this.route.snapshot.params['id']);
  }  

  Go () {
    console.log(this.productForm.value);
    this.cartService.postCart(this.productForm.value).subscribe((data) => {
      console.log(data);
    });
    this.router.navigate(['/cart']);

  }
  Buy() {
    this.router.navigate(['/checkout']);
  }

}
