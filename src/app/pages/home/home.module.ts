import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ServiceService } from 'src/app/services/service.service';
import { DataTableComponent } from 'src/app/components/data-table/data-table.component';
import { HomePageRoutingModule } from './home-routing.module';
import { HighchartsService } from 'src/app/services/highcharts.service';
import { FootPointsComponent } from 'src/app/components/foot-points/foot-points.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    NgxDatatableModule
  ],
  declarations: [
    HomePage,
    DataTableComponent,
    FootPointsComponent
  ],
  providers:[ServiceService, HighchartsService],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {}
