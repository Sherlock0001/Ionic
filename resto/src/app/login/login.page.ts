import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { UtilsService } from '../utils.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  constructor(private service: AuthService, private utils: UtilsService, private formBuilder: FormBuilder, private toastController: ToastController, private route: Router) { }

  ngOnInit() {
    this.loginForm= this.formBuilder.group({
      'identifier' : [null,[Validators.required, Validators.email]],
      'password': [null, [Validators.required]]
    });
  }

  login(userInfo: any){
    this.service.login(userInfo).subscribe(data=>{
      this.service.isAuth = true;
      window.localStorage.setItem('token',data.jwt);
      this.route.navigateByUrl(this.service.redirectUrl);
    },error=>{
      this.utils.presentToast("Nom d'utilisateur ou mot de passe incorect",'danger');
    });
  }

  sendCode(userInfo: any)
  {
    this.service.forgottenPassword(userInfo.identifier).subscribe(data=>{
      this.route.navigateByUrl("/register");
    },error=>{
      this.utils.presentToast("Nom d'utilisateur ou mot de passe incorect",'danger');
    });
  }


}
