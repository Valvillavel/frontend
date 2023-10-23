import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InspeccionarPageRoutingModule } from './inspeccionar-routing.module';

import { InspeccionarPage } from './inspeccionar.page';
import { ServiceService } from 'src/app/services/service.service';
import { HighchartsService } from 'src/app/services/highcharts.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InspeccionarPageRoutingModule
  ],
  declarations: [InspeccionarPage],
  providers:[ServiceService, HighchartsService]
})
export class InspeccionarPageModule {}
