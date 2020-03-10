import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Plat } from '../Models/plat';
import { Observable, from } from 'rxjs';
import {URL} from '../../environments/environment';
import { identifierModuleUrl } from '@angular/compiler';
@Injectable({ 
  providedIn: 'root'
})
export class PlatService {

  constructor(private http: HttpClient) { }

  getPlats( ): Observable<Plat[]>{
    return this.http.get<Plat []>(URL+'/plats').pipe();

  }

  getPlat( id : Number) : Observable<Plat>
  {
    return this.http.get<Plat>(URL+'/plats/'+id).pipe();
  }

  postPlat( plat : Plat) : Observable<Plat>
  {
    return this.http.post<Plat>(URL+'/plats',plat).pipe();
  }

  deletePlat(id: Number) : Observable<Plat>
  {
    return this.http.delete<Plat>(URL+'/plats/'+id).pipe();
  }
  updatePlat( plat: Plat)
  {
    return this.http.put<Plat>(URL+'/plats/'+plat.id,plat).pipe();
  }
}
