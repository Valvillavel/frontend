import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HighchartsService } from 'src/app/services/highcharts.service';
import { ServiceService } from 'src/app/services/service.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-inspeccionar',
  templateUrl: './inspeccionar.page.html',
  styleUrls: ['./inspeccionar.page.scss'],
})
export class InspeccionarPage implements OnInit {
  patientData:any={
    nombre:'',
    edad: '',
    sexo: '',
    peso: '',
    gpx: '',
    details: ''
  }
  pies:any="../../../assets/img/f.png";
  

  constructor(
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private mapService:HighchartsService,
    private service: ServiceService
  ) { 
  }

  ngOnInit() {
      this.patientData.nombre = this.router.getCurrentNavigation().extras.state.data.nombre;
      this.patientData.edad = this.router.getCurrentNavigation().extras.state.data.edad;
      this.patientData.sexo = this.router.getCurrentNavigation().extras.state.data.sexo;
      this.patientData.gpx = this.router.getCurrentNavigation().extras.state.data.gpx;
      this.patientData.details = this.router.getCurrentNavigation().extras.state.data.details;

      //this.mapService.plotActivity(+this.patientData.gpx);
  }
  ngAfterViewInit() {
    var myStyle = {
      "color":"#3949AB",
      "weight": 5,
      "opacity": 0.95
    };

    var map = L.map('map').setView([-17.3971747, -66.1631354], 8); // Coordenadas iniciales y nivel de zoom

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Array de ubicaciones (latitud y longitud)
    var latlngs: [number, number][] = [
      [-17.39724,-66.16355],
      [-17.39722,-66.16402],
      [-17.39708,-66.16465],
       // Agrega más ubicaciones aquí
    ];

    // Crea una ruta con las ubicaciones
    var polyline = L.polyline(latlngs, { color: 'blue' }).addTo(map);
    map.fitBounds(polyline.getBounds());
    
  }

}
