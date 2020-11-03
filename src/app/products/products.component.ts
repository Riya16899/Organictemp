import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ProductsService } from '../Services/products.service';
import { Products } from '../Models/products';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  category_data: any; 
  // product_data: any;
  dataDefined: boolean;
  valueQuantity: number;
  totalCountData: number;
  searchName: string = undefined;
  catName: string = undefined;
  priceName: string = undefined;
  name: any;
  price_filter: any;
  index: number;
  pageOfItems: Array<Products>;
  
 
  public productForm = this.formBuilder.group({
    quantity: new FormControl('', [Validators.required]),
    pro_id: new FormControl('', [])
  } );

  public searchForm = this.formBuilder.group({
    search: new FormControl('')
  });

  constructor(private formBuilder: FormBuilder, 
  	private productsService: ProductsService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {



  	this.productsService.getProductList(1).subscribe((data) => {
      this.totalCountData = data['meta']['total_count'];
  		this.category_data = data['data']['category'];
      this.price_filter = data['data']['price_filter'];
	    if(data['error']) {
	    	this.dataDefined = false;
	    	alert(data['error']);
	    }
	    else {
	    	this.dataDefined = true;
  			// this.product_data = data['data']['products'];
	    }
  	});
  }

  quantityChange(value){
    this.valueQuantity = value;
    console.log(value);
    if(value === undefined) {
      this.valueQuantity = 1;
    }
  }
 
  onPriceSelected(event) {
  	const value = event.target.value;
    if(!value) {
      console.log('default');
    }
    this.priceName = value;
  }

  onCategorySelected(event) {
    	const value = event.target.value;
      this.catName = value;
    	
  }

  Cart(pro_id: any) {
    if(this.valueQuantity === undefined) {
      this.valueQuantity = 1;
    }
    if(!this.valueQuantity) {
      this.productForm.controls['quantity'].setValue(1);
    }
    this.productForm.controls['quantity'].setValue(this.valueQuantity);
    this.productForm.controls['pro_id'].setValue(pro_id);
    this.router.navigate(['/cart', this.productForm.value.quantity, this.productForm.value.pro_id]);
  }

  Search() {
    this.searchName = this.searchForm.value.search;
  }

  onChangePage(OfItems: any) {
    this.pageOfItems = OfItems;
    return this.pageOfItems; 
  }


  // offers = [];
  // offer: any;
  // pagesShown: number = 1;
  // pageSize: number = 5;
  // items: Array<any>;
  // pager: any = {};
  // page: number = 3;
  // pageOfItem: Array<Products>;

  // forlo() {
  //   for (let i = 0; i < 20; i++) {
  //       var number = i + 1;
  //       this.offers.push({
  //         number: number,
  //         name: 'Offer ' + number
  //       });
  //     }
  //     return this.offers;
  // }

 
  // Se() {
  //   console.log(this.page);
  //     const last: number = (this.page * 3) + (this.page - 1);
  //     const first: number = last - 3;
  //     console.log(first, last)
  //     this.items = Array(20).fill(4, first, last+1).map(function(x,y) {

  //       y = y - first;
  //       console.log(first, y)
  //       console.log(this.offers[y]);
  //       return {dataa: this.offers[y]};
  //     }.bind(this));

  //     console.log(this.items);
  //     this.pager = paginate(this.items.length, this.page, this.pageSize, 4);

  //     this.pageOfItem = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);
  //     //console.log(this.offers);
  //     this.page++;
  
  //     return this.items;
  // }

}

// for label http://jsfiddle.net/crrc7s7f/3/
// https://stackoverflow.com/questions/46647105/angular-4-checkbox-trigger-change-event-on-model-change
// https://www.itsolutionstuff.com/post/angular-checkbox-example-angular-9-8-checkbox-tutorialexample.html
