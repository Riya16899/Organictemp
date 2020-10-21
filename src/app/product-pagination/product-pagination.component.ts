import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
const paginate = require('jw-paginate');
import { ProductsService } from '../Services/products.service';

@Component({
  selector: 'app-product-pagination',
  templateUrl: './product-pagination.component.html',
  styleUrls: ['./product-pagination.component.scss']
})
export class ProductPaginationComponent implements OnInit {

  constructor(private productsService: ProductsService) { }

  @Output() changePage = new EventEmitter<any>(true);
    initialPage:number = 1;
    pageSize: number = 4;
    maxPages: any = 10
    start: number;
    end: number;
    items: Array<any>;
    totalLength: number;
    totalCountData: number;

    pager: any = {};

    ngOnInit() {
        // set page if items array isn't empty
        // if (this.items && this.items.length) {
        //     // this.setPage(this.initialPage);
        // }

        this.productsService.getProductList(1).subscribe((data) => {
        	this.totalLength = data['meta']['total_count'];
	      // total count of data (which is 112 in our api)
	     //  this.totalLength = Number(d.headers.get('spacex-api-count'));
	    });
        this.setPage(this.initialPage);
    }

    ngOnChanges(changes: SimpleChanges) {
        // reset page if items array has changed
        // if (changes.items.currentValue !== changes.items.previousValue) {
        //     this.setPage(this.initialPage);
        // }
    }

    setPage(page: number) {
    		console.log(page);
	      this.productsService.getProductList(page).subscribe((data) =>  {

	      // to define start and end value into array to avoid misplace the data into pages. 
		      // this.end = page * 10; 
		      // this.start = this.end - 10; 
		      // console.log(data);
		      console.log(this.start, this.end);
			  const last: number = (page * 3) + (page - 1);
			  const first: number = last - 3;
		      console.log(first, last); 
		      
		      this.items = Array(this.totalLength).fill(4, first, last+1).map(function(x,y) {
		        // because our data starts from 0 to 10 
		      	y = y - first;
		      	console.log(y);
		        return {dataa: data['data']['products'][y]};
		      }.bind(this));
		

		      this.pager = paginate(this.items.length, page, this.pageSize, this.maxPages)
	          
	          console.log('see here ..........');
	          // console.log(this.items.length, page, this.pageSize, this.maxPages);
	          // console.log(this.pager.startIndex, this.pager.endIndex);
	          // console.log(this.pager);
	          // console.log(this.items);
		      let pageOfItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);
		   
		      this.changePage.emit(pageOfItems);
	     });


    }

}


