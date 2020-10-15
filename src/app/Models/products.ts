import { Category } from '../Models/category';

export interface Products {

	Id: number;
	Availability: number;
	Disscount_price: number;
	Price: number;
	Product_name: string;
	Description: string;
	Image_url: any;
	Sub_cat_name: string;
	Category_name: Category;

}
