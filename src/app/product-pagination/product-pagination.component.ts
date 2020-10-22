import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
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
  
  @Input('master') masterName: number;
  @Input('master2') masterName2: string;

  MainData: any;

    initialPage:number = 1;
    pageSize: number = 4;
    maxPages: any = 10
    start: number;
    end: number;
    items: Array<any>;
    totalLength: number;
    totalCountData: number;
    check: boolean = false;
    pager: any = {};

    ngOnInit() {
        console.log(this.masterName2);
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
    		console.log('....................................');
            console.log(this.masterName2);
            if(this.masterName2 === undefined){
                console.log(this.masterName2);
                this.productsService.getProductList(page).subscribe((data) => {
                    console.log(data);
                    this.totalLength = data['meta']['total_count'];
                    this.MainData = data;
                       if(data['error']) {
                           alert(data['error']);
                       }
                       else {
                          const last: number = (page * 3) + (page - 1);
                          const first: number = last - 3;
                          
                          this.items = Array(this.totalLength).fill(4, first, last+1).map(function(x,y) {
                          
                            y = y - first;
                              
                            return {dataa: data['data']['products'][y]};
                          }.bind(this));
                    
                          this.pager = paginate(this.items.length, page, this.pageSize, this.maxPages)
                          let pageOfItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);
                          this.changePage.emit(pageOfItems);
                       }
                    
                });
            }

            else {
               
                this.productsService.getProductListFilter(this.masterName2, page).subscribe((data) => {
                       if(data['error']) {
                           alert(data['error']);
                       }
                       else {
                          console.log(data['meta']['total_count']);
                          this.totalLength = data['meta']['total_count'];
                          const last: number = (page * 3) + (page - 1);
                          const first: number = last - 3;
                          
                          this.items = Array(this.totalLength).fill(4, first, last+1).map(function(x,y) {
                          
                            y = y - first;
                            if(data['data']['products'][y] !== undefined) {
                                console.log('ok');
                                this.check = true;
                            }
                            else {
                                this.check = false;
                                console.log('not ok');
                            }
                              
                            return {dataa: data['data']['products'][y]};
                          }.bind(this));
                          
                          this.pager = paginate(this.items.length, page, this.pageSize, this.maxPages)
                          let pageOfItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);
                          this.changePage.emit(pageOfItems);
                            
                       }
                });
            }

            console.log('...............................');
            


      //       this.productsService.getProductList(page).subscribe((data) => {
               
      //          if(data['error']) {
      //              alert(data['error']);
      //          }
      //          else {
      //             const last: number = (page * 3) + (page - 1);
      //             const first: number = last - 3;
                  
      //             this.items = Array(this.totalLength).fill(4, first, last+1).map(function(x,y) {
                  
      //               y = y - first;
                      
      //               return {dataa: data['data']['products'][y]};
      //             }.bind(this));
            
      //             this.pager = paginate(this.items.length, page, this.pageSize, this.maxPages)
      //             let pageOfItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);
      //             this.changePage.emit(pageOfItems);
      //          }

	     // });

         

    }

}


