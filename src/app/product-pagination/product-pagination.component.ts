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
    pageSize: number = 10;
    maxPages: any = 10
    start: number;
    end: number;
    items: Array<any>;
    totalLength: number;

    pager: any = {};

    ngOnInit() {
        // set page if items array isn't empty
        // if (this.items && this.items.length) {
        //     // this.setPage(this.initialPage);
        // }

        this.productsService.getProductList().subscribe((d) => {
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

	     //  this.tableService.GetLaunche((page * 10)).subscribe((data) =>  {

	     //  // to define start and end value into array to avoid misplace the data into pages. 
	     //  this.end = page * 10; 
	     //  this.start = this.end - 10; 
	      
	     //  this.items = Array(this.totalLength).fill(10, this.start, this.end).map(function(x,y) {
	     //    // because our data starts from 0 to 10 
	     //  	y = y - this.start;

	     //    return {flight_number: `${data[y].flight_number}`, launch_year: `${data[y].launch_year}`, mission_name: `${data[y].mission_name}`, launch_date_local: `${data[y].launch_date_local}` };
	     //  }.bind(this));
	

	     //  this.pager = paginate(this.items.length, page, this.pageSize, this.maxPages)
      //     console.log(this.items.length, page, this.pageSize, this.maxPages);
      //     console.log('see here ..........');
      //     console.log(this.pager.startIndex, this.pager.endIndex);
      //     console.log(this.pager);
	     //  let pageOfItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);
	   
	     //  this.changePage.emit(pageOfItems);
	     // });


    }

}


