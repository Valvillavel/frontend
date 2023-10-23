import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  validationMessages = {
    name: [{type:"required", message:"Please Enter your Full Name"}],
    email: [
      {type: 'required',message:"Enter your Email Adress"},
      {type:"pattern", meesage:"Please the Email Entered is Incorrect. Try again.."}
    ],
    password: [
      {type: "required", message: "Password is required here"},
      {type:"minlength", message: "Password must be at least 6 character"}
    ],
    repeat: [
      {type: "required", message: "Confirm password is required here"}
    ]
  }
  countries: any[] = [];
  /**
   * All entitys data
   * @type {Array}
   */
  ValidationFormUSer : FormGroup;
  loading:any;
  userdata={
    username:'',
    email:'',
    password:'',
    confirmed:false,
    blocked:false
  }
  msg:boolean;
  constructor(
    private router: Router, 
    private navCtr: NavController ,
    private formbuilder:FormBuilder,  
    public loadingCtrl : LoadingController, 
    private alertCtrl: AlertController,
    private engineService: ServiceService,
    private toastController:ToastController,
    ){
    this.loading = this.loadingCtrl
  }

  ngOnInit() {
    this.ValidationFormUSer = this.formbuilder.group(
      {
        name: new FormControl('', Validators.compose([
           /** Validators.required,*/ 
        ])),
        email: new FormControl('', Validators.compose([
          /** Validators.required,*/ 
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        password: new FormControl('', Validators.compose([
         /** Validators.required,*/ 
          Validators.minLength(6)
        ])),
        repeat: new FormControl('', Validators.required)
      })
  }
  registerUser(value, formDirective:FormGroupDirective){
    if(value.password!=value.repeat){
        this.unconfirmedPassword();
      }else{
        this.userdata.email=value.email
        this.userdata.password=value.password
        this.userdata.username=value.name
        this.userdata.confirmed=true
          this.engineService.postUser(this.userdata)
          .subscribe((r) => {
            console.log(r)
            this.msg=true;
            let navigationExtras:NavigationExtras={
              state:{
                msg:this.msg,
              }
            }
           this.router.navigateByUrl("/login",navigationExtras)
          })
        
      }
  }
  async unconfirmedPassword(){
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      subHeader: 'Important message',
      message: 'The password confirmation must be equal to the password',
      buttons: ['OK'],
    });
    await alert.present();
  }
  async errorLoading(message: any){
    const loading = await this.alertCtrl.create({
      header:"Error Registering",
      message:message,
      buttons:[{
        text:'ok',
        handler: ()=>{
        this.navCtr.navigateBack(['signup'])
      }
      }]
    })
     await loading.present();
  }
  async showalert(){
    var load = await this.loadingCtrl.create({
      message:"please wait....",
   
    })
     load.present();
   }

}
