import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../Models/restaurant';
import {URL} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http: HttpClient) { }

  getRestaurants( ): Observable<Restaurant[]>{
    return this.http.get<Restaurant []>(URL+'/restaurants').pipe();

  }

  getRestaurant( id : Number) : Observable<Restaurant>
  {
    return this.http.get<Restaurant>(URL+'/restaurants/'+id).pipe();
  }

  postRestaurant( restaurant : Restaurant) : Observable<Restaurant>
  {
    return this.http.post<Restaurant>(URL+'/restaurants',restaurant).pipe();
  }

  deleteRestaurant(id: Number) : Observable<Restaurant>
  {
    return this.http.delete<Restaurant>(URL+'/restaurants/'+id).pipe();
  }
  updateRestaurant( restaurant: Restaurant)
  {
    return this.http.put<Restaurant>(URL+'/restaurants/'+restaurant.id,restaurant).pipe();
  }
}
