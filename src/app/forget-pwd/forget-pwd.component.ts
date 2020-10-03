import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import { Router } from "@angular/router";
import { ForgetpwdService } from '../Services/forgetpwd.service';
import { Forgetpwd } from '../Models/forgetpwd';
import { environment } from '../../environments/environment';

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
  	});
  }

}
