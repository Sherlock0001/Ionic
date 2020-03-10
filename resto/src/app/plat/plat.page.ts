import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Plat } from '../Models/plat';
import {PlatService} from '../service/plat.service';
import { ToastController } from '@ionic/angular';
import { UtilsService } from '../utils.service';
import { RestaurantService } from '../service/restaurant.service';
import { Restaurant } from '../Models/restaurant';


@Component({
  selector: 'app-plat',
  templateUrl: 'plat.page.html',
  styleUrls: ['plat.page.scss']
})
export class PlatPage {

  plats : Plat [];
  restaurantId : number;
  from_restaurant: boolean;
  restaurant: Restaurant = new Restaurant;

  
  constructor(private route : Router, private service: PlatService, private restaurantService: RestaurantService, private toast : ToastController, private utils: UtilsService, private route2 : ActivatedRoute,
    ) {
    this.getPlats();
    if(this.restaurantId = Number(this.route2.snapshot.paramMap.get('id')))
      {this.from_restaurant = true;
        this.getRestaurant();
      }
    else
    this.from_restaurant= false;    

  }

  // ionViewDidEnter() {
  //   this.getPlats();

  // }

  getPlats():void 
  {
    this.service.getPlats().subscribe(plats =>{
        this.plats = plats;
    }, 
    error=>
    { 
      this.utils.presentToast('Erreur survenue','danger');

    });
  }

  modifierPlat (id:any):void
  {
    this.route.navigate(['tabs/plat/modifier-plat',id]);
  }

  deletePlat(id: number):void
  {
    this.service.deletePlat(id).subscribe(plat=>{
      this.utils.presentToast('Supprimé avec succès','success');
      this.getPlats();
    });
  }

  getRestaurant():void 
  {
    this.restaurantService.getRestaurant(this.restaurantId).subscribe(restaurant =>{
        this.restaurant = restaurant;
    }, 
    error=>
    { 
      this.utils.presentToast('Erreur survenue','danger');

    });
  }

 

  
}
