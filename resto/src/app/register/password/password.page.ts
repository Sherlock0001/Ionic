import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {

  passwordForm: FormGroup;
  constructor(private service: AuthService, private utils: UtilsService, private formBuilder: FormBuilder, private route: Router) { }

  ngOnInit() {
    this.passwordForm= this.formBuilder.group({
      'code' : [null,[Validators.required]],
      'password' : [null,[Validators.required]],
      'passwordConfirmation': [null, [Validators.required]]
    });
  }

  change(info:any){
    this.service.change(info).subscribe(data=>{
      this.route.navigateByUrl("/login");
    },error=>{
      this.utils.presentToast("Nom d'utilisateur ou mot de passe incorect",'danger');
    });
  }

}
