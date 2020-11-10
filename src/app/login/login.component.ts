import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { LoginService } from '../Services/login.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  show: boolean = false;


  public loginForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    // ^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$
    password : new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private router: Router, private loginService: LoginService, 
  	private formBuilder: FormBuilder, private route :ActivatedRoute,
    private appComponent: AppComponent) { }

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
      console.log(data);
      if(data['error']) {
        this.appComponent.showToast('Error', data['error']);
      }
      else {
        localStorage.setItem('token', JSON.stringify(data['meta']['token']));
         this.appComponent.showToast('Success', data['meta']['success']);
      }
      
    });

    this.loginForm.reset();
  }

}


// riya.patadiya@gmail.com
// Riya@1234