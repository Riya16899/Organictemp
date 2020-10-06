import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  show: boolean = false;


  public loginForm = this.formBuilder.group({
    email: new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  });

  constructor(private router: Router, private loginService: LoginService, 
  	private formBuilder: FormBuilder, private route :ActivatedRoute) { }

  ngOnInit() {
    let routeValue = this.route.snapshot.paramMap.get('value')
    this.show = JSON.parse(routeValue); // str to boolean
  }

  Login() {
    console.log(this.loginForm.value);
  	this.loginService.postLogin(this.loginForm.value).
    subscribe((data) => {
      console.log(data);
      localStorage.setItem('token', JSON.stringify(data['token']));
  	  if(data['status_code'] == 200) {
        alert(data['success']);
      }
      else if (data['status_code'] == 401) {
        alert(data['error']);
      }
      else if (data['status_code'] == 400) {
        alert(data['error']);
      }
    });

    
  	// this.router.navigate(['/gen-verification']);
  }

}


// riya.patadiya@gmail.com
// Riya@1234