import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public contactForm = this.formBuilder.group({
  	first_name: new FormControl('', [Validators.required]),
  	last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    phone : new FormControl('', [Validators.required, Validators.minLength(10)]),
    message: new FormControl('', [Validators.required]),
  });


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

}
