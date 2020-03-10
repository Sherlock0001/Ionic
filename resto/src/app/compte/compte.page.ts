import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlatService } from '../service/plat.service';
import { RestaurantService } from '../service/restaurant.service';
import { ToastController } from '@ionic/angular';
import { UtilsService } from '../utils.service';
import { Restaurant } from '../Models/restaurant';
import { Plat } from '../Models/plat';

@Component({
  selector: 'app-compte',
  templateUrl: 'compte.page.html',
  styleUrls: ['compte.page.scss']
})
export class ComptePage {

  plat: Plat [];
  restaurants: Restaurant [];
  resto: Restaurant = new Restaurant;

  constructor(private service: PlatService, private serviceR: RestaurantService, private toast: ToastController, private route: Router, private utils: UtilsService)
  {
      this.getRestaurants();
      this.getPlats();
  }

  logout():void{
    window.localStorage.removeItem('token');
    this.route.navigateByUrl('login');
  }

  ajouterMenu():void {
    
    this.serviceR.updateRestaurant(this.resto).subscribe(plat =>{
      this.utils.presentToast("Menu ajouté avec succés","success");
     this.route.navigateByUrl('/tabs/plat/'+this.resto.id);
    },error=>{
       this.utils.presentToast("Une erreur est survenue","danger");
    })
  }
  


  getRestaurants():void 
  {
    this.serviceR.getRestaurants().subscribe(restaurants =>{
        this.restaurants = restaurants;
    }, 
    error=>
    { 
      this.utils.presentToast('Erreur survenue','danger');

    });
  }

  getPlats():void 
  {
    this.service.getPlats().subscribe(plat =>{
        this.plat = plat;
    }, 
    error=>
    { 
      this.utils.presentToast('Erreur survenue','danger');

    });
  }

}
