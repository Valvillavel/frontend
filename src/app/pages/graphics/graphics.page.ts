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

  peso:any;
  edad:any;
  gpx:any;
  details:any;
  sexo:any;
  single:any={
    name:'',
    series:''
  }
  distancia=[30,49,45,34]
  @Output() messageEvent = new EventEmitter<string>();
  

  constructor(
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private mapService: HighchartsService,
    private service: ServiceService,
    public dtabase:AngularFireDatabase
  ) {  
    this.leerMediciones();
   }
  registerForm = this.formBuilder.group({
    nombre: ['', Validators.required],
    edad: [''],
    sexo: [''],
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
      
    })
   
  }
  //saveFlujo(val){
  //  this.flujo=val;
  //  this.registerForm.get('flujo').setValue(this.flujo)
  //}
  
  savePatient(data: any, formDirective: FormGroupDirective) {
    console.log(data)
    this.service.postPacientes(data).subscribe((r) => {
      formDirective.resetForm();
      this.router.navigate(['/home']);
    });
    const vol='puntos/'
    this.dtabase.object(vol).set(0);

  }
  updatepatientData() {
    this.registerForm.get('nombre').setValue(this.patientData?.nombre);
    this.registerForm.get('edad').setValue(this.patientData?.edad);
    this.registerForm.get('sexo').setValue(this.patientData?.sexo);
    this.registerForm.get('peso').setValue(this.patientData?.peso);
  }
  editPatient(data: any, formDirective: FormGroupDirective) {
    this.service
      .updatePacientes(this.patientData.id, data)
      .subscribe((r) => {
        formDirective.resetForm();
        this.router.navigate(['/home']);
      });
    const vol='puntos/'
    this.dtabase.object(vol).set(0);

  }
  ValoresReales(){
    this.medir=true;
    
  }


}
