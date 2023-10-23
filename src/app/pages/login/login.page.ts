import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceService } from 'src/app/services/service.service';
import { NavController } from '@ionic/angular';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  validationUserMessage ={
    email:[
      {type:"required", message:"Please enter your Email"},
      {type:"pattern", message:"The Email entered is Incorrect.Try again"}
    ],
    password:[
      {type:"required", message:"please Enter your Password!"},
      {type:"minlength", message:"The Password must be at least 5 characters or more"}

    ]
  }
  validationFormUser: FormGroup;
  submitted = false;
  loading = false;
  isregisted=false;
  user:any;
  /**
   * 
   * @param translate {TranslateService}
   */
  constructor(
    public formbuilder: FormBuilder, 
    private activateRoute:ActivatedRoute,
    private router: Router,
    private nav: NavController,
    private authService:AuthService,
    private engineService: ServiceService
  ) {
  }

  /**
   * init 
   * @property {Function}
   */
  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.isregisted=this.router.getCurrentNavigation().extras.state.msg;
    }
    this.validationFormUser = this.formbuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ]))
    })
  }
  login(value, formDirective:FormGroupDirective){
    this.submitted = true;
    this.loading = true;
      this.authService.login(value.email, value.password)
        .pipe(first()).subscribe( data => {
          this.router.navigate(['home'])
          .then(() => {
            window.location.reload();
          });
        },
        error => {
          if (error && error.error && error.error.message && error.error.message.length > 0) {
            alert(error.error.message[0].messages[0].message);
          }
          else 
          {
            alert('error');
          }
          this.loading = false;
        })
  }

  openSignup(){
    this.router.navigate(['sign-up']);
  }

}
