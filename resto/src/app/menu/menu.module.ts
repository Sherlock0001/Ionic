import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuPage } from './menu.page';
import { AgmCoreModule } from "@agm/core";
import { GOOGLE_API_KEY } from "../../environments/environment";


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: GOOGLE_API_KEY
    }),
    RouterModule.forChild([{ path: '', component: MenuPage }])
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
