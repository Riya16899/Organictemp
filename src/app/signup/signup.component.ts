import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl} from "@angular/forms";
import { Router } from "@angular/router";
import { SignupService } from '../Services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.minLength(6)]),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmpassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  }, { validator: this.ConfirmedValidator('password', 'confirmpassword') }  );

  constructor(private router: Router, private signupService: SignupService, 
  	private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  get f(){
    return this.signupForm.controls;
  }
  
  ConfirmedValidator(first: string, second: string) {
     return (formGroup: FormGroup) => {
        const control = formGroup.controls[first];
        const matchingControl = formGroup.controls[second];
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }

  Submit() {
    
    this.signupService.postSignup(this.signupForm.value).subscribe((data) => {
      if(data['error']) {
        alert(data['error']);
      }
      else {
        alert(data['success']);
      }
    });
    this.signupForm.reset();
  	
  }

}
