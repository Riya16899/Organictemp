import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import { Router } from "@angular/router";
import { ResetpwdService } from '../Services/resetpwd.service';

@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html',
  styleUrls: ['./reset-pwd.component.scss']
})
export class ResetPWDComponent implements OnInit {

  public resetForm = this.formBuilder.group({
    pwd: new FormControl('', Validators.required),
    cnfpwd: new FormControl('', Validators.required)
  });

  constructor(private router: Router, private resetpwdService: ResetpwdService, 
  	private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  Reset() {
  	console.log(this.resetForm.value);
  	this.resetpwdService.postReset(this.resetForm.value).subscribe((data) => {
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
    this.resetForm.reset();
  }

}
