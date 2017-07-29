import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { GeolocationService } from './shared/geolocation.service';
import { MapService } from './shared/map.service';

import { AppComponent } from './app.component';
import { GeoDisplayComponent } from './geo-display/geo-display.component';
import { MapDisplayComponent } from './map-display/map-display.component';
import { MyLocationComponent } from './my-location/my-location.component';
import { WebsiteLocationComponent } from './website-location/website-location.component';

@NgModule({
  declarations: [
    AppComponent,
    GeoDisplayComponent,
    MapDisplayComponent,
    MyLocationComponent,
    WebsiteLocationComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [GeolocationService, MapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
