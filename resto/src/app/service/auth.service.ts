import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utilisateur } from '../Models/utilisateur';
import { Observable } from 'rxjs';
import {URL} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  redirectUrl: string;
  isAuth: boolean;
  constructor(private http: HttpClient) { }

  login(user: Utilisateur): Observable<any>{
    return this.http.post(URL+'/auth/local',user).pipe();
  }

  register(user: Utilisateur){
    return this.http.post(URL+'/auth/local/register',user).pipe();
  }

  forgottenPassword(email:String):Observable<any>{
    return this.http.post(URL+'/auth/forgot-password',{
      email: email,
    }).pipe();
  }


  change(info:any):Observable<any>{
    return this.http.post(URL+'/auth/reset-password',{
      code: info.code,
      password: info.password,
      passwordConfirmation: info.passwordConfirmation,
    }).pipe();
  }

}
