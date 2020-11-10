import { Component, OnInit } from '@angular/core';
import { ToasterService } from '../Services/toaster.service'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	toast: any;

  constructor(private toasterService : ToasterService) { }

  ngOnInit() {
  	// this.toast = {title: 'error', type: 'error', 
  	// body:'This throw error', delay: 1000}
  }

  showWarningToaster() {
  	console.log('warning button');
  	this.toast = 	this.toast = {title: 'warning', type: 'warning', 
  	body:'This throw warning', delay: 1000}

    // this.toasterService.show('warning', 'Check it out!', 'This is a warning alert', 3000);
  }

}
