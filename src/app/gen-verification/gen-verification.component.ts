import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import { Router } from "@angular/router";
import { GenVerificationService } from '../Services/gen-verification.service';


@Component({
  selector: 'app-gen-verification',
  templateUrl: './gen-verification.component.html',
  styleUrls: ['./gen-verification.component.scss']
})
export class GenVerificationComponent implements OnInit {

  public verificationForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private router: Router, private genService: GenVerificationService, 
  	private formBuilder: FormBuilder) { }

  ngOnInit() {
  }
  
  get f(){
    return this.verificationForm.controls;
  }

  Verification() {
  	console.log(this.verificationForm.value);
  	this.genService.postVerify(this.verificationForm.value).subscribe((data) => {
  		console.log(data);
  		if (data['meta']['status_code'] == 200) {
  			alert(data['meta']['success']);
  		}
  		else if (data['meta']['status_code'] == 400) {
  			alert(data['meta']['error']);
  		}
  		else if (data['meta']['status_code'] == 401) {
  			alert(data['meta']['error']);
  		}
  	});
  	this.verificationForm.reset();
  }

}
