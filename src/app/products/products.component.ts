import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ProductsService } from '../Services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  selectedValue = 0;
  category_data: any; 
  product_data: any;
  dataDefined: boolean;
  valueQuantity: number;

  @ViewChild('qua', { static: false } ) qua:ElementRef;

  public productForm = this.formBuilder.group({
    quantity: new FormControl('', [Validators.required]),
    pro_id: new FormControl('', [])
  } );

  public filterForm = this.formBuilder.group({
     website: new FormControl('', Validators.required),
     category: new FormControl('', Validators.required)
  });

  priceList: any = [
    { id: 1, range: 'Low-High' },
    { id: 2, range: 'Medium' },
    { id: 3, range: 'High-Low' }
  ];

  categoryList: any = [
  	{ cat: 'Hair Care'},
  	{ cat: 'Skin Care'}
  ]

  constructor(private formBuilder: FormBuilder, 
  	private productsService: ProductsService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

  	this.productsService.getProductList().subscribe((data) => {
  		console.log(data);
  		this.category_data = data['data']['category'];
  		// console.log(data['meta']['status_code']);
  		// console.log(data['error']);
  		
	    if(data['error']) {
	    	this.dataDefined = false;
	    	console.log(this.product_data);
	    	alert(data['error']);
	    }
	    else {
	    	this.dataDefined = true;
  			this.product_data = data['data']['products'];
	    }

  	});
  }

  onCheckboxChange(e) {
    const website: FormArray = this.filterForm.get('website') as FormArray;
  
    if (e.target.checked) {
      website.push(new FormControl(e.target.value));
    } else {
       const index = website.controls.findIndex(x => x.value === e.target.value);
       website.removeAt(index);
    }
  }

  submit(){
  	console.log('all form values');
    console.log(this.filterForm.value);
  }
  quantitySub() {
    var Quantity = this.qua.nativeElement.value;
    console.log(Quantity);
    this.productForm.controls['quantity'].setValue(this.valueQuantity);
    // this.productForm.controls['pro_id'].setValue();
  }
  
  onPriceSelected(event) {
  	const value = event.target.value;
  	console.log(value);
  	this.filterForm.controls['website'].setValue(value);
  	console.log(this.filterForm.value);
  }
  onCategorySelected(event) {
    	const value = event.target.value;
    	this.filterForm.controls['category'].setValue(value);
    	const cat = this.filterForm.value.category;
    	console.log(cat);
    	this.productsService.getProductFilter(cat).
    	subscribe((data) => {
    		console.log(data);
    		this.dataDefined = true;
    		this.product_data = data['data']['products'];
  	});
  }

  Cart(pro_id: any) {

    this.valueQuantity = this.qua.nativeElement.value;
    console.log(this.valueQuantity);
    if(!this.valueQuantity) {
      this.productForm.controls['quantity'].setValue(1);
    }
    this.productForm.controls['quantity'].setValue(this.valueQuantity);
  
    this.productForm.controls['pro_id'].setValue(pro_id);

    console.log(this.productForm.value);
    this.router.navigate(['/cart', this.productForm.value.quantity, this.productForm.value.pro_id]);
  }
  
}

// for label http://jsfiddle.net/crrc7s7f/3/
// https://stackoverflow.com/questions/46647105/angular-4-checkbox-trigger-change-event-on-model-change
// https://www.itsolutionstuff.com/post/angular-checkbox-example-angular-9-8-checkbox-tutorialexample.html
// riya.patadiya@gmail.com
// Riya@1234