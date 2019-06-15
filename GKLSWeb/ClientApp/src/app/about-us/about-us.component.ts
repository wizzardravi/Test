import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    alert('I am first hit of tthis page');
  }

  ShowPartnerList = function(){
    alert('Test');
    $('.collapse').collapse()
  }

}
