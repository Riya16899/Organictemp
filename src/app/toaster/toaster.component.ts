import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Toast } from '../Models/toaster';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent implements OnInit {

  constructor(private toaster: Toaster) { }

  @Input('toast') toast: Toast;
  @Input() i: number;
  @Output() remove = new EventEmitter<number>();

  ngOnInit() {
  	console.log(this.toast);
  }

  showToast(message: string, heading: string) {
    this.toaster.open({text: message, caption: heading, duration: 4000, type: 'primary'});
  }


}
