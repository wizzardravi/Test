import { Component } from '@angular/core';
import {MapsService} from './maps.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  lat: string = '';
  lng: string = '';

location: object;

constructor(private map:MapsService){}

ngOnInit(){
  this.map.getLocation().subscribe(data=>{
    console.log(data);
    this.lat = data.latitude;
    this.lng= data.longitude;
  })
}
}
