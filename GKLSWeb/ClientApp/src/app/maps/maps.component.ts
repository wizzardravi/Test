import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import {MapsService} from '../maps.service';
import { FormControl,ReactiveFormsModule } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import {} from 'googlemaps';
import { formControlBinding } from '@angular/forms/src/directives/ng_model';


@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  title = 'app';
  lat: string = '';
  lng: string = '';
  state: string = '';
  city: string = '';

location:Object;

  constructor(private map:MapsService, private mapsAPILoader:MapsAPILoader, private ngZone:NgZone) { }


@ViewChild('search')
public searchElementRef: ElementRef;

public zoom: number;
public latitude: number;
public longitude: number;
public latlongs:any = [];
public latlong: any = {};
public searchControl: FormControl;


  ngOnInit(){
this.zoom = 8;
this.latitude = 39.8282;
this.longitude = -98.5795;

this.searchControl = new FormControl();
this.setCurrentposition();
this.mapsAPILoader.load().then(()=>{
  const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement,{
  types:[]
  //componentRestrictions:{'country':'IN'}
  });
  autocomplete.addListener('place_changed',()=>{
    this.ngZone.run(()=>{
      const place:google.maps.places.PlaceResult = autocomplete.getPlace();
      if(place.geometry === undefined || place.geometry === null){
        return;
      }

      const latlong ={
        latitude : place.geometry.location.lat(),
        longitude:place.geometry.location.lng()
      };

      this.latlongs.push(latlong);
      this.searchControl.reset();
    });

  })
});

    // this.map.getLocation().subscribe(data=>{
    //   //console.log(data);
    //   this.lat = data.latitude;
    //   this.lng= data.longitude;
    //   this.state=data.region_name;
    //   this.city = data.city;
    // });
  }


  private setCurrentposition(){
if('geolocation' in navigator){
  navigator.geolocation.getCurrentPosition((position)=>{
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    this.zoom = 8;
  })
}
  }
  

}
