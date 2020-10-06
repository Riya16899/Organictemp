import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import { Router } from "@angular/router";
import { SignupService } from '../Services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm = this.formBuilder.group({
    email: new FormControl('', Validators.required),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    password: new FormControl('', Validators.required),
    confirmpassword: new FormControl('', Validators.required),
  });

  constructor(private router: Router, private signupService: SignupService, 
  	private formBuilder: FormBuilder) { }

  ngOnInit() {
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
    // this.router.navigate(['/home']);
 
  	
  }

}
