import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {



  public filterForm = this.formBuilder.group({
     website: new FormControl('', Validators.required)
  });

  priceList: any = [
    { id: 1, range: 'belove 500' },
    { id: 2, range: '500 - 1000' },
    { id: 3, range: 'above 1000' }
  ];

  categoryList: any = [
  	{ cat: 'Hair Care'},
  	{ cat: 'Skin Care'}
  ]

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

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
    console.log(this.filterForm.value);
  }
  
	onOptionsSelected(event) {
	   const value = event.target.value;
	   console.log(value);
	}
  

}

// for label http://jsfiddle.net/crrc7s7f/3/
// https://stackoverflow.com/questions/46647105/angular-4-checkbox-trigger-change-event-on-model-change
// https://www.itsolutionstuff.com/post/angular-checkbox-example-angular-9-8-checkbox-tutorialexample.html
// riya.patadiya@gmail.com
// Riya@1234