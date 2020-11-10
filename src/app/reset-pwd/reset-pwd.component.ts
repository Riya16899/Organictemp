import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ResetpwdService } from '../Services/resetpwd.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html',
  styleUrls: ['./reset-pwd.component.scss']
})
export class ResetPWDComponent implements OnInit {

  public resetForm = this.formBuilder.group({
    pwd: new FormControl('', [Validators.required, Validators.minLength(6)]),
    cnfpwd: new FormControl('', [Validators.required, Validators.minLength(6)])
  }, { validator: this.ConfirmedValidator('pwd', 'cnfpwd') } );

  constructor(private router: Router, private resetpwdService: ResetpwdService, 
  	private formBuilder: FormBuilder, private route: ActivatedRoute, private appComponent: AppComponent) { }

  ngOnInit() {

  }
  
  get f(){
    return this.resetForm.controls;
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

  Reset() {
    let urlToken = this.route.snapshot.paramMap.get('str');
  	this.resetpwdService.postReset(this.resetForm.value, urlToken).subscribe((data) => {
        if (data['error']) {
          this.appComponent.showToast('Error', data['error']);
        }
        else {
          this.appComponent.showToast('Success', data['meta']['success']);
        }
  	});
    this.resetForm.reset();
  }

}
