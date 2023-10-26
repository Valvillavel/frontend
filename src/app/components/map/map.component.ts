///<reference path="../../../../node_modules/@types/googlemaps/index.d.ts"/>
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Input() latini:any;
  @Input() latfin:any;
  @Input() lonini:any;
  @Input() lonfin:any;

  constructor() { }
  ngOnInit(): void {
      this.initMap()
  }

  initMap() {
    const directionsRenderer = new google.maps.DirectionsRenderer();
        const directionsService = new google.maps.DirectionsService();
        const map = new google.maps.Map(document.getElementById("map"), {
          zoom: 14,
          center: { lat: 6.244338, lng: -75.573553 },
        });
        directionsRenderer.setMap(map);
        this.calculateAndDisplayRoute(directionsService, directionsRenderer);
      
  }
  calculateAndDisplayRoute(directionsService, directionsRenderer) {

    directionsService.route(
      {
        origin: { lat: 6.244338, lng: -75.573553 },
        destination: { lat: 6.153617, lng: -75.374169 },
        // tambien se puede usar de otro modo WALKING - BICYCLING - TRANSIT
        travelMode: google.maps.TravelMode["WALKING"],
      },
      (response, status) => {
        if (status == "OK") {
          directionsRenderer.setDirections(response);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }

}
