import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppDirective} from './app.directive'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';
var CanvasJSChart =CanvasJSAngularChart.CanvasJSChart;
import { NgChartsModule } from 'ng2-charts';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { ChartModule } from '@syncfusion/ej2-angular-charts';

@NgModule({
  declarations: [
    AppComponent,
    AppDirective,
    CanvasJSChart
  ],
  imports: [
    BrowserModule, 
    ChartModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgChartsModule,
    CKEditorModule,
    NgxChartsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
