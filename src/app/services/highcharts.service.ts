import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceService } from './service.service';
import { Map, geoJson, tileLayer } from 'leaflet';
import * as GeoJSON from 'geojson';
import * as L from 'leaflet';

declare var omnivore:any;
const defaultCoords: number[] = [40, -80]
const defaultZoom: number = 8;

@Injectable({
  providedIn: 'root'
})
export class HighchartsService {

  data:any;

  url: string = 'http://localhost:1337/'
  constructor(
    public service:ServiceService,
  ) {
  }
  getActivity(id){
    return this.service.getActivity(id).subscribe(res=>{
      return res
    })
  }

  plotActivity(gpxdata){
    var myStyle = {
      "color":"#3949AB",
      "weight": 5,
      "opacity": 0.95
    };
    

    var map = L.map('map').setView([40, -80], defaultZoom);


    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var customLayer = L.geoJson(null, {
      style: myStyle
    });


    var gpxLayer = omnivore.gpx(gpxdata, null, customLayer)
      .on('ready', function(){
        map.fitBounds(gpxLayer.getBounds());
      }).addTo(map);
    
  }
}
