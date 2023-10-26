import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InspeccionarPageRoutingModule } from './inspeccionar-routing.module';

import { InspeccionarPage } from './inspeccionar.page';
import { ServiceService } from 'src/app/services/service.service';
import { HighchartsService } from 'src/app/services/highcharts.service';
import { MapComponent } from 'src/app/components/map/map.component';
import { FootPointsComponent } from 'src/app/components/foot-points/foot-points.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InspeccionarPageRoutingModule
  ],
  declarations: [
    InspeccionarPage,
    MapComponent,
    FootPointsComponent
  ],
  providers:[ServiceService, HighchartsService],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class InspeccionarPageModule {}
