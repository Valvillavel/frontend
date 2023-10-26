import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { HighchartsService } from 'src/app/services/highcharts.service';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.page.html',
  styleUrls: ['./graphics.page.scss'],
})
export class GraphicsPage implements OnInit {
  medir=false; 
  patientData: any;
  edit: boolean = false;
  pos:any;
  puntos:any;
  listpos:any;
  listpuntos:any;
  distancia=[30,49,45,34]
  @Output() messageEvent = new EventEmitter<string>();
  

  constructor(
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private service: ServiceService,
    public dtabase:AngularFireDatabase
  ) {  
   }
  registerForm = this.formBuilder.group({
    nombre: ['', Validators.required],
    edad: [''],
    genero: [''],
    peso: [''],
    gpx: [''],
    details: [''],
  });

  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.patientData = this.router.getCurrentNavigation().extras.state.data;
      this.edit = true;
      this.updatepatientData();
    }
  }
  leerMediciones(){
    const puntos='puntos/'
    this.dtabase.list(puntos).valueChanges().subscribe(res =>{
      this.listpuntos=res;
      this.savePuntos(this.listpuntos);      
    })
    const gps='localizacion/'
    this.dtabase.list(puntos).valueChanges().subscribe(res =>{
      this.listpos=res;
      this.savePuntos(this.listpos); 
    })
   
  }
  savePuntos(val){
    this.puntos=val;
    this.registerForm.get('gpx').setValue(this.puntos)
  }
  savePosicion(val){
    this.pos=val;
    this.registerForm.get('gpx').setValue(this.pos)
  }
  
  savePatient(data: any, formDirective: FormGroupDirective) {
    console.log(data)
    this.service.postPacientes(data).subscribe((r) => {
      formDirective.resetForm();
      this.router.navigate(['/home']);
    });
    const piepoint='puntos/'
    this.dtabase.object(piepoint).set(0);
    const posiciones='localizacion/'
    this.dtabase.object(posiciones).set(0);

  }
  updatepatientData() {
    this.registerForm.get('nombre').setValue(this.patientData?.nombre);
    this.registerForm.get('edad').setValue(this.patientData?.edad);
    this.registerForm.get('genero').setValue(this.patientData?.genero);
    this.registerForm.get('peso').setValue(this.patientData?.peso);
  }
  editPatient(data: any, formDirective: FormGroupDirective) {
    this.service
      .updatePacientes(this.patientData.id, data)
      .subscribe((r) => {
        formDirective.resetForm();
        this.router.navigate(['/home']);
      });
      const piepoint='puntos/'
      this.dtabase.object(piepoint).set(0);
      const posiciones='localizacion/'
      this.dtabase.object(posiciones).set(0);

  }
  ValoresReales(){
    this.medir=true;
    this.leerMediciones();
  }


}
