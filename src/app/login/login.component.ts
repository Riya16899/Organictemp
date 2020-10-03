import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import { Router } from "@angular/router";
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm = this.formBuilder.group({
    email: new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  });

  constructor(private router: Router, private loginService: LoginService, 
  	private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  Login() {
  	console.log('login here');
    console.log(this.loginForm.value);
  	this.loginService.postLogin(this.loginForm.value.email, this.loginForm.value.password).subscribe((data) => {
  		console.log(data['token']);
      localStorage.setItem('token', JSON.stringify({ token:data['token'] }));
  	});
  	// this.router.navigate(['/home']);
  }

}
