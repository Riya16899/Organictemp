import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import { Router } from "@angular/router";
import { LoginComponent } from '../login/login.component';
import { ForgetpwdService } from '../Services/forgetpwd.service';
import { Forgetpwd } from '../Models/forgetpwd';


@Component({
  selector: 'app-forget-pwd',
  templateUrl: './forget-pwd.component.html',
  styleUrls: ['./forget-pwd.component.scss']
})
export class ForgetPWDComponent implements OnInit {

  public forgetForm = this.formBuilder.group({
    email: new FormControl('', Validators.required)
  });

  constructor(private router: Router, private forgetpwdService: ForgetpwdService, 
  	private formBuilder: FormBuilder) { }

  ngOnInit() {
  }



  Forgot() {
  	console.log(this.forgetForm.value);
  	this.forgetpwdService.postForget(this.forgetForm.value).subscribe((data) => {
  		console.log(data);
      console.log(data['status_code']);
      if(data['status_code'] == 401) {
        this.router.navigate(['/login',{value: true}])
      }
      else if (data['status_code'] == 400) {
        alert(data['error']);
      }
      else if(data['status_code'] == 200) {
        alert(data['success']);
      }  
     
  	});
    this.forgetForm.reset();
  }

}
