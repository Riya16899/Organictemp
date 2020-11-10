import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import { Router } from "@angular/router";
import { LoginComponent } from '../login/login.component';
import { ForgetpwdService } from '../Services/forgetpwd.service';
import { Forgetpwd } from '../Models/forgetpwd';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-forget-pwd',
  templateUrl: './forget-pwd.component.html',
  styleUrls: ['./forget-pwd.component.scss']
})
export class ForgetPWDComponent implements OnInit {

  public forgetForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
  });

  constructor(private router: Router, private forgetpwdService: ForgetpwdService, 
  	private formBuilder: FormBuilder, private appComponent: AppComponent) { }

  ngOnInit() {
  }

  get f(){
    return this.forgetForm.controls;
  }

  Forgot() {
  	
  	this.forgetpwdService.postForget(this.forgetForm.value).subscribe((data) => {
        this.router.navigate(['/login',{value: true}])

      
      if (data['meta']['error']) {
       this.appComponent.showToast('Error', data['error']);
      }
      else {
        this.appComponent.showToast('Success', data['meta']['success']);
      }  
     
  	});
    this.forgetForm.reset();
  }

}
