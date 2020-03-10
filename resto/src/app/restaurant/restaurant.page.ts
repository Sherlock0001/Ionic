import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../Models/restaurant';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UtilsService } from '../utils.service';
import { RestaurantService } from '../service/restaurant.service';
import { Plat } from '../Models/plat';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {

  restaurants : Restaurant [];
  plats : Plat [];
  
  constructor(private route : Router, private service: RestaurantService, private toast : ToastController, private utils: UtilsService) {
    this.getRestaurants();
  }

  getRestaurants():void 
  {
    this.service.getRestaurants().subscribe(restaurants =>{
        this.restaurants = restaurants;
    }, 
    error=>
    { 
      this.utils.presentToast('Erreur survenue','danger');

    });
  }

  ngOnInit() {
  }

}
