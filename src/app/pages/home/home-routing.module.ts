import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { FootPointsComponent } from 'src/app/components/foot-points/foot-points.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
  path: 'add',
  loadChildren: () => import('../graphics/graphics.module').then( m => m.GraphicsPageModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('../graphics/graphics.module').then( m => m.GraphicsPageModule)
  },
  {
    path:'examinar',
    loadChildren: () => import('../inspeccionar/inspeccionar.module').then( m => m.InspeccionarPageModule)
  },
  {
    path:'foot',
    component:FootPointsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
