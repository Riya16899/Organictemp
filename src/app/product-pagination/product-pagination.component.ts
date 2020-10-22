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
  @Input('catName') categoryName: string;
  @Input('priceName') priceName: string;

    initialPage:number = 1;
    pageSize: number = 4;
    maxPages: any = 10
    items: Array<any>;
    totalLength: number;
    pager: any = {};

    ngOnInit() {

        this.productsService.getProductList(1).subscribe((data) => {
        	this.totalLength = data['meta']['total_count'];
	    });
        this.setPage(this.initialPage);
    }

    ngOnChanges(changes: SimpleChanges) {

    }

    setPage(page: number) {
    		
            if(this.categoryName === undefined){
                
                this.productsService.getProductList(page).subscribe((data) => {
                    
                    this.totalLength = data['meta']['total_count'];
                    
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
               
                this.productsService.getProductListFilter(this.categoryName, page, this.priceName).subscribe((data) => {
                       if(data['error']) {
                           alert(data['error']);
                       }
                       else {
                          this.totalLength = data['meta']['total_count'];
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

    }

}


