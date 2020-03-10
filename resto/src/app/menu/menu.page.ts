import { RestaurantService } from '../service/restaurant.service';
import { GOOGLE_API_KEY } from "../../environments/environment";
import { Component, OnInit, NgModule } from '@angular/core';
import { Restaurant } from '../Models/restaurant';
import { HttpClient } from "@angular/common/http";
import { ToastController } from "@ionic/angular";
import { UtilsService } from '../utils.service';
import { Plugins } from '@capacitor/core';
import { map } from "rxjs/operators";


@Component({
  selector: 'app-menu',
  templateUrl: 'menu.page.html',
  styleUrls: ['menu.page.scss']
})

export class MenuPage {
  lat: number;
  lng: number;
  marker;
  address: string;
  resto : Restaurant[] = [];


  constructor(private http: HttpClient, public toastController: ToastController, private restaurantService: RestaurantService,private utils: UtilsService) {
    this.getRestaurants();
  }

  ngOnInit() {
  
  }

  getRestaurants():void 
  {
    this.restaurantService.getRestaurants().subscribe(restaurants =>{
        this.resto = restaurants; 
        this.getCurrentLocation();
    }, 
    error=>
    { 
      this.utils.presentToast('Erreur survenue','danger');
    });
  }

  getCurrentLocation() {
    Plugins.Geolocation.getCurrentPosition().then(result => {
      this.lat = result.coords.latitude;
      this.lng = result.coords.longitude;
      this.resto.forEach(element => {
         this.getAddress(element.latitude,element.longitude).subscribe(decodedAddress => {
          this.address = decodedAddress;
        });        
      });
      console.log(this.lat, this.lng)
      this.getAddress(this.lat, this.lng).subscribe(decodedAddress => {
        this.address = decodedAddress;
      });
    });
  }

  private getAddress(lat: number, lan: number) {
    return this.http
      .get<any>(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lan}&key=${
          GOOGLE_API_KEY
        }`
      )
      .pipe(
        map(geoData => {
          if (!geoData || !geoData.results || geoData.results === 0) {
            return null;
          }
          console.log(geoData)
          return geoData.results[0].formatted_address;
        })
      );
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.address,
      position: "middle",
      buttons: [
        {
          icon: "close-circle",
          role: "cancel"
        }
      ]
    });
    toast.present();
  }

  onMarkerClick() {
    this.presentToast();
  }

}
