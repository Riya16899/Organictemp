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
    email: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password : new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private router: Router, private loginService: LoginService, 
  	private formBuilder: FormBuilder, private route :ActivatedRoute) { }

  ngOnInit() {
    let routeValue = this.route.snapshot.paramMap.get('value')
    this.show = JSON.parse(routeValue); // str to boolean
  }

  get f(){
    return this.loginForm.controls;
  }

  Login() {
    
  	this.loginService.postLogin(this.loginForm.value).
    subscribe((data) => {
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

    this.loginForm.reset();
  }

}


// riya.patadiya@gmail.com
// Riya@1234