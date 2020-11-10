import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import { Router } from "@angular/router";
import { GenVerificationService } from '../Services/gen-verification.service';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-gen-verification',
  templateUrl: './gen-verification.component.html',
  styleUrls: ['./gen-verification.component.scss']
})
export class GenVerificationComponent implements OnInit {

  public verificationForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
  });

  constructor(private router: Router, private genService: GenVerificationService, 
  	private formBuilder: FormBuilder, private appComponent: AppComponent) { }

  ngOnInit() {
  }
  
  get f(){
    return this.verificationForm.controls;
  }

  Verification() {
  	
  	this.genService.postVerify(this.verificationForm.value).subscribe((data) => {
  	
  		if (data['error']) {
        this.appComponent.showToast('Error', data['error']);
  		}
  		else {
  			this.appComponent.showToast('Success', data['meta']['success']);
  		}
  	});
  	this.verificationForm.reset();
  }

}
