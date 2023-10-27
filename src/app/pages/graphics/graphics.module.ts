import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GraphicsPageRoutingModule } from './graphics-routing.module';
import { GraphicsPage } from './graphics.page';
import { ServiceService } from 'src/app/services/service.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from '@syncfusion/ej2-angular-charts';

import { HighchartsService } from 'src/app/services/highcharts.service';
import { MapComponent } from 'src/app/components/map/map.component';
import { FootPointsComponent } from 'src/app/components/foot-points/foot-points.component';

@NgModule({
  imports: [
    CommonModule,
    ChartModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    GraphicsPageRoutingModule,
    NgxChartsModule
  ],
  declarations: [
    GraphicsPage,
    MapComponent,
    FootPointsComponent
  ],
  providers:[
    ServiceService,
    HighchartsService
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class GraphicsPageModule {}
