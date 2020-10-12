import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl} from "@angular/forms";

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {

  public productForm = this.formBuilder.group({
    quantity: new FormControl('', [Validators.required])
    
  } );

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }
  
  Submit() {
    console.log(this.productForm.value);
  }  

}
