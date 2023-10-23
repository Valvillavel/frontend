import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { alertController } from '@ionic/core';
import { PopoverController } from '@ionic/angular';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  columns: Array<any>=[];
  list:any;
  error: boolean=false;
  patientSelected:any;

  constructor(
    public popoverController: PopoverController,
    public activeRoute: ActivatedRoute,
    public service:ServiceService,
    private router:Router,
  ) {}

  ngOnInit() {
    this.loadDataPatients();
    this.columns=["Nombre","Edad","Sexo"]
  }
  ionViewWillEnter(){
    this.loadDataPatients() 
  }
  loadDataPatients(){
    this.service.getPacientes().subscribe(patient=>{
      this.list=patient
      this.error=false;
    },()=>{
      this.error=true;
      this.list=[];
    }) 
  }
  getPatientSelected(dataSelected: any){
    this.patientSelected=dataSelected 
  }
  deleteData(){
    if(this.patientSelected==undefined || this.patientSelected.length==0){
      this.handleButtonClick()
    }
   this.patientSelected?.map(paciente=>{
      this.service.deletePacientes(paciente.id).subscribe(res=>{
        this.patientSelected=[]
        this.ionViewWillEnter()
      })
    })
    
  }
  async handleButtonClick() {
    const alert = await alertController.create({
      header: 'Select Item',
      message: 'Must select an item to delete',
      buttons: ['Agree'],
    });

    await alert.present();
  }
  openEditForm(){
    let navigationExtras:NavigationExtras={
      state:{
        data:this.patientSelected[this.patientSelected.length -1],
      }
      
    }
   this.router.navigateByUrl("/home/edit",navigationExtras)
  }
  openInspeccionar(){
    let navigationExtras:NavigationExtras={
      state:{
        data:this.patientSelected[this.patientSelected.length -1],
      }
      
    }
   this.router.navigateByUrl("/home/examinar",navigationExtras)
  }

}
