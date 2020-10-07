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
  // passwordsMatchValidator(form: FormGroup) {
  //   if (form.get('password') && form.get('confirmpassword')) {
  //       return form.get('password').value === form.get('confirmpassword').value ? null : { mismatch: true };
  //   }
  //   return null;
  // }
 
  passwordsMatchValidator(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirmpassword').value) {
        return {invalid: true};
    }
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
    console.log('login here');
    console.log(this.signupForm.value);
    this.signupService.postSignup(this.signupForm.value).subscribe((data) => {
      console.log(data);
      if(data['status_code'] == 200) {
        alert(data['success']);
      }
      else if (data['status_code'] == 401) {
        alert(data['error']);
      }
      else if(data['status_code'] == 400) {
        alert(data['error']);
      }
    });
    this.signupForm.reset();
  	
  }

}
