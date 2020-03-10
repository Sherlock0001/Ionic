import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'menu',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../menu/menu.module').then(m => m.MenuPageModule)
          }
        ]
      },
      {
        path: 'plat',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../plat/plat.module').then(m => m.PlatPageModule)
          },
          {
            path: 'ajouter-plat',
            loadChildren: () =>
              import('../plat/ajouter-plat/ajouter-plat.module').then(m => m.AjouterPlatPageModule)
          },
          {
            path: ':id',
            loadChildren: () =>
              import('../plat/plat.module').then(m => m.PlatPageModule)
          },          
          {
            path: 'modifier-plat/:id',
            loadChildren: () =>
              import('../plat/modifier-plat/modifier-plat.module').then(m => m.ModifierPlatPageModule)
          }
        ]
      },
      {
        path: 'compte',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../compte/compte.module').then(m => m.ComptePageModule)
          }
        ]
      },
      {
        path: 'restaurant',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../restaurant/restaurant.module').then(m => m.RestaurantPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/menu',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/menu',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
