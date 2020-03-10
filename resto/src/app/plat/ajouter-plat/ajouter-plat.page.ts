import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plat } from '../../Models/plat';
import {PlatService} from '../../service/plat.service';
import { ToastController } from '@ionic/angular';
import { UtilsService } from 'src/app/utils.service';
import { RestaurantService } from 'src/app/service/restaurant.service';
import { Restaurant } from 'src/app/Models/restaurant';

@Component({
  selector: 'app-ajouter-plat',
  templateUrl: './ajouter-plat.page.html',
  styleUrls: ['./ajouter-plat.page.scss'],
})
export class AjouterPlatPage implements OnInit {

  plat: Plat;
  restaurants: Restaurant[];

  
  constructor(private service: PlatService, private serviceR: RestaurantService, private toast: ToastController, private route: Router, private utils: UtilsService) {
    this.plat= new Plat();
    this.getRestaurants();
   }

  ngOnInit() {
  }


  ajouterPlat():void {
    this.service.postPlat(this.plat).subscribe(plat =>{
       this.utils.presentToast("Plat ajouté avec succés","success");
      this.route.navigateByUrl('/tabs/plat');
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

}
